import { lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from 'components/common/Loader/Loader';
import RequireAuthRoute from './RequireAuthRoute';
import RequireNotAuthRoute from './RequireNotAuthRoute';

// ДИНАМИЧЕСКИЙ ИМПОРТ

const DepartmentPage = lazy(() =>
  import(
    'pages/DepartmentPage/DepartmentPage' /* webpackChunkName: "Department___page" */
  ),
);
const DepartmentsListPage = lazy(() =>
  import(
    'pages/DepartmentsListPage/DepartmentsListPage' /* webpackChunkName: "Departments__List___page" */
  ),
);
const NotFoundPage = lazy(() =>
  import(
    'pages/NotFoundPage/NotFoundPage' /* webpackChunkName: "Not__Found___page" */
  ),
);
const UniversityPage = lazy(() =>
  import(
    'pages/UniversityPage/UniversityPage' /* webpackChunkName: "University___page" */
  ),
);

const SignUpPage = lazy(() =>
  import('pages/Auth/SignUpPage' /* webpackChunkName: "SignUp___page" */),
);
const SignInPage = lazy(() =>
  import('pages/Auth/SignInPage' /* webpackChunkName: "SignIn___page" */),
);

const Routes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/departments" />} />

        {/* PUBLIC */}
        <Route path="/departments/:id" render={() => <DepartmentPage />} />
        <Route
          exact
          path="/departments"
          render={() => <DepartmentsListPage />}
        />

        {/* AUTH */}
        <Route
          exact
          path="/university"
          render={() => (
            <RequireAuthRoute redirectTo="/sign-in">
              <UniversityPage />
            </RequireAuthRoute>
          )}
        />

        {/* NOT AUTH */}
        <Route
          exact
          path="/sign-up"
          render={() => (
            <RequireNotAuthRoute redirectTo="/university">
              <SignUpPage />
            </RequireNotAuthRoute>
          )}
        />
        <Route
          exact
          path="/sign-in"
          render={() => (
            <RequireNotAuthRoute redirectTo="/university">
              <SignInPage />
            </RequireNotAuthRoute>
          )}
        />

        <Route render={() => <NotFoundPage />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
