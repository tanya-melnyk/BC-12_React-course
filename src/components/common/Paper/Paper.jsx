import PropTypes from 'prop-types';

const Paper = ({ children }) => {
  return <div className="paper">{children}</div>;
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Paper;
