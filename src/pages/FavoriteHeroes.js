import { useSelector } from "react-redux";

import { selectFavoriteIds } from "../features/heroesSlice";

import { HeroesList } from "../components/heroes/HeroesList";

export const FavoriteHeroes = () => {
  const favoriteIds = useSelector(selectFavoriteIds);
  return <HeroesList heroIds={favoriteIds} listType="favorite"></HeroesList>;
};
