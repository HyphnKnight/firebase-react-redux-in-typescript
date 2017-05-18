import { connect } from 'react-redux'
import App from '../components/App';
import { $view, $user } from '../data/selectors';

const mapStateToProps = (state: State) => ({
  user: $user(state),
  view: $view(state),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
