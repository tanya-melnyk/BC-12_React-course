import { useContext, Suspense } from 'react';
import Navigation from '../Navigation/Navigation';
import { ThemeContext, themes } from 'context/themeContext';
import useToggle from 'hooks/useToggle';
import './Sidebar.css';

const defineStyles = (isOpen, theme) => {
  const finalSyles = ['Sidebar'];
  !isOpen && finalSyles.push('Sidebar-closed');
  theme === themes.dark && finalSyles.push('Sidebar-dark');
  return finalSyles.join(' ');
};

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, toggleSidebar] = useToggle(true);

  return (
    <div className={defineStyles(isOpen, theme)}>
      <div className="Sidebar-decor"></div>

      <button
        type="button"
        className="toggle-btn"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      ></button>

      <Suspense fallback="Loading...">
        <Navigation />
      </Suspense>
    </div>
  );
};

export default Sidebar;
