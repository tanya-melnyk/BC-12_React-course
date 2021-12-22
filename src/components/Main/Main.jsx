import { useContext, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
import Loader from 'components/common/Loader/Loader';
import { ThemeContext, themes } from 'context/themeContext';
import styles from './Main.module.css';

// ДИНАМИЧЕСКИЙ ИМПОРТ

const DepartmentPage = lazy(() =>
  import(
    '../../pages/DepartmentPage/DepartmentPage' /* webpackChunkName: "Department___page" */
  ),
);
const DepartmentsListPage = lazy(() =>
  import(
    '../../pages/DepartmentsListPage/DepartmentsListPage' /* webpackChunkName: "Departments__List___page" */
  ),
);
const NotFoundPage = lazy(() =>
  import(
    '../../pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "Not__Found___page" */
  ),
);
const UniversityPage = lazy(() =>
  import(
    '../../pages/UniversityPage/UniversityPage' /* webpackChunkName: "University___page" */
  ),
);

const Main = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <main
      className={theme === themes.light ? styles.lightTheme : styles.darkTheme}
    >
      {/* <div className={styles.lanquagesWrapper}>
          <LanguageSwitcher />
      </div> */}

      <Suspense fallback={<Loader />}>
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

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </main>
  );
};

export default Main;
