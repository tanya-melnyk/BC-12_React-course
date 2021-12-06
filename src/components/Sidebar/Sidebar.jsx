import Navigation from '../Navigation';
import { navConfig } from '../../data/navigation';

const Sidebar = () => {
  return (
    <div>
      Sidebar
      <Navigation navConfig={navConfig} />
    </div>
  );
};

export default Sidebar;
