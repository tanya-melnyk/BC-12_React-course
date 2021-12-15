import { useState, useEffect } from 'react';
import {
  NavLink,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import BigButton from 'components/common/BigButton/BigButton';
import Paper from 'components/common/Paper/Paper';
import Header from 'components/common/Header/Header';
import * as api from 'services/api';
import s from './DepartmentPage.module.scss';

const API_ENDPOINT = 'departments/';

const DepartmentPage = () => {
  const { url, path } = useRouteMatch();
  // const location = useLocation();
  // const history = useHistory();
  const { id } = useParams();

  // // const { slug } = useParams();
  // // const id = slug.match(/[0-9a-z]+$/)[0];

  const [department, setDepartment] = useState({});

  // // define custom breadcrumbs for certain routes.
  // // breadcumbs can be components or strings.
  // const routes = [
  //   { path: '/faculties/:id/description', breadcrumb: 'description' },
  //   { path: '/faculties/:id/history', breadcrumb: 'history' },
  //   { path: '/faculties/:id', breadcrumb: department.name },
  //   { path: path, breadcrumb: department.name },
  // ];

  // const breadcrumbs = useBreadcrumbs(routes);

  useEffect(() => {
    const fetchDepartment = () => {
      api
        .getData(API_ENDPOINT + id) // добавить id
        .then(setDepartment)
        .catch(err => console.log(err.message));
    };
    fetchDepartment();
  }, [id]);

  // const handleGoBack = () =>
  //   history.push(location.state?.from?.location ?? '/');

  return (
    <>
      <Header title={department.name ?? 'Факультет'} />

      {/* <div className={s.wrapper}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div> */}

      {/* <div className={s.wrapper}>
        <AddButton
          text={location.state?.from?.label ?? 'Назад'}
          onClick={handleGoBack}
          isGray
        />
      </div> */}

      <nav className={s.nav}>
        <div className={s.linkWrapper}>
          {/* <a href="/" className={s.link} activeClassName={s.activeLink}>
            Описание
          </a> */}
          <NavLink
            to={`${url}/description`}
            // to={`/departments/${id}/description`}
            // to={{
            //   pathname: `/faculties/${id}/description`,
            //   state: { from: location.state?.from },
            // }}
            className={s.link}
            activeClassName={s.activeLink}
            // isActive={(match, location) =>
            //   match?.isExact || location.pathname === url
            // }
          >
            Описание
          </NavLink>
        </div>
        <div>
          {/* <a href="/" className={s.link} activeClassName={s.activeLink}>
            История
          </a> */}
          <NavLink
            to={`${url}/history`}
            // to={{
            //   pathname: `/faculties/${id}/history`,
            //   state: { from: location.state?.from },
            // }}
            className={s.link}
            activeClassName={s.activeLink}
          >
            История
          </NavLink>
        </div>
      </nav>

      <Switch>
        <Route path={`${path}/description`}>
          <Paper>
            <p className={s.text}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Doloribus velit neque, eaque non pariatur obcaecati quae
              accusantium, inventore consequatur ullam unde consequuntur, eos
              eligendi? Asperiores, minima nisi. Accusamus numquam quis, nihil,
              dolor cum quibusdam ipsam quo quae, iure maiores praesentium
              ratione optio. Perspiciatis, unde at! Aperiam expedita maxime illo
              nobis.
            </p>
          </Paper>
        </Route>

        <Route path={`${path}/history`}>
          <Paper>
            <p className={s.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              autem suscipit fuga recusandae reprehenderit ad dolore, error
              molestiae, magni quasi similique odio quia provident voluptatem
              earum alias consectetur neque vero!
            </p>
          </Paper>
        </Route>
      </Switch>
    </>
  );
};

export default DepartmentPage;
