import { merge } from '../../lib/obj';
import {
  logInSuccess, logInError,
  logOutSuccess, logOutError,
  createAccountSuccess, createAccountError,
  updateAccountSuccess, updateAccountError,
  deleteAccountSuccess, deleteAccountError,
} from '../creators';

type LogInCredentials = { email: string, password: string };

export const logIn: AsyncAction<LogInCredentials> =
  dispatch =>
    ({ email, password }) =>
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => dispatch(logInSuccess(user)))
        .catch(error => dispatch(logInError(error.message)));

export const logOut: AsyncAction<{}> =
  dispatch =>
    () =>
      firebase.auth()
        .signOut()
        .then(() => dispatch(logOutSuccess()))
        .catch(error => dispatch(logOutError(error.message)));

export const createAccount: AsyncAction<LogInCredentials> =
  dispatch =>
    ({ email, password }) =>
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => dispatch(createAccountSuccess(user)))
        .catch(error => dispatch(createAccountError(error.message)));

type AccountUpdate = Partial<State.auth.user> & { password?: string };
export const updateAccount: AsyncAction<AccountUpdate> =
  dispatch =>
    update => {
      const user = firebase.auth().currentUser;
      if (user) {
        const {
          displayName,
          photoURL,
        } = merge<firebase.User>(user, update);

        return Promise.all([
          update.email ? user.updateEmail(update.email) : null,
          update.password ? user.updatePassword(update.password) : null,
          user.updateProfile({ displayName, photoURL })
        ])
          .then(() => dispatch(updateAccountSuccess(firebase.auth().currentUser)))
          .catch(error => dispatch(updateAccountError(error.message)));
      } else {
        dispatch(updateAccountError('Not Logged In'));
        return Promise.resolve(undefined);
      }
    };

export const deleteAccount: AsyncAction<{}> =
  dispatch =>
    () => {
      const user = firebase.auth().currentUser;
      if (user) {
        return user
          .delete()
          .then(() => dispatch(deleteAccountSuccess()))
          .catch(error => dispatch(deleteAccountError(error.message)));
      } else {
        return Promise.resolve(
          dispatch(logOutError('Must be logged in to delete an Account'))
        );
      }
    };
