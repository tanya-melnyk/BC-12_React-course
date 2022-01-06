/////////////////////////////////////////////////////

///   LESSON 16 transition

// import { lazy, useEffect, Suspense } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from 'components/common/Loader/Loader';
// import { authOperations, authSelectors } from '../redux/auth';

// const DepartmentPage = lazy(() =>
//   import(
//     'pages/DepartmentPage/DepartmentPage' /* webpackChunkName: "Department___page" */
//   ),
// );
// const DepartmentsListPage = lazy(() =>
//   import(
//     'pages/DepartmentsListPage/DepartmentsListPage' /* webpackChunkName: "Departments__List___page" */
//   ),
// );
// const NotFoundPage = lazy(() =>
//   import(
//     'pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "Not__Found___page" */
//   ),
// );
// const UniversityPage = lazy(() =>
//   import(
//     'pages/UniversityPage/UniversityPage' /* webpackChunkName: "University___page" */
//   ),
// );
// const SignUpPage = lazy(() =>
//   import('pages/Auth/SignUpPage' /* webpackChunkName: "SignUp___page" */),
// );
// const SignInPage = lazy(() =>
//   import('pages/Auth/SignInPage' /* webpackChunkName: "SignIn___page" */),
// );

// export default function Routes() {
//   const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
//   const isLoadingUser = useSelector(authSelectors.getLoadingUser);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(authOperations.getUser());
//   }, [dispatch]);

//   if (isLoadingUser) {
//     return <Loader />;
//   }

//   return (
//     <Suspense fallback={<Loader />}>
//       <Switch>
//         <Route exact path="/" render={() => <Redirect to="/departments" />} />

//         {/* PUBLIC */}

//         <Route path="/departments/:id" render={() => <DepartmentPage />} />

//         <Route
//           exact
//           path="/departments"
//           render={() => <DepartmentsListPage />}
//         />

//         {/* AUTH */}

//         <Route
//           path="/university"
//           render={() =>
//             isLoggedIn ? <UniversityPage /> : <Redirect to="/sign-in" />
//           }
//         />

//         {/* NOT AUTH */}

//         <Route
//           path="/sign-up"
//           render={() =>
//             isLoggedIn ? <Redirect to="/university" /> : <SignUpPage />
//           }
//         />

//         <Route
//           path="/sign-in"
//           render={() =>
//             isLoggedIn ? <Redirect to="/university" /> : <SignInPage />
//           }
//         />

//         <Route render={() => <NotFoundPage />} />
//       </Switch>
//     </Suspense>
//   );
// }

/////////////////////////////////////////////////////

// import { lazy, useEffect, Suspense } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Loader from 'components/common/Loader/Loader';
// import RequireAuthRoute from './RequireAuthRoute';
// import RequireNotAuthRoute from './RequireNotAuthRoute';
// import { authOperations, authSelectors } from '../redux/auth';

// const DepartmentPage = lazy(() =>
//   import(
//     'pages/DepartmentPage/DepartmentPage' /* webpackChunkName: "Department___page" */
//   ),
// );
// const DepartmentsListPage = lazy(() =>
//   import(
//     'pages/DepartmentsListPage/DepartmentsListPage' /* webpackChunkName: "Departments__List___page" */
//   ),
// );
// const NotFoundPage = lazy(() =>
//   import(
//     'pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "Not__Found___page" */
//   ),
// );
// const UniversityPage = lazy(() =>
//   import(
//     'pages/UniversityPage/UniversityPage' /* webpackChunkName: "University___page" */
//   ),
// );
// const SignUpPage = lazy(() =>
//   import('pages/Auth/SignUpPage' /* webpackChunkName: "SignUp___page" */),
// );
// const SignInPage = lazy(() =>
//   import('pages/Auth/SignInPage' /* webpackChunkName: "SignIn___page" */),
// );

// const Routes = () => {
//   const isLoadingUser = useSelector(authSelectors.getLoadingUser);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(authOperations.getUser());
//   }, [dispatch]);

//   if (isLoadingUser) {
//     return <Loader />;
//   }

//   return (
//     <Suspense fallback={<Loader />}>
//       <Switch>
//         <Route exact path="/" render={() => <Redirect to="/departments" />} />

//         {/* PUBLIC */}

//         <Route path="/departments/:id" render={() => <DepartmentPage />} />

//         <Route
//           exact
//           path="/departments"
//           render={() => <DepartmentsListPage />}
//         />

//         {/* AUTH */}

//         <Route
//           path="/university"
//           render={() => (
//             <RequireAuthRoute redirectTo="/sign-in">
//               <UniversityPage />
//             </RequireAuthRoute>
//           )}
//         />

//         {/* NOT AUTH */}

//         <Route
//           path="/sign-up"
//           render={() => (
//             <RequireNotAuthRoute redirectTo="/university">
//               <SignUpPage />
//             </RequireNotAuthRoute>
//           )}
//         />

//         <Route
//           path="/sign-in"
//           render={() => (
//             <RequireNotAuthRoute redirectTo="/university">
//               <SignInPage />
//             </RequireNotAuthRoute>
//           )}
//         />

//         <Route render={() => <NotFoundPage />} />
//       </Switch>
//     </Suspense>
//   );
// };

// export default Routes;

/////////////////////////////////////////////////////

///   LESSON 16 final

import { useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/common/Loader/Loader';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import RequireAuthRoute from './RequireAuthRoute';
import RequireNotAuthRoute from './RequireNotAuthRoute';
import * as routes from './index';
import { authOperations, authSelectors } from 'redux/auth';

export default function Routes() {
  const { publicRoutes, authRoutes, notAuthRoutes } = routes;
  const dispatch = useDispatch();
  const isLoadingUser = useSelector(authSelectors.getLoadingUser);

  useEffect(() => {
    dispatch(authOperations.getUser());
  }, [dispatch]);

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/departments" />} />

        {publicRoutes.map(({ path, exact, component: Component }, index) => (
          <Route key={index} path={path} exact={exact}>
            <Component />
          </Route>
        ))}

        {authRoutes.map(
          ({ path, exact, component: Component, redirectTo }, index) => (
            <Route
              key={index}
              path={path}
              exact={exact}
              render={() => (
                <RequireAuthRoute redirectTo={redirectTo}>
                  <Component />
                </RequireAuthRoute>
              )}
            />
          ),
        )}

        {notAuthRoutes.map(
          ({ path, exact, component: Component, redirectTo }, index) => (
            <Route
              key={index}
              path={path}
              exact={exact}
              render={() => (
                <RequireNotAuthRoute redirectTo={redirectTo}>
                  <Component />
                </RequireNotAuthRoute>
              )}
            />
          ),
        )}

        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}
