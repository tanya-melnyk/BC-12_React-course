import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Paper from 'components/common/Paper/Paper';
import Loader from 'components/common/Loader/Loader';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import RequireAuthRoute from './RequireAuthRoute';
import RequireNotAuthRoute from './RequireNotAuthRoute';
import { publicRoutes, onlyAuthRoutes, onlyNotAuthRoutes } from './index';

const DepartmentPage = lazy(() =>
  import(
    'pages/DepartmentPage/DepartmentPage' /* webpackChunkName: "Department___page" */
  ),
);

const AllRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/departments" replace />} />

        {/* PUBLIC */}

        <Route path="/departments/:id" element={<DepartmentPage />}>
          <Route
            index
            element={
              <Paper>
                <p>
                  Description Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Accusamus assumenda explicabo, delectus doloribus
                  eligendi incidunt consequuntur eveniet id? Atque facilis unde
                  adipisci quibusdam officiis vero architecto modi, consequatur
                  aut quaerat blanditiis perspiciatis. Consectetur veniam
                  molestias atque omnis! Cumque at a impedit rem quod. Debitis
                  beatae sunt officia. Omnis, molestias dicta!
                </p>
              </Paper>
            }
          />
          <Route
            path="description"
            element={
              <Paper>
                <p>
                  Description Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Accusamus assumenda explicabo, delectus doloribus
                  eligendi incidunt consequuntur eveniet id? Atque facilis unde
                  adipisci quibusdam officiis vero architecto modi, consequatur
                  aut quaerat blanditiis perspiciatis. Consectetur veniam
                  molestias atque omnis! Cumque at a impedit rem quod. Debitis
                  beatae sunt officia. Omnis, molestias dicta!
                </p>
              </Paper>
            }
          />
          <Route
            path="history"
            element={
              <Paper>
                <p>
                  History Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. A quod nisi voluptatum unde obcaecati autem voluptates
                  natus quaerat quibusdam suscipit iure ipsum quam, et libero
                  nemo aspernatur quas nihil fuga!
                </p>
              </Paper>
            }
          />
        </Route>

        {publicRoutes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* ONLY AUTH */}
        {onlyAuthRoutes.map(({ path, component: Component, redirectTo }) => (
          <Route
            key={path}
            path={path}
            element={
              <RequireAuthRoute redirectTo={redirectTo}>
                <Component />
              </RequireAuthRoute>
            }
          />
        ))}
        {/* ONLY NOT AUTH */}
        {onlyNotAuthRoutes.map(({ path, component: Component, redirectTo }) => (
          <Route
            key={path}
            path={path}
            element={
              <RequireNotAuthRoute redirectTo={redirectTo}>
                <Component />
              </RequireNotAuthRoute>
            }
          />
        ))}

        <Route path="*" element={<NotFoundPage />} />

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
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
