import Section from '../common/Section/Section';
import CitiesBlock from '../CitiesBlock/CitiesBlock';
import DepartmentsBlock from '../DepartmentsBlock/DepartmentsBlock';
import Header from '../Header/Header';
import TutorsBlock from '../TutorsBlock/TutorsBlock';
import UniversityBlock from '../UniversityBlock/UniversityBlock';
import univerInfo from 'data/univerInfo.json';
import tutorsIcon from 'images/cat.png';
import citiesIcon from 'images/pin.png';
import departmentsIcon from 'images/robot.png';
import styles from './Main.module.css';

const { name, description, tutors, cities, departments } = univerInfo;

const Main = () => {
  return (
    <main className={styles.main}>
      <Header title="Информация о университете" />

      <UniversityBlock name={name} descr={description} />

      <Section icon={tutorsIcon} title="Преподаватели">
        <TutorsBlock tutors={tutors} />
      </Section>

      <Section icon={citiesIcon} title="Города">
        <CitiesBlock cities={cities} />
      </Section>

      <Section icon={departmentsIcon} title="Факультеты">
        <DepartmentsBlock departments={departments} />
      </Section>
    </main>
  );
};

export default Main;
