import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Team from "./pages/Team";
import League from "./pages/League";
import Player from "./pages/Player";
import NotFound from "./pages/NotFound";
import Headline from "./pages/components/Headline";
import CreateAccount from './pages/CreateAccount';
import MakeTeam from './pages/MakeTeam';
import Banpick from './pages/Banpick';
import Game from './pages/Game';
import PersonalSchedule from './pages/PersonalSchedule';
import PlayerDetail from './pages/PlayerDetail'
import TeamChange from './pages/TeamChange'
import AddPlayer from './pages/AddPlayer';
import axios from 'axios';
// import header from './config';

axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    if (window.localStorage.getItem('isLogin')) {
      // console.log('isLogin : ', JSON.parse(window.localStorage.getItem('isLogin')));
      if (JSON.parse(window.localStorage.getItem('isLogin'))) {
        axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
      }
    }
  }, []);
  return (
    <>
      <audio
        controls
        id="bgm"
        loop
        src='https://docs.google.com/uc?export=open&id=14JlzHWUE2TqAsN237ft43SOw02xDPori'
        autoPlay={true}>
      </audio>
      <BrowserRouter>
        <Headline />
        <Switch>
          <Route path="/personalschedule" component={PersonalSchedule} />
          <Route path="/game/:side/:turn/:id" component={Game} />
          <Route path="/game" component={Game} />
          <Route path="/banpick/:side" component={Banpick} />
          <Route path="/banpick" component={Banpick} />
          <Route path="/maketeam" component={MakeTeam} />
          <Route path="/createaccount" component={CreateAccount} />
          <Route
            path="/login"
            render={() => <Login />} />
          <Route path="/team" component={Team} />
          <Route
            path="/league"
            render={() => <League />} />
          <Route path="/player" component={Player} />
          <Route path="/lck/:username" exact component={Home} />
          <Route path="/playerdetail/:id" exact component={PlayerDetail} />
          <Route path="/changeteam" exact component={TeamChange} />
          <Route path="/addplayer" exact component={AddPlayer} />
          <Route
            exact
            path="/"
            render={() => <Home />} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
