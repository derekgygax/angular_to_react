import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { client } from "../api/client";
import { selectLikesForIds } from "../features/heroesSlice";

import { HeroesList } from "../components/heroes/HeroesList";
import { SearchForHero } from "../components/heroes/SearchForHero";

export const Dashboard = () => {
  const numTopHeroesOnDashboard = 5;

  const [topHeroesIds, setTopHeroesIds] = useState([]);

  const heroesLikes = useSelector((state) =>
    selectLikesForIds(state, topHeroesIds)
  );

  // API to retrieve to top liked heroes
  useEffect(() => {
    const fetchTopLikedHeros = async () => {
      const response = await client.get(
        `/heroes/top/${numTopHeroesOnDashboard}`
      );
      setTopHeroesIds(response);
    };
    // Now start the retrieval
    // IS THIS HOW YOU DO THIS. IT SEEMS DIRTY
    fetchTopLikedHeros();
  }, []);

  // This allows you to sort on screen
  // As the likes changes
  // There is probabaly a MUCH better wasy to do this but this is what you got for now
  useEffect(() => {
    // The method to determine the rank of the heroes
    // Currently uses the numeric value of the id
    const compareHeroes = (a, b) => {
      const compare = b.likes - a.likes;
      if (compare < 0) {
        return -1;
      } else if (compare > 0) {
        return 1;
      }
      return 0;
    };
    const originalOrder = heroesLikes.map((hero) => hero.id);
    const copyHeroesLikes = heroesLikes.slice();
    const newOrder = copyHeroesLikes.sort(compareHeroes).map((hero) => hero.id);
    if (JSON.stringify(originalOrder) !== JSON.stringify(newOrder)) {
      setTopHeroesIds(newOrder);
    }
  }, [heroesLikes]);

  let content;
  if (topHeroesIds.length === 0) {
    content = <div className="loader">Loading...</div>;
  } else {
    content = <HeroesList heroIds={topHeroesIds} listType="dashboard" />;
  }

  return (
    <React.Fragment>
      <h2>Top Heroes</h2>
      {content}
      <SearchForHero />
    </React.Fragment>
  );
};
