import { reduce } from '../../lib/array';
import { merge } from '../../lib/obj';

import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_ERROR,
} from '../types';

import {
  makeReducer,
  makeErrorReducers,
} from './util';

const fetchUsersSuccess = makeReducer<State.database, { users: Database.users }>(
  FETCH_USERS_SUCCESS,
  (state, action) => ({ users: merge(state.users, action.users) })
);

const fetchSessionsSuccess = makeReducer<State.database, { sessions: Database.sessions }>(
  FETCH_SESSIONS_SUCCESS,
  (state, action) => ({ sessions: merge(state.sessions, action.sessions) })
);

const reducers: Reducer<State.database, any, Partial<State.database>>[] = [
  fetchUsersSuccess,
  fetchSessionsSuccess,
  ...makeErrorReducers([
    FETCH_USERS_ERROR,
    FETCH_SESSIONS_ERROR,
  ])
];

const reducer = (state: State.database, action: Action<any>) => reduce(
  reducers,
  (state, reducer) => merge(state, reducer(state, action)),
  state
);


export default reducer;
