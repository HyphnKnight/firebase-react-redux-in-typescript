import { connect } from 'react-redux'
import AccountManager from '../components/AccountManager';
import {
  $user,
  $authError,
} from '../data/selectors';
import {
  updateAccount,
  logOut,
  deleteAccount,
} from '../data/requests';

const mapStateToProps = (state: State) => ({
  user: $user(state),
  error: $authError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateAccount: updateAccount(dispatch),
  logOut: logOut(dispatch),
  deleteAccount: deleteAccount(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountManager);
