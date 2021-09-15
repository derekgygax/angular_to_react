import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import { selectHeroById } from "../features/heroesSlice";

import classes from "../general.module.css";

export const SingleHero = ({ match }) => {
  const { heroId } = match.params;
  const hero = useSelector((state) => selectHeroById(state, heroId));

  return (
    <section>
      <h1>Hero Details</h1>
      <Card>
        <article>
          <h2>{hero.name}</h2>
          <p>{hero.description}</p>
          <Link to={`/editHero/${hero.id}`} className={classes.button}>
            Edit Hero
          </Link>
        </article>
      </Card>
    </section>
  );
};
