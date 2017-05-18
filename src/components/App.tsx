import * as React from 'react';
import LogIn from '../containers/LogIn';
import Menu from '../containers/Menu';
import AccountManager from '../containers/AccountManager';

import './App.scss';

type AppProps = {
  view: State.ui.view;
  user: State.auth.user | null;
}

export default function App(props: AppProps) {
  const { view, user } = props;

  let content: JSX.Element | string = '';

  if (!user) {
    content = <LogIn />;
  } else if(view === 'account-manager') {
    content = <AccountManager />
  }

  return (
    <main className={`view-${view}`} >
      <Menu />
      {content}
    </main>
  );
};