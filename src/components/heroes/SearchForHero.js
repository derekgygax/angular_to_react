import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectHeroesMatchingSearchTerm } from "../../features/heroesSlice";

import Card from "../ui/Card";

export const SearchForHero = () => {
  // The way you have this contructed is how you have to
  // so that react won't complain that you have a useSelector inside
  // the onChange ....
  const [searchTerm, setSearchTerm] = useState("");

  const matchingHeros = useSelector((state) => {
    if (!searchTerm) {
      return [];
    }
    return selectHeroesMatchingSearchTerm(state, searchTerm);
  });

  // NEED TO PUT DEBOUNCE ON TIMING IN!!!
  // BUT FOR NOW JUST TYPE SLOW HAHA

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let resultContents;
  if (matchingHeros.length > 0) {
    resultContents = (
      <Card>
        <ul>
          {matchingHeros.map((hero) => {
            return (
              <li key={hero.id}>
                <div>
                  <Link to={`/singleHero/${hero.id}`}>{hero.name}</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    );
  }

  return (
    <div id="search-component">
      <h2>Search for a Hero</h2>
      <Card>
        <label htmlFor="search-box">Hero Search: </label>
        <input
          id="searchBox"
          type="text"
          name="newHeroName"
          value={searchTerm}
          onChange={onSearchChange}
        />
        {resultContents}
      </Card>
    </div>
  );
};
