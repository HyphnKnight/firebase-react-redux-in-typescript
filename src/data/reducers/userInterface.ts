import { reduce } from '../../lib/array';
import { merge } from '../../lib/obj';

import {
  SWITCH_VIEW
} from '../types';

import { makeReducer } from './util';


const switchView = makeReducer<State.ui, { view: State.ui.view }>(
  SWITCH_VIEW,
  (_, action) => ({
    view: action.view
  })
);

const reducers: Reducer<State.ui, any, Partial<State.ui>>[] = [
  switchView,
];

const reducer = (state: State.ui, action: Action<any>) => reduce(
  reducers,
  (state, reducer) => merge(state, reducer(state, action)),
  state
);

export default reducer;
