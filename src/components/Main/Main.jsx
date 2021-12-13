import { useState } from 'react';
import Section from '../common/Section/Section';
import CitiesBlock from '../CitiesBlock/CitiesBlock';
import DepartmentsBlock from '../DepartmentsBlock/DepartmentsBlock';
import Header from '../common/Header/Header';
import TutorsBlock from '../TutorsBlock/TutorsBlock';
import UniversityBlock from '../UniversityBlock/UniversityBlock';
import univerInfo from 'data/univerInfo.json';
import tutorsIcon from 'images/cat.png';
import citiesIcon from 'images/pin.png';
import departmentsIcon from 'images/robot.png';
import styles from './Main.module.css';

const { name, description } = univerInfo;

const Main = () => {
  const [showTutots, setShowTutots] = useState(true); // TEMPORARY
  return (
    <main className={styles.main}>
      <Header title="Информация о университете" />

      <UniversityBlock name={name} descr={description} />

      {/* TEMPORARY BUTTON */}
      <button
        style={{ padding: 10, display: 'none' }}
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
