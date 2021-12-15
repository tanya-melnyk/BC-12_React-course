import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext, themes } from 'context/themeContext';
import './NavItem.scss';

const NavItem = ({ name, icon, path }) => {
  const { theme } = useContext(ThemeContext);
  // const isActive = true;

  const navItenStyles = ['NavItem'];
  // isActive && navItenStyles.push('NavItemActive');
  theme === themes.dark && navItenStyles.push('NavItem-dark');

  return (
    <NavLink
      to={path}
      className={navItenStyles.join(' ')}
      activeClassName="NavItemActive"
      exact
      // isActive={(match, location) =>
      //   path === match?.url ||
      //   (path === '/faculties' && location.pathname === '/')
      // }
    >
      <span className="iconWrapper">{icon}</span>
      <span className="itemName">{name}</span>
      {/* <span className={s.iconWrapper}>{icon}</span>
      <span className={s.itemName}>{t(`sidebar.${name}`)}</span> */}
    </NavLink>

    // <a href="/" className={navItenStyles.join(' ')}>
    //   <span className="iconWrapper">{icon}</span>
    //   <span className="itemName">{name}</span>
    // </a>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default NavItem;
