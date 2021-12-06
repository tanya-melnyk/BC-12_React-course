import PropTypes from 'prop-types';
import s from './Paper.module.scss';

const Paper = ({ children }) => {
  return <div className="">{children}</div>;
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Paper;
