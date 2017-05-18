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
  makeErrorCreator,
  makeEmptyAction,
} from './util';

const makeUserActionCreator =
  (type: string) =>
    (user: firebase.User | null) => ({ type, user });

/* AUTHENTICATION */

export const logInSuccess = makeUserActionCreator(LOG_IN_SUCCESS);
export const logInError = makeErrorCreator(LOG_IN_ERROR);

export const logOutSuccess = makeEmptyAction(LOG_OUT_SUCCESS);
export const logOutError = makeErrorCreator(LOG_OUT_ERROR);

export const createAccountSuccess = makeUserActionCreator(CREATE_ACCOUNT_SUCCESS);
export const createAccountError = makeErrorCreator(CREATE_ACCOUNT_ERROR);

export const updateAccountSuccess = makeUserActionCreator(UPDATE_ACCOUNT_SUCCESS);
export const updateAccountError = makeErrorCreator(UPDATE_ACCOUNT_ERROR);

export const deleteAccountSuccess = makeEmptyAction(DELETE_ACCOUNT_SUCCESS);
export const deleteAccountError = makeErrorCreator(DELETE_ACCOUNT_ERROR);
