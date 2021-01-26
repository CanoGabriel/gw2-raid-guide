import React from "react";
import {
  BrowserRouter as Router, Route, Switch,
} from "react-router-dom";
import { AuthRoute, AuthProvider } from "./shared";
import RaidList from "./pages/raid-list/raid-list";
import RaidDetail from "./pages/raid-detail/raid-detail";
import RaidEditDetail from "./pages/raid-edit-detail/raid-edit-detail";
import AuthenticationPage from "./pages/authentication-page/authentication-page";
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
        <Route exact path="/login" component={AuthenticationPage} />
        <AuthRoute exact path="/" component={RaidList} />
      </Switch>
    </AuthProvider>
  </Router>
);

export default App;
