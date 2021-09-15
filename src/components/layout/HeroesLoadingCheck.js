import { useSelector } from "react-redux";

export const HeroesLoadingCheck = (props) => {
  const heroesStatus = useSelector((state) => state.heroes.status);
  const error = useSelector((state) => state.heroes.error);

  let content;
  if (heroesStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (heroesStatus === "succeeded") {
    content = props.children;
  } else if (heroesStatus === "failed") {
    content = <div>{error}</div>;
  }

  return content;
};
