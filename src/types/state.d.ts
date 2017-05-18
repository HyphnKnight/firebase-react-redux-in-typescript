type Collection<type> = {
  [id: string]: type
}

declare namespace State {


  namespace auth {
    type user = {
      uid: string;
      email: string;
      displayName: string;
      photoURL: string;
    }
  }
  type auth = {
    user: auth.user | null;
    error: ErrorResponse | null;
  };

  namespace ui {
    type view = 'menu' | 'account-manager';
    type session = Database.SessionId | null;
    type character = string | null;
  }
  type ui = {
    view: ui.view;
    session: ui.session;
    character: ui.character;
  };

  type database = Database & { error: ErrorResponse | null };
}

declare type State = {
  auth: State.auth;
  ui: State.ui;
  database: State.database;
}
