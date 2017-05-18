import * as React from 'react';
import { TextInput, Button, CheckBox } from './Input'

import './LogIn.scss';

type LogInState = {
  email: string,
  password: string,
  displayName: string,
  photoURL: string,
  hasAccount: boolean,
}

type LogInProps = {
  error: ErrorResponse | null,
  logIn: (email: string, password: string) => Promise<void>,
  createAccount: (
    email: string,
    password: string,
    displayName: string,
    photoURL: string
  ) => Promise<void>,
}

export default class LogIn extends React.PureComponent<LogInProps, LogInState> {

  state = {
    email: '',
    password: '',
    displayName: '',
    photoURL: '',
    hasAccount: true,
  };

  authRequest() {
    const {
      email, password,
      displayName, photoURL,
      hasAccount,
    } = this.state;
    const { logIn, createAccount } = this.props;

    return (
      hasAccount ?
        logIn(email, password) :
        createAccount(email, password, displayName, photoURL)
    )

  }

  render() {
    const {
      email, password,
      displayName, photoURL,
      hasAccount,
    } = this.state;

    const { error } = this.props;
    return <div className="LogIn" >
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
      {!hasAccount && <TextInput
        label="Display Name"
        value={displayName}
        onChange={value => this.setState({ displayName: value })}
      />}
      {!hasAccount && <TextInput
        label="Profile Pic Url"
        value={photoURL}
        onChange={value => this.setState({ photoURL: value })}
      />}
      {error && <i>{error.message}</i>}
      <CheckBox
        label="Have Account"
        checked={hasAccount}
        onChange={value => this.setState({ hasAccount: value })}
      />
      <Button
        label={hasAccount ? 'Log In' : 'Create Account'}
        onClick={() => this.authRequest()}
      />
    </div>;
  }
}
