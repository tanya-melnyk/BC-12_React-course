import PropTypes from 'prop-types';

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

const NavItem = ({ name }) => {
  return (
    <div>
      <span className="iconWrapper"></span>
      <a className="itemName" href="/">
        {name}
      </a>
    </div>
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavItem;
