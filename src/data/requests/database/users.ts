import {
  fetchUsersSuccess,
  fetchUsersError,
} from '../../creators';

import {
  createSingleFetch,
} from './util';

export const fetchUser = createSingleFetch<Database.User>(
  'users',
  fetchUsersSuccess,
  fetchUsersError
);