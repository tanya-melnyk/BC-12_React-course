import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import { navConfig } from '../../data/navigation';
import './Sidebar.css';

const defineStyles = isOpen => {
  const finalSyles = ['Sidebar'];
  if (!isOpen) {
    finalSyles.push('Sidebar-closed');
  }
  return finalSyles.join(' ');
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prevIsOpen => !prevIsOpen);

  return (
    <div className={defineStyles(isOpen)}>
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
