import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DepartmentPage from 'pages/DepartmentPage/DepartmentPage';
import DepartmentsListPage from 'pages/DepartmentsListPage/DepartmentsListPage';
import UniversityPage from 'pages/UniversityPage/UniversityPage';
import { ThemeContext, themes } from 'context/themeContext';

import styles from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={theme === themes.light ? styles.lightTheme : styles.darkTheme}
    >
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/departments" />} />

        <Route path="/departments/:id">
          <DepartmentPage />
        </Route>

        <Route exact path="/departments">
          <DepartmentsListPage />
        </Route>

        <Route path="/university">
          <UniversityPage />
        </Route>
      </Switch>
    </main>
  );
};

export default Main;
