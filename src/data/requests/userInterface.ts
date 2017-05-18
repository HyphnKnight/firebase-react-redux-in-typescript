import {
  switchView as switchViewActionCreator,
} from '../creators';

export const switchView: AsyncAction<State.ui.view> =
  dispatch =>
    view => Promise.resolve(
      dispatch(switchViewActionCreator(view))
    );