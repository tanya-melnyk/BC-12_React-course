import PropTypes from 'prop-types';
import NavItem from './NavItem/NavItem';

/**
 * Добавим в нав инлайновый стиль с верхним паддингом 12px
 */

const Navigation = ({ navConfig }) => {
  return (
    <nav style={{ paddingTop: 12 }}>
      {navConfig.map(({ name, icon }, index) => (
        <NavItem key={index} name={name} icon={icon} />
      ))}
    </nav>
  );
};

Navigation.propTypes = {
  navConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
