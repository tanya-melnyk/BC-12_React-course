import { useContext, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
import Loader from 'components/common/Loader/Loader';
import Routes from 'routes/Routes';
import { authOperations, authSelectors } from 'redux/auth';
import { ThemeContext, themes } from 'context/themeContext';
import styles from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const isLoadingUser = useSelector(authSelectors.getLoadingUser);

  useEffect(() => {
    dispatch(authOperations.getUser());
  }, [dispatch]);

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <main
      className={theme === themes.light ? styles.lightTheme : styles.darkTheme}
    >
      <div className={styles.lanquagesWrapper}>
        <Suspense fallback={<Loader />}>
          <LanguageSwitcher />
        </Suspense>
      </div>

      <Routes />
    </main>
  );
};

export default Main;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

////////////////////////////////////////////////////////////////////

/////   LESSON 15 final

// import { useContext, lazy, Suspense, useEffect } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
// import Loader from 'components/common/Loader/Loader';
// import { authOperations, authSelectors } from 'redux/auth';
// import { ThemeContext, themes } from 'context/themeContext';
// import styles from './Main.module.css';

// // ДИНАМИЧЕСКИЙ ИМПОРТ

// const DepartmentPage = lazy(() =>
//   import(
//     '../../pages/DepartmentPage/DepartmentPage' /* webpackChunkName: "Department___page" */
//   ),
// );
// const DepartmentsListPage = lazy(() =>
//   import(
//     '../../pages/DepartmentsListPage/DepartmentsListPage' /* webpackChunkName: "Departments__List___page" */
//   ),
// );
// const NotFoundPage = lazy(() =>
//   import(
//     '../../pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "Not__Found___page" */
//   ),
// );
// const UniversityPage = lazy(() =>
//   import(
//     '../../pages/UniversityPage/UniversityPage' /* webpackChunkName: "University___page" */
//   ),
// );

// const SignUpPage = lazy(() =>
//   import('../../pages/Auth/SignUpPage' /* webpackChunkName: "SignUp___page" */),
// );
// const SignInPage = lazy(() =>
//   import('../../pages/Auth/SignInPage' /* webpackChunkName: "SignIn___page" */),
// );

// const Main = () => {
//   const { theme } = useContext(ThemeContext);
//   const isLoadingUser = useSelector(authSelectors.getLoadingUser);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(authOperations.getUser());
//   }, [dispatch]);

//   if (isLoadingUser) {
//     return <Loader />;
//   }

//   return (
//     <main
//       className={theme === themes.light ? styles.lightTheme : styles.darkTheme}
//     >
//       <div className={styles.lanquagesWrapper}>
//         <Suspense fallback={<Loader />}>
//           <LanguageSwitcher />
//         </Suspense>
//       </div>

//       <Suspense fallback={<Loader />}>
//         <Switch>
//           <Route exact path="/" render={() => <Redirect to="/departments" />} />

//           <Route path="/departments/:id">
//             <DepartmentPage />
//           </Route>

//           <Route exact path="/departments">
//             <DepartmentsListPage />
//           </Route>

//           <Route path="/university">
//             <UniversityPage />
//           </Route>

//           <Route path="/sign-up">
//             <SignUpPage />
//           </Route>

//           <Route path="/sign-in">
//             <SignInPage />
//           </Route>

//           <Route>
//             <NotFoundPage />
//           </Route>
//         </Switch>
//       </Suspense>
//     </main>
//   );
// };

// export default Main;

////////////////////////////////////////////////////////////////////

/////   LESSON 16 final

// import { useContext, Suspense } from 'react';
// import Routes from 'routes/Routes';
// import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
// import Loader from 'components/common/Loader/Loader';
// import { ThemeContext, themes } from 'context/themeContext';
// import styles from './Main.module.css';

// const Main = () => {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <main
//       className={theme === themes.light ? styles.lightTheme : styles.darkTheme}
//     >
//       <div className={styles.lanquagesWrapper}>
//         <Suspense fallback={<Loader />}>
//           <LanguageSwitcher />
//         </Suspense>
//       </div>

//       <Routes />
//     </main>
//   );
// };

// export default Main;
