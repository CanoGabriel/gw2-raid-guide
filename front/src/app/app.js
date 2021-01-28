import React from "react";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { AuthRoute, AuthProvider, LoginPage } from "./domains/user";
import RaidList from "./pages/raid-list/raid-list";
import RaidDetail from "./pages/raid-detail/raid-detail";
import RaidEditDetail from "./pages/raid-edit-detail/raid-edit-detail";
import Test from "./pages/test/test";
import "./app.scss";

const App = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Route exact path="/404">
          404
        </Route>
        <AuthRoute exact noAnonymous path="/raid/:id/edit" component={RaidEditDetail} />
        <AuthRoute exact path="/raid/:id" component={RaidDetail} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/test" component={Test} />
        <AuthRoute exact path="/" component={RaidList} />
      </Switch>
    </AuthProvider>
  </Router>
);

// TODO 404 page
// TODO 403 page
// TODO 401 page
export default App;
