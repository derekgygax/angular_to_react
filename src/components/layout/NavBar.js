import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";

export const NavBar = () => {
  const numberFavorites = useSelector((state) => state.heroes.favorites.length);

  let numFavoritesBadge;
  if (numberFavorites > 0) {
    numFavoritesBadge = (
      <span className={classes.badge}>{numberFavorites}</span>
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Tour of Heroes</div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">All Heroes</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/favorite-heroes">
                Favorite Heroes {numFavoritesBadge}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
