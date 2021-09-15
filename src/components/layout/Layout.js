import { HeroesLoadingCheck } from "./HeroesLoadingCheck";
import classes from "./Layout.module.css";

import { NavBar } from "./NavBar";

export const Layout = (props) => {
  return (
    <div>
      <NavBar />
      {/* Make sure the heroes have been received from the DB before you try to load everything */}
      <HeroesLoadingCheck>
        <main className={classes.main}>{props.children}</main>
      </HeroesLoadingCheck>
    </div>
  );
};
