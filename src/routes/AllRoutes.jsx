import { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from 'components/common/Loader/Loader';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import RequireAuthRoute from './RequireAuthRoute';
import RequireNotAuthRoute from './RequireNotAuthRoute';
import { publicRoutes, onlyAuthRoutes, onlyNotAuthRoutes } from './index';

const AllRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/departments" />} />

        {/* PUBLIC */}

        {publicRoutes.map(({ path, component: Component, exact }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={() => <Component />}
          />
        ))}

        {/* ONLY AUTH */}

        {onlyAuthRoutes.map(
          ({ path, component: Component, exact, redirectTo }) => (
            <Route
              key={path}
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

        {/* ONLY NOT AUTH */}

        {onlyNotAuthRoutes.map(
          ({ path, component: Component, exact, redirectTo }) => (
            <Route
              key={path}
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

        {/* <Route path="/departments/:id" render={() => <DepartmentPage />} />
        <Route
          exact
          path="/departments"
          render={() => <DepartmentsListPage />}
        /> */}

        {/* ONLY AUTH */}
        {/* <Route
          exact
          path="/university"
          render={() => (
            <RequireAuthRoute redirectTo="/sign-in">
              <UniversityPage />
            </RequireAuthRoute>
          )}
        /> */}

        {/* ONLY NOT AUTH */}
        {/* <Route
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
        /> */}

        <Route render={() => <NotFoundPage />} />
      </Switch>
    </Suspense>
  );
};

export default AllRoutes;
