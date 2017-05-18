import {
  fetchSessionsSuccess,
  fetchSessionsError,
} from '../../creators';

import {
  createSingleFetch,
} from './util';

export const fetchSession = createSingleFetch<Database.Session>(
  'sessions',
  fetchSessionsSuccess,
  fetchSessionsError
);