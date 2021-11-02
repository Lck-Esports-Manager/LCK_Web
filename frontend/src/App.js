import React, { useEffect } from 'react';
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
import Banpick from './pages/Banpick';
import Game from './pages/Game';
import axios from 'axios';

function App() {
  useEffect(() => {
    console.log('isLogin : ', JSON.parse(window.localStorage.getItem('isLogin')));
    if (JSON.parse(window.localStorage.getItem('isLogin'))) {
      axios.post('http://localhost:8000/api/rest-auth/login/', {
        username: JSON.parse(window.localStorage.getItem('user')).username,
        password: JSON.parse(window.localStorage.getItem('user')).password
      }
      ).then((response) => {
        axios.defaults.headers.common['Authorization'] = `jwt ${response.data.token}`;
      }).catch((Error) => {
        console.log(Error.response);
      });
    }
  }, []);
  return (
    <BrowserRouter>
      <Headline />
      <Switch>
        <Route path="/game" component={Game} />
        <Route path="/banpick" component={Banpick} />
        <Route path="/maketeam" component={MakeTeam} />
        <Route path="/createaccount" component={CreateAccount} />
        <Route
          path="/login"
          render={() => <Login />} />
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
