import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  useParams,
  Routes,
  Route,
  NavLink,
  // useRouteMatch,
  // useHistory,
  useNavigate,
  useLocation,
  // Redirect,
  Outlet,
} from 'react-router-dom';
import BigButton from 'components/common/BigButton/BigButton';
import Paper from 'components/common/Paper/Paper';
import Header from 'components/common/Header/Header';
import * as api from 'services/api';
import s from './DepartmentPage.module.scss';

const API_ENDPOINT = 'departments';

const DepartmentPage = () => {
  const [department, setDepartment] = useState({});
  // const match = useRouteMatch();
  const params = useParams();
  // const history = useHistory();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDepartment = () => {
      api
        .getData(`${API_ENDPOINT}/${params.id}`)
        .then(setDepartment)
        .catch(err => {
          toast.error('Факультет не найден');
          // history.replace('/departments');
        });
    };
    fetchDepartment();
  }, [params.id]);

  const handleGoBack = () => {
    // history.goBack(); === navigate(-1);
    // history.push(location.state?.from ?? '/departments');
    navigate(location.state?.from ?? '/departments');
  };

  return (
    <>
      <Header title={department.name ?? 'Факультет'} />
      <div className={s.wrapper}>
        <BigButton
          text={location.state?.label ?? 'Назад ко всем факультетам'}
          onClick={handleGoBack}
          isGray
        />
      </div>

      <nav className={s.nav}>
        <div className={s.linkWrapper}>
          <NavLink
            to="description"
            className={({ isActive }) =>
              isActive || location.pathname === `/departments/${params.id}`
                ? s.activeLink
                : s.link
            }
            state={{
              from: location.state?.from,
              label: location.state?.label,
            }}
            // to={`${match.url}/description`}
            // to={{
            //   pathname: `${match.url}/description`,
            //   state: {
            //     from: location.state?.from,
            //     label: location.state?.label,
            //   },
            // }}
            // className={s.link}
            // activeClassName={s.activeLink}
            // isActive={(matchRoute, location) =>
            //   matchRoute?.isExact || location.pathname === match.url
            // }
          >
            Описание
          </NavLink>
        </div>
        <div>
          <NavLink
            to="history"
            className={({ isActive }) => (isActive ? s.activeLink : s.link)}
            state={{
              from: location.state?.from,
              label: location.state?.label,
            }}
            // to={`${match.url}/history`}
            // to={{
            //   pathname: `${match.url}/history`,
            //   state: {
            //     from: location.state?.from,
            //     label: location.state?.label,
            //   },
            // }}
            // className={s.link}
            // activeClassName={s.activeLink}
          >
            История
          </NavLink>
        </div>
      </nav>

      <Outlet />

      {/* <Routes>
        <Route
          exact
          path="description"
          element={
            <Paper>
              <p className={s.text}>
                Description Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Accusamus assumenda explicabo, delectus doloribus eligendi
                incidunt consequuntur eveniet id? Atque facilis unde adipisci
                quibusdam officiis vero architecto modi, consequatur aut quaerat
                blanditiis perspiciatis. Consectetur veniam molestias atque
                omnis! Cumque at a impedit rem quod. Debitis beatae sunt
                officia. Omnis, molestias dicta!
              </p>
            </Paper>
          }
        /> */}
      {/* <Route exact path={[match.path, `${match.path}/description`]}> */}

      {/* <Route exact path={`${match.path}/history`}> */}
      {/* <Route
          exact
          path="history"
          element={
            <Paper>
              <p className={s.text}>
                History Lorem ipsum dolor sit amet consectetur adipisicing elit.
                A quod nisi voluptatum unde obcaecati autem voluptates natus
                quaerat quibusdam suscipit iure ipsum quam, et libero nemo
                aspernatur quas nihil fuga!
              </p>
            </Paper>
          }
        /> */}

      {/* <Route render={() => <Redirect to={match.url} />} /> */}
      {/* </Routes> */}
    </>
  );
};

export default DepartmentPage;
