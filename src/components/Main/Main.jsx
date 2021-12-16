import { useState, useContext } from 'react';
import Section from '../common/Section/Section';
import Header from '../common/Header/Header';
import CitiesBlock from '../CitiesBlock/CitiesBlock';
import DepartmentsBlock from '../DepartmentsBlock/DepartmentsBlock';
import TutorsBlock from '../TutorsBlock/TutorsBlock';
import UniversityBlock from '../UniversityBlock/UniversityBlock';
import { ThemeContext, themes } from 'context/themeContext';
import univerInfo from 'data/univerInfo.json';
import tutorsIcon from 'images/cat.png';
import citiesIcon from 'images/pin.png';
import departmentsIcon from 'images/robot.png';
import styles from './Main.module.css';

const { name, description } = univerInfo;

const Main = () => {
  const { theme } = useContext(ThemeContext);
  const [showTutots, setShowTutots] = useState(true); // TEMPORARY

  return (
    <main
      className={theme === themes.light ? styles.lightTheme : styles.darkTheme}
    >
      <Header title="Информация о университете" />

      <UniversityBlock name={name} descr={description} />

      {/* TEMPORARY BUTTON */}
      <button
        style={{ padding: 10, marginBottom: 20, display: 'none' }}
        onClick={() => setShowTutots(!showTutots)}
      >
        Toggle tutors
      </button>

      {showTutots && (
        <Section icon={tutorsIcon} title="Преподаватели">
          <TutorsBlock />
        </Section>
      )}

      <Section icon={citiesIcon} title="Города">
        <CitiesBlock />
      </Section>

      <Section icon={departmentsIcon} title="Факультеты">
        <DepartmentsBlock />
      </Section>
    </main>
  );
};

export default Main;
