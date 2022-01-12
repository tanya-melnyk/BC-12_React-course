import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

const RequireNotAuthRoute = ({ children, redirectTo }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  // return isLoggedIn ? <Redirect to={redirectTo} /> : children;
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : children;
};

RequireNotAuthRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RequireNotAuthRoute;
