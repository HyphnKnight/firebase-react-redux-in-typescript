import { createStore } from 'redux';
import reducer from './reducers';


const emptyDatabase: State.database = {
  users: {},
  sessions: {},
  error: null,
};

const defaultState: State = {

  auth: {
    user: null,
    error: null,
  },

  ui: {
    view: 'menu',
    session: null,
    character: null,
  },


  database: emptyDatabase,

};

const state = createStore<State>(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ ?
    window.__REDUX_DEVTOOLS_EXTENSION__<State>() :
    x => x
);

export default state;
