import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import SignUp from './SignUp';

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/signup' component={SignUp}/>
    <Route exact path='/profile' component={Profile}/>
  </Switch>
)

export default Main;