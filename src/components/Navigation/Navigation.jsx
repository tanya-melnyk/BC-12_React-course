import { useTranslation } from 'react-i18next';
import { HiBookOpen, HiAcademicCap } from 'react-icons/hi';
import NavItem from './NavItem/NavItem';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <nav style={{ paddingTop: 12 }}>
      <NavItem
        name={t('sidebar.departments')}
        icon={<HiBookOpen color="#ff6b0a" size="24" />}
        path="/departments"
      />

      <NavItem
        name={t('sidebar.university')}
        icon={<HiAcademicCap color="#ff6b0a" size="24" />}
        path="/university"
      />
    </nav>
  );
};

export default Navigation;
