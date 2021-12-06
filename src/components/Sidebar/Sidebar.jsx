import Navigation from '../Navigation';
import { navConfig } from '../../data/navigation';

const Sidebar = () => {
  return (
    <div>
      <button aria-label="Toggle sidebar"></button>

      <Navigation navConfig={navConfig} />
    </div>
  );
};

export default Sidebar;
