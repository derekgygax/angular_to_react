import { unwrapResult } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewHero } from "../../features/heroesSlice";

export const AddHeroForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addHeroStatus, setAddHeroStatus] = useState("idle");

  const dispatch = useDispatch();

  const onNameChanged = (event) => {
    setName(event.target.value);
  };

  const onDescriptionChanged = (event) => {
    setDescription(event.target.value);
  };

  const onAddHeroClicked = async () => {
    // Only do something if a name is provided
    if (name && addHeroStatus === "idle") {
      try {
        setAddHeroStatus("pending");
        const resultAction = await dispatch(
          addNewHero({
            name: name,
            description: description,
          })
        );
        // unwrapResult causes an error to be thrown if addNewPost() doesn't
        // work correctly. createAsynchThink handles errors internally and
        // this helps
        unwrapResult(resultAction);
        setName("");
        setDescription("");
      } catch (err) {
        console.error("Failed to save new Hero: ", err);
      } finally {
        setAddHeroStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add Hero</h2>
      <label htmlFor="newHeroName">Hero Name:</label>
      <input
        type="text"
        id="newHeroName"
        name="newHeroName"
        value={name}
        onChange={onNameChanged}
      />
      <label htmlFor="newHeroDescription">Hero Description</label>
      <textarea
        id="newHeroDescription"
        name="newHeroDescription"
        value={description}
        onChange={onDescriptionChanged}
      />
      <button type="button" onClick={onAddHeroClicked}>
        Add Hero
      </button>
    </section>
  );
};
