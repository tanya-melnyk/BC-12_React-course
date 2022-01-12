import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { Routes, Route, Redirect } from 'react-router-dom';
import Loader from 'components/common/Loader/Loader';
import RequireAuthRoute from './RequireAuthRoute';
import RequireNotAuthRoute from './RequireNotAuthRoute';
import Paper from 'components/common/Paper/Paper';

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

const AllRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route path="/" render={() => <Redirect to="/departments" />} /> */}
        <Route path="/" element={<Navigate replace to="departments" />} />

        {/* PUBLIC */}
        <Route path="departments" element={<DepartmentsListPage />} />

        <Route path="departments/:id" element={<DepartmentPage />}>
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

        {/* <Route path="departments/:id/*" element={<DepartmentPage />} /> */}

        {/* AUTH */}
        <Route
          path="university"
          element={
            <RequireAuthRoute redirectTo="/sign-in">
              <UniversityPage />
            </RequireAuthRoute>
          }
        />

        {/* NOT AUTH */}
        <Route
          path="sign-up"
          element={
            <RequireNotAuthRoute redirectTo="/university">
              <SignUpPage />
            </RequireNotAuthRoute>
          }
        />
        <Route
          path="sign-in"
          element={
            <RequireNotAuthRoute redirectTo="/university">
              <SignInPage />
            </RequireNotAuthRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
