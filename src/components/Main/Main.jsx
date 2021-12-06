import Header from '../Header';
import UniversityBlock from '../UniversityBlock';
import TutorsBlock from 'components/TutorsBlock/TutorsBlock';
import univerInfo from '../../data/univerInfo.json';
import tutorsIcon from 'images/cat.png';
import citiesIcon from 'images/pin.png';
import departmentsIcon from 'images/robot.png';

const { name, description, tutors, cities, department } = univerInfo;

const Main = () => {
  return (
    <main>
      Main
      {/* <Header /> */}
      <Header title="Информация о университете" />
      <UniversityBlock name={name} descr={description} />
      <TutorsBlock tutors={tutors} />
    </main>
  );
};

export default Main;
