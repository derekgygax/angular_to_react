import React from "react";
import { useSelector } from "react-redux";

import { selectHeroIds } from "../features/heroesSlice";

import { HeroesList } from "../components/heroes/HeroesList";
import { AddHeroForm } from "../components/heroes/AddHeroForm";

export const AllHeroes = () => {
  const listOfHeroIds = useSelector(selectHeroIds);

  return (
    <React.Fragment>
      <h1>All Heroes</h1>
      <AddHeroForm />
      <h2>List of Heroes</h2>
      <HeroesList heroIds={listOfHeroIds} listType="all"></HeroesList>
    </React.Fragment>
  );
};
