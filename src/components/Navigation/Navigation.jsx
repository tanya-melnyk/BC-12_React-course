import PropTypes from 'prop-types';
import NavItem from './NavItem/NavItem';

/**
 * Добавим в нав инлайновый стиль с верхним паддингом 12px
 */

const Navigation = ({ navConfig }) => {
  return (
    <nav>
      {navConfig.map(({ name }, index) => (
        <NavItem key={index} name={name} />
      ))}
    </nav>
  );
};

Navigation.propTypes = {
  navConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
