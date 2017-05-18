import { connect } from 'react-redux'
import Menu from '../components/Menu';
import {
  $user,
  $view,
} from '../data/selectors';
import {
  switchView,
} from '../data/requests';

const mapStateToProps = (state: State) => ({
  user: $user(state),
  view: $view(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchView: switchView(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
