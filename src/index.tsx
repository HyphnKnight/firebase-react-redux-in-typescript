/*
  Application:
    Flow:
    isLoggedIn?
      -> Show Menu
        -> Characters List
        -> Join Session
          -> Session Display
      -> Show login

    Views:
      Login->
      Menu ->
        Character Manager ->
          Character Creator ->
        Session ->
          Dungeon Master->
          Character ->
            -> Character Sheet
            -> Roll

  TODO:
    views:
      [ ]


 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import database from './data';

import App from './containers/App';

ReactDOM.render(
  <Provider store={database}><App /></Provider>,
  document.getElementById('root')
);
