import { map } from '../../lib/array';
export const makeReducer = <state, data>(type: string, reducer: Reducer<state, data, Partial<state>>) =>
  (state: state, action: Action<data>): Partial<state> =>
    action.type === type ? reducer(state, action) || {} : {};

export const errorReducer = (_: any, action: ErrorResponse) => ({
  error: {
    type: action.type,
    message: action.message,
  }
});

export const makeErrorReducers = (types: string[]) => map(
  types,
  type => makeReducer(type, errorReducer)
);