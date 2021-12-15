import { useState, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DepartmentPage from 'pages/DepartmentPage/DepartmentPage';
import DepartmentsListPage from 'pages/DepartmentsListPage/DepartmentsListPage';
import UniversityPage from 'pages/UniversityPage/UniversityPage';
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
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/departments" />} />

        <Route path="/departments/:id">
          <DepartmentPage />
        </Route>

        <Route path="/departments">
          <DepartmentsListPage />
        </Route>

        <Route path="/university">
          <UniversityPage />
          {/* <Header title="Информация о университете" />

          <UniversityBlock name={name} descr={description} /> */}

          {/* TEMPORARY BUTTON */}
          {/* <button
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
          </Section> */}
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
