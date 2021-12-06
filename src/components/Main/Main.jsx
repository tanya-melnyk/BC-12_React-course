import Section from '../common/Section';
import CitiesBlock from '../CitiesBlock';
import DepartmentsBlock from 'components/DepartmentsBlock';
import Header from '../Header';
import TutorsBlock from '../TutorsBlock';
import UniversityBlock from '../UniversityBlock';
import univerInfo from 'data/univerInfo.json';
import tutorsIcon from 'images/cat.png';
import citiesIcon from 'images/pin.png';
import departmentsIcon from 'images/robot.png';

const { name, description, tutors, cities, departments } = univerInfo;

const Main = () => {
  return (
    <main>
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
