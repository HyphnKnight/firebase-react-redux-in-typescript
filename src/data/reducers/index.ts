import { combineReducers } from 'redux';
import auth from './authentication';
import ui from './userInterface';
import database from './database';


export default combineReducers({
  auth,
  ui,
  database,
}) as Reducer<State, Action<any>, State>;