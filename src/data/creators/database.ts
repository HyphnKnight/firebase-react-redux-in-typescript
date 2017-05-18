import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_ERROR,
} from '../types';
import {
  makeErrorCreator,
} from './util';

const makeDataActionCreator =
  <dataType>(type: string, path: string) =>
    (data: dataType) => ({
      type,
      [path]: data
    });

/* FETCH */
export const fetchUsersSuccess = makeDataActionCreator<Database.users>(
  FETCH_USERS_SUCCESS,
  'users'
);
export const fetchUsersError = makeErrorCreator(FETCH_USERS_ERROR);

export const fetchSessionsSuccess = makeDataActionCreator<Database.sessions>(
  FETCH_SESSIONS_SUCCESS,
  'sessions'
);
export const fetchSessionsError = makeErrorCreator(FETCH_SESSIONS_ERROR);
