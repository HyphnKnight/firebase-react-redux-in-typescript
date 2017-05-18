
declare namespace Database {

  type UserId = string;
  type SessionId = string;

  /* ACCOUNT */

  type User = {
    id: UserId;
    characters: {
      [characterId: string]: true
    };
    sessions: {
      [sessionId: string]: string;
    };
  };
  type users = { [UserId: string]: User };

  type Session = {
    id: SessionId,
    name: string,
    dm: {
      [userId: string]: true,
    },
    users: {
      [userId: string]: string,
    },
  };
  type sessions = { [SessionId: string]: Session; };

}

declare type Database = {
  users: Database.users;
  sessions: Database.sessions;
}
