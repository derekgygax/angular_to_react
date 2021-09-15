import { useState } from "react";
import { updateHero } from "../../features/heroesSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

export const EditHeroForm = ({ hero }) => {
  const [name, setName] = useState(hero.name);
  const [description, setDescription] = useState(hero.description);

  const dispatch = useDispatch();
  const history = useHistory();

  const onNameChanged = (event) => {
    setName(event.target.value);
  };

  const onDescriptionChanged = (event) => {
    setDescription(event.target.value);
  };

  const onSaveHeroChanges = () => {
    // When editing the name will must be provided in the form
    if (name) {
      dispatch(
        updateHero({
          id: hero.id,
          name: name,
          description: description,
          likes: hero.likes,
        })
      );
    }
    // Go to the page displaying the details
    history.push(`/singleHero/${hero.id}`);
  };

  return (
    <form>
      <label htmlFor="heroName">Hero Name:</label>
      <input
        type="text"
        id="heroName"
        name="heroName"
        placeholder="What's that hero's nam e cunt"
        value={name}
        onChange={onNameChanged}
      />
      <label htmlFor="heroDescription">Hero Description:</label>
      <textarea
        id="heroDescription"
        name="heroDescription"
        value={description}
        onChange={onDescriptionChanged}
      />
      <button type="button" onClick={onSaveHeroChanges}>
        Save Hero
      </button>
    </form>
  );
};
