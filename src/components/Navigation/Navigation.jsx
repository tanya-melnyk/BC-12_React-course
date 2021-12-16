import { HiBookOpen, HiAcademicCap } from 'react-icons/hi';
import NavItem from './NavItem/NavItem';

const Navigation = () => {
  return (
    <nav style={{ paddingTop: 12 }}>
      <NavItem
        name="Факультеты"
        icon={<HiBookOpen color="#ff6b0a" size="24" />}
      />

      <NavItem
        name="Университет"
        icon={<HiAcademicCap color="#ff6b0a" size="24" />}
      />
    </nav>
  );
};

export default Navigation;
