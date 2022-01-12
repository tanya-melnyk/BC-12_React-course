import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

const RequireAuthRoute = ({ children, redirectTo }) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  // return isLoggedIn ? children : <Redirect to={redirectTo} />;
  return isLoggedIn ? children : <Navigate to={redirectTo} replace />;
};

RequireAuthRoute.propTypes = {
  redirectTo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RequireAuthRoute;
