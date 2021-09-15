import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./LikeButton.module.css";
import { addLike } from "../../features/heroesSlice";

export const LikeButton = ({ heroId, numberLikes }) => {
  const [numLikes, setNumLikes] = useState(numberLikes);
  const [disableLike, setDisableLike] = useState(false);

  const dispatch = useDispatch();

  const onClickLikeButtonHandler = () => {
    // Disable the like button so it can't be clicked while
    //   the request is being sent to the backend
    setDisableLike(true);

    // Increase the number of likes when the button is clicked
    setNumLikes((prevNumLikes) => prevNumLikes + 1);

    // Now send to the database the number of likes
    const addLikeToDb = async () => {
      // We don't need to pass the number of likes because
      // it's always going to increase by 1
      await dispatch(addLike(heroId));
      // Make the button clickable again after the request has returned
      setDisableLike(false);
    };
    addLikeToDb();
  };

  let numLikesBade;
  if (numLikes > 0) {
    numLikesBade = <span className={classes.badge}>{numLikes}</span>;
  }

  return (
    <button
      type="button"
      onClick={onClickLikeButtonHandler}
      disabled={disableLike}
    >
      Like {numLikesBade}
    </button>
  );
};
