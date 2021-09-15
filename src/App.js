import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";

import { Layout } from "./components/layout/Layout";
import { AllHeroes } from "./pages/AllHeroes";
import { FavoriteHeroes } from "./pages/FavoriteHeroes";
import { Dashboard } from "./pages/Dashboard";
import { EditHero } from "./pages/EditHero";
import { SingleHero } from "./pages/SingleHero";

// localhost: 3000
function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={AllHeroes} />
          <Route exact path="/favorite-heroes" component={FavoriteHeroes} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/singleHero/:heroId" component={SingleHero} />
          <Route exact path="/editHero/:heroId" component={EditHero} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
