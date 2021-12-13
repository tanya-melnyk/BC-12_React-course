import PropTypes from 'prop-types';
import './NavItem.scss';

const NavItem = ({ name, icon }) => {
  const isActive = false;

  const navItenStyles = ['NavItem'];
  isActive && navItenStyles.push('NavItemActive');

  return (
    <a href="/" className={navItenStyles.join(' ')}>
      <span className="iconWrapper">{icon}</span>
      <span className="itemName">{name}</span>
    </a>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default NavItem;
