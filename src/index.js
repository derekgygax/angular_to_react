import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";

// THIS MAYBE WAS WORKING!!!
// import { fetchHeroes } from "./features/heroApiCalls";

import { fetchHeroesAndFavorites } from "./features/heroesSlice";

// import * as serviceWorker from "./serviceWorker";

// Everytime any page is reloaded we have to retrieve all the heroes
// from the datatbase AND so we are going to trigger that here
// We have direct access to the store on this page so we will
// just do that here
// I believe this file is only used on reload or when you visit
// the domain so putting it here will only do it once
store.dispatch(fetchHeroesAndFavorites());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// MAYBE THE BELOW YOU NEED TO BRING BACK LATER!!!

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
