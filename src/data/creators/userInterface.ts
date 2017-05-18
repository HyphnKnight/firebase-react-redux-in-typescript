import {
  SWITCH_VIEW,
  SELECT_CHARACTER,
  SELECT_SESSIONS,
} from '../types';

export const switchView = (view: State.ui.view) => ({
  type: SWITCH_VIEW,
  view,
});

export const selectCharacter = (id: string) => ({
  type: SELECT_CHARACTER,
  id,
});

export const selectSession = (id: Database.SessionId) => ({
  type: SELECT_SESSIONS,
  id,
});
