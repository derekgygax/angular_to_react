import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectHeroById,
  addFavorite,
  deleteHero,
  deleteFavorite,
  isHeroIdInFavorites,
} from "../../features/heroesSlice";

import Card from "../../components/ui/Card";
import { LikeButton } from "./LikeButton";

export const HeroItem = ({ heroId, type }) => {
  const dispatch = useDispatch();

  const hero = useSelector((state) => {
    return selectHeroById(state, heroId);
  });

  const onClickAddToFavorites = async () => {
    try {
      const resultAction = await dispatch(addFavorite(heroId));
      unwrapResult(resultAction);
    } catch (err) {
      console.error(`Failed to add the hero: ${heroId} to favorites`);
    }
  };

  const onClickRemoveHandler = () => {
    if (type === "all") {
      dispatch(deleteHero(heroId));
    } else if (type === "favorite") {
      try {
        dispatch(deleteFavorite(heroId));
      } catch (err) {
        console.error(`Failed to remove the Hero: ${heroId} from favorites`);
      }
    }
  };

  const isIdInFavorites = useSelector((state) =>
    isHeroIdInFavorites(state, hero.id)
  );

  const removeText =
    type === "all" ? "Remove from Heroes" : "Remove from Favorites";

  return (
    <Card>
      <h2>
        {hero.id}.<Link to={`/singleHero/${hero.id}`}>{hero.name}</Link>
      </h2>
      <div>
        {type !== "favorite" && (
          <button
            type="button"
            onClick={onClickAddToFavorites}
            disabled={isIdInFavorites}
          >
            Add to Favorites
          </button>
        )}
        {type !== "dashboard" && (
          <button type="button" onClick={onClickRemoveHandler}>
            {removeText}
          </button>
        )}
        <LikeButton heroId={hero.id} numberLikes={hero.likes}></LikeButton>
      </div>
    </Card>
  );
};
