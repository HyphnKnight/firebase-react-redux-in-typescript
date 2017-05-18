import { reduce } from '../../lib/array';
import { merge } from '../../lib/obj';

import {
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
} from '../types';

import {
  makeReducer,
  makeErrorReducers,
} from './util';

type UserData = { user: firebase.User };
const userReducer =
  (_: any, action: UserData): ({ user: State.auth.user, error: null }) =>
    ({
      user: {
        uid: action.user.uid || '',
        email: action.user.email || '',
        displayName: action.user.displayName || '',
        photoURL: action.user.photoURL || '',
      },
      error: null
    });


const logInSuccess = makeReducer<State.auth, UserData>(
  LOG_IN_SUCCESS,
  userReducer
);

const logOutSuccess = makeReducer<State.auth, {}>(
  LOG_OUT_SUCCESS,
  () => ({ user: null })
);

const createAccountRequest = makeReducer<State.auth, UserData>(
  CREATE_ACCOUNT_SUCCESS,
  userReducer
);

const updateAccountRequest = makeReducer<State.auth, UserData>(
  UPDATE_ACCOUNT_SUCCESS,
  userReducer
);

const deleteAccountRequest = makeReducer<State.auth, UserData>(
  DELETE_ACCOUNT_SUCCESS,
  () => ({ user: null })
);


const reducers: Reducer<State.auth, any, Partial<State.auth>>[] = [
  logInSuccess,
  logOutSuccess,
  createAccountRequest,
  updateAccountRequest,
  deleteAccountRequest,
  ...makeErrorReducers([
    LOG_IN_ERROR,
    LOG_OUT_ERROR,
    CREATE_ACCOUNT_ERROR,
    UPDATE_ACCOUNT_ERROR,
    DELETE_ACCOUNT_ERROR,
  ])
];

const reducer = (state: State.auth, action: Action<any>) => reduce(
  reducers,
  (state, reducer) => merge(state, reducer(state, action)),
  state
);


export default reducer;
