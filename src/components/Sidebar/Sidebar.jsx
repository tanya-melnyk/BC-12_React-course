import { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import { ThemeContext, themes } from 'context/themeContext';
import useToggle from 'hooks/useToggle';
import { navConfig } from '../../data/navigation';
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

  // const [isOpen, setIsOpen] = useState(true);
  // const toggleSidebar = () => setIsOpen(prevIsOpen => !prevIsOpen);

  return (
    <div className={defineStyles(isOpen, theme)}>
      <div className="Sidebar-decor"></div>

      <button
        type="button"
        className="toggle-btn"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      ></button>

      <Navigation navConfig={navConfig} />
    </div>
  );
};

//////////  CLASS  //////////

// class Sidebar extends Component {
// state = { isOpen: true };

//   toggleSidebar = () =>
//     this.setState(prevState => ({ isOpen: !prevState.isOpen }));

//   render() {
//     return (
//       <div className={defineStyles(this.state.isOpen)}>
//         <div className="Sidebar-decor"></div>

//         <button
//           type="button"
//           className="toggle-btn"
//           aria-label="Toggle sidebar"
//           onClick={this.toggleSidebar}
//         ></button>

//         <Navigation navConfig={navConfig} />
//       </div>
//     );
//   }
// }

export default Sidebar;
