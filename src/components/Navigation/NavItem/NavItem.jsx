import PropTypes from 'prop-types';
import './NavItem.scss';

/**
 * Импортируем стили NavItem
 * Используя временную переменную isActive определим классы верхнего дива
 * Создадим переменную navItemClasses, которая будет хранить
 * в массиве название базового класса 'NavItem', а если
 * переменная isActive будет true, нужно в массив добавить
 * класс 'NavItemActive'
 * В конце массив сджойнить
 * Для определения классов верхнего дива - использовать переменную
 */

const NavItem = ({ name, icon }) => {
  const isActive = false;

  const navItenStyles = ['NavItem'];
  isActive && navItenStyles.push('NavItemActive');

  return (
    <div className={navItenStyles.join(' ')}>
      <span className="iconWrapper">{icon}</span>
      <a className="itemName" href="/">
        {name}
      </a>
    </div>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default NavItem;
