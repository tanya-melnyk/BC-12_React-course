import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../redux/auth';

const RequireNotAuthRoute = ({ children, redirectTo }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return isLoggedIn ? <Redirect to={redirectTo} /> : children;
};

RequireNotAuthRoute.propTypes = {
  children: PropTypes.element.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default RequireNotAuthRoute;
