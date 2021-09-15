import { useSelector } from "react-redux";

import { selectHeroById } from "../features/heroesSlice";

import { EditHeroForm } from "../components/heroes/EditHeroForm";
import Card from "../components/ui/Card";

export const EditHero = ({ match }) => {
  const { heroId } = match.params;
  const hero = useSelector((state) => selectHeroById(state, heroId));

  return (
    <section>
      <h2>Edit Hero</h2>
      <Card>
        <EditHeroForm hero={hero} />
      </Card>
    </section>
  );
};
