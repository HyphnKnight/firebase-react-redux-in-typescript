import * as React from 'react';
import { TextInput, Button } from './Input'

import './AccountManager.scss';

type AMState = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
}

type AMProps = {
  user: State.auth.user | null;
  error: ErrorResponse | null;
  updateAccount: (data: Partial<firebase.UserInfo> & { password?: string }) => Promise<void>;
  logOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export default class AccountManager extends React.PureComponent<AMProps, AMState> {

  state = {
    email: '',
    password: '',
    displayName: '',
    photoURL: '',
  };

  updateAccount() {
    const {
      user,
      updateAccount
    } = this.props;
    if (user) {
      const {
        email: oldEmail,
        displayName: oldName,
        photoURL: oldPhoto,
      } = user;
      const {
        email,
        password,
        displayName,
        photoURL,
      } = this.state;
      const update: Partial<firebase.UserInfo> & { password?: string } = {};
      if (email !== oldEmail) {
        update.email = email;
      }
      if (displayName !== oldName) {
        update.displayName = displayName;
      }
      if (photoURL !== oldPhoto) {
        update.photoURL = photoURL;
      }
      if (password !== '') {
        update.password = password;
      }
      updateAccount(update);
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) {
      this.setState({
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      });
    }
  }

  render() {
    const {
      email, password,
      displayName, photoURL,
    } = this.state;
    const {
      error,
      logOut,
      deleteAccount
    } = this.props;

    return <div className="AccountManager" >
      <img className="AccountManager-pic" alt="user-pic" src={photoURL} />
      <TextInput
        label={"email"}
        value={email}
        onChange={value => this.setState({ email: value })}
      />
      <TextInput
        label="password"
        value={password}
        onChange={value => this.setState({ password: value })}
        type={'password'}
      />
      <TextInput
        label="Display Name"
        value={displayName}
        onChange={value => this.setState({ displayName: value })}
      />
      <TextInput
        label="Profile Pic Url"
        value={photoURL}
        onChange={value => this.setState({ photoURL: value })}
      />
      {error && <i>{error.message}</i>}
      <Button
        label="Log Out"
        onClick={() => logOut()}
      />
      <Button
        label="Update Account"
        onClick={() => this.updateAccount()}
      />
      <Button
        className="type-delete"
        label="Delete Account"
        onClick={() => deleteAccount()}
      />
    </div>;
  }
}
