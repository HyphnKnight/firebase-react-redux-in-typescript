import * as React from 'react';
import { Button } from './Input';

import './Menu.scss';

type MenuState = {
  visible: boolean
}

type MenuProps = {
  user: State.auth.user | null;
  // sessions: Map<Database.SessionId, Database.Session>;
  view: State.ui.view;
  switchView: (view: State.ui.view) => Promise<void>;
}

export default class Menu extends React.PureComponent<MenuProps, MenuState> {

  state = {
    visible: true,
  };

  renderUser() {
    const { switchView, view, user } = this.props;
    if (user) {
      const { displayName, photoURL } = user;
      return (
        <div className="menu-user">
          <img
            className="menu-user-pic"
            src={photoURL || undefined}
          />
          <h1>{displayName || ''}</h1>
          {view !== 'account-manager' && <Button
            label="Edit Account"
            onClick={() => switchView('account-manager')}
          />}
        </div>
      );
    } else {
      return '';
    }
  }

  render() {
    const { user } = this.props;
    const { visible } = this.state;

    return (
      <nav className={`menu ${visible ? 'visible' : ''}`}>
        <div className="background" />
        <div className="menu-icon" onClick={() => this.setState({ visible: !this.state.visible })} />
        {user && this.renderUser()}
      </nav>
    );
  }
}
