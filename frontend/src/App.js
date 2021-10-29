import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Team from "./pages/Team";
import League from "./pages/League";
import Player from "./pages/Player";
import NotFound from "./pages/NotFound";
import Headline from "./pages/Headline";
import CreateAccount from './pages/CreateAccount';
import MakeTeam from './pages/MakeTeam';

// let isLogin = false;

function App() {
  return (
    <BrowserRouter>
      <Headline />
      <Switch>
        <Route path="/maketeam" component={MakeTeam} />
        <Route path="/createaccount" component={CreateAccount} />
        {/* <Route
          path="/login"
          render={() => isLogin ? <Redirect to="/" /> : <Login />} /> */}
        <Route path="/login" component={Login} />
        <Route path="/team" component={Team} />
        <Route path="/league" component={League} />
        <Route path="/player" component={Player} />
        <Route path="/lck/:username" exact component={Home} />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
