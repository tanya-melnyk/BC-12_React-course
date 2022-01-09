import { lazy } from 'react';

const SignUpPage = lazy(() =>
  import('pages/Auth/SignUpPage' /* webpackChunkName: "SignUp___page" */),
);
const SignInPage = lazy(() =>
  import('pages/Auth/SignInPage' /* webpackChunkName: "SignIn___page" */),
);
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

// Public Routes

const departmentsListRoute = {
  path: '/departments',
  exact: true,
  component: DepartmentsListPage,
};

const departmentRoute = {
  path: '/departments/:id',
  exact: false,
  component: DepartmentPage,
};

// Auth Routes

const universityRoute = {
  path: '/university',
  exact: true,
  component: UniversityPage,
  redirectTo: '/sign-in',
};

// not Auth Routes

const singUpRoute = {
  path: '/sign-up',
  exact: true,
  component: SignUpPage,
  redirectTo: '/university',
};

const singInRoute = {
  path: '/sign-in',
  exact: true,
  component: SignInPage,
  redirectTo: '/university',
};

export const publicRoutes = [departmentsListRoute, departmentRoute];
export const authRoutes = [universityRoute];
export const notAuthRoutes = [singInRoute, singUpRoute];

const allRoutes = [...authRoutes, ...publicRoutes, ...notAuthRoutes];
export default allRoutes;
