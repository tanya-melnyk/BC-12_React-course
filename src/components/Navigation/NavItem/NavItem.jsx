import PropTypes from 'prop-types';

const NavItem = ({ name }) => {
  return <a href="/">{name}</a>;
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavItem;
