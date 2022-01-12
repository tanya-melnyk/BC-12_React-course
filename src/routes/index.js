import { lazy } from 'react';

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

// PUBLIC

const departmentsListRoute = {
  path: '/departments',
  component: DepartmentsListPage,
  exact: true,
};

const departmentRoute = {
  path: '/departments/:id',
  component: DepartmentPage,
  exact: false,
};

// ONLY AUTH

const universityRoute = {
  path: '/university',
  component: UniversityPage,
  exact: true,
  redirectTo: '/sign-in',
};

// ONLY NOT AUTH

const signUpRoute = {
  path: '/sign-up',
  component: SignUpPage,
  exact: true,
  redirectTo: '/university',
};

const signInRoute = {
  path: '/sign-in',
  component: SignInPage,
  exact: true,
  redirectTo: '/university',
};

export const publicRoutes = [departmentsListRoute, departmentRoute];
export const onlyAuthRoutes = [universityRoute];
export const onlyNotAuthRoutes = [signUpRoute, signInRoute];

const allRoutes = [...publicRoutes, ...onlyAuthRoutes, ...onlyNotAuthRoutes];

export default allRoutes;
