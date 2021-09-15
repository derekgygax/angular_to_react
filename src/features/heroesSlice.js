import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import { client } from "../api/client";

// Create an entity for the heroes. get initial state and then fill it
// sortComparer#
// A callback function that accepts two Entity instances,
// and should return a standard Array.sort() numeric result (1, 0, -1)
// to indicate their relative order for sorting.

// If provided, the state.ids array will be kept in sorted order based
// on comparisons of the entity objects, so that mapping over the IDs array
// to retrieve entities by ID should result in a sorted array of entities.

// If not provided, the state.ids array will not be sorted,
// and no guarantees are made about the ordering. In other words,
// state.ids can be expected to behave like a standard Javascript array.
// Your sort comparer makes sure the ids are in order ... which is what you're
// using to determine the rankings of the heroes at the moment
const heroesAdapter = createEntityAdapter({
  // sortComparer: compareHeroes,
});

const emptyInitialState = heroesAdapter.getInitialState({
  favorites: [],
  status: "idle",
  error: null,
});

export const fetchHeroesAndFavorites = createAsyncThunk(
  "heroes/fetchHeroesAndFavorites",
  async () => {
    const response = await client.get("/heroes-and-favorites");
    return response;
  }
);

// API CALLS
// API call to get the heroes from the DB
export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const response = await client.get("/heroes");
  // The response and stuff will get handled in the extraReducers
  return response;
});

// API call to add a new hero
export const addNewHero = createAsyncThunk(
  "heroes/addHero",
  async (newHero) => {
    const response = await client.post("/heroes", newHero);
    // The response and stuff will get handled in the extraReducers
    return response;
  }
);

// API call to update a hero
export const updateHero = createAsyncThunk(
  "heroes/updateHero",
  async (heroUpdated) => {
    const response = await client.put(`/heroes/${heroUpdated.id}`, heroUpdated);
    return response;
  }
);

// API call to delete a hero
// REMEMBER that this also needs to delete the hero reference
export const deleteHero = createAsyncThunk(
  "heroes/deleteHero",
  async (heroId) => {
    const response = await client.delete(`/heroes/${heroId}`);
    return response;
  }
);

//API to add a like to a hero
export const addLike = createAsyncThunk("heroes/addLike", async (heroId) => {
  const response = await client.put(`/heroes/addLike/${heroId}`);
  return response;
});

// API to add to favorites
export const addFavorite = createAsyncThunk(
  "heroes/addFavorite",
  async (heroId) => {
    const response = await client.post("/favorites", { id: heroId });
    return response;
  }
);

// API to delete from favorites
export const deleteFavorite = createAsyncThunk(
  "/heroes/deleteFavorite",
  async (heroId) => {
    const response = await client.delete(`/favorites/${heroId}`);
    return response;
  }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState: emptyInitialState,
  reducers: {
    removeHero: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
      // If a hero is removed completely like here
      // then also remove it from the favorites list ... if its there
      state.favorites = state.favorites.filter((fav) => {
        return fav !== action.payload;
      });
    },
  },
  extraReducers: {
    [fetchHeroesAndFavorites.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchHeroesAndFavorites.fulfilled]: (state, action) => {
      state.status = "succeeded";
      const heroesList = action.payload.heroes;
      const favoritesList = action.payload.favorites;
      heroesAdapter.upsertMany(state, heroesList);
      state.favorites = favoritesList;
    },
    [fetchHeroesAndFavorites.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchHeroes.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchHeroes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetchs heroes to the array
      // Ya ... these extraReducers must just listen in general
      // IDK why we used the concat here and return instead of the push
      // I thought we are in Immer so we can do the direct manipulation
      //    I guess this is manipulating it too but why not push
      // state.heroes = state.heroes.concat(action.payload)

      // User the `upsertMany` reducer as a mutating update utility
      // When we receive the heroesPosts.fulfilled action,
      // we can use the heroesAdapter.upsertMany function
      // to add all of the incoming heroes to the state,
      // by passing in the draft state and the array of heroes in action.payload.
      // If there's any items in action.payload that already existing in our state,
      // the upsertMany function will merge them together based on matching IDs.
      heroesAdapter.upsertMany(state, action.payload);
    },
    [fetchHeroes.rejected]: (state, action) => {
      state.status = "failed";
      // IDK if the below one is right????
      state.error = action.error.message;
    },
    // Putting heroesAdapter.addOne like this is the same as
    //[addNewHero.fulfilled]: () => {
    //     heroesAdapter.addOne(state, action.payload);
    // }
    // I THINK lol
    [addNewHero.fulfilled]: heroesAdapter.addOne,
    [updateHero.fulfilled]: (state, action) => {
      const hero = action.payload;
      const existingHero = state.entities[hero.id];
      // I would like a better way to do this so that we aren't referencing
      // all the name of the properties explicitly but OH WELL for now
      if (existingHero) {
        existingHero.name = hero.name;
        existingHero.description = hero.description;
        existingHero.likes = hero.likes;
      }
    },
    [deleteHero.fulfilled]: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
      // If a hero is removed completely like here
      // then also remove it from the favorites list ... if its there
      state.favorites = state.favorites.filter((fav) => {
        return fav !== action.payload;
      });
    },
    [addFavorite.fulfilled]: (state, action) => {
      // Push modifies the actual list so you don't
      state.favorites.push(action.payload);
      state.favorites.sort();
    },
    [deleteFavorite.fulfilled]: (state, action) => {
      // I believe you have to set it equal to state.favorties again
      // because filter does not modify the actual list its working on.
      // It returns a new one
      state.favorites = state.favorites.filter((fav) => {
        return fav !== JSON.parse(action.payload);
      });
    },
    [addLike.fulfilled]: (state, action) => {
      const heroId = action.payload.heroId;
      const numLikes = action.payload.likes;
      const existingHero = state.entities[heroId];
      if (existingHero) {
        existingHero.likes = numLikes;
      }
    },
  },
});

export const {
  heroAdded,
  heroUpdated,
  removeHero,
  addHeroToFavorites,
  removeHeroFromFavorites,
} = heroesSlice.actions;

export default heroesSlice.reducer;

export const {
  selectAll: selectAllHeroes,
  selectById: selectHeroById,
  selectIds: selectHeroIds,
} = heroesAdapter.getSelectors((state) => state.heroes);

export const selectFavoriteIds = (state) => {
  return state.heroes.favorites;
};

export const isHeroIdInFavorites = (state, heroId) => {
  return state.heroes.favorites.some((id) => id === heroId);
};

// I WONDER if this would make this function work better ... more memorization ... idk ... im not a doctor
// NOT SURE ... but the function still works ...
export const selectLikesForIds = createSelector(
  [
    (state, ids) => {
      return ids.map((id) => {
        const hero = selectHeroById(state, id);
        return {
          id: hero.id,
          likes: hero.likes,
        };
      });
    },
  ],
  (heroLikes) => {
    return heroLikes;
  }
);

// Search for heroes within the list you have
// Return the hero ids and names of the ones that match
export const selectHeroesMatchingSearchTerm = createSelector(
  [
    selectAllHeroes,
    (state, searchTerm) => {
      return searchTerm;
    },
  ],
  (heroes, searchTerm) => {
    const filteredHeroes = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredHeroes;
  }
);

// // This will retrieve the top heroes based on the number of heroes you want,
// // which you have provied. Remember they are kept in order by ID for now :)
// // If you want to keep improving it you can do it by rank :)
// REMEMBER: In create selector the first input arguement is an array of as
// many as you want which will then be the arguments in the next aregument that is af unction
// That value will be returned
// export const selectTopHeroIds = createSelector(
//   [selectHeroIds, (state, numTopHeroes) => numTopHeroes],
//   (heroIds, numTopHeroes) => {
//     heroIds.slice(0, numTopHeroes);
//   }
// );
