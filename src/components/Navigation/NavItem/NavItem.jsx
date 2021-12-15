import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, themes } from 'context/themeContext';
import './NavItem.scss';

const NavItem = ({ name, icon }) => {
  const { theme } = useContext(ThemeContext);
  const isActive = false;

  const navItenStyles = ['NavItem'];
  isActive && navItenStyles.push('NavItemActive');
  theme === themes.dark && navItenStyles.push('NavItem-dark');

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
