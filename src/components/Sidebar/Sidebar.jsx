import Navigation from '../Navigation';
import { navConfig } from '../../data/navigation';

/**
 * Импортируем стили сайдбара
 * Используя временную переменную isOpen определим классы
 * Напишем функцию defineStyles(isOpen), которая будет возвращать
 * готовую строку со стилями, в зависимости от переменной isOpen
 * Если она false, то нужно в массив с изначальным классом
 * 'Sidebar' добавлять еще класс 'Sidebar-closed'
 * В конце массив сджойнить
 * Переписать то же самое на шаблонную строку
 * Для определения классов верхнего дива - вызвать функцию
 */

const Sidebar = () => {
  return (
    <div>
      <div className="Sidebar-decor"></div>

      <button className="toggle-btn" aria-label="Toggle sidebar"></button>

      <Navigation navConfig={navConfig} />
    </div>
  );
};

export default Sidebar;
