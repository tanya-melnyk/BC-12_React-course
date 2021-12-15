import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
// import { useHistory, useLocation } from 'react-router';
import Paper from 'components/common/Paper/Paper';
// import Selector from 'components/common/Selector/Selector';
// import DepartmentsLinks from 'components/DepartmentsLinks';
import Header from 'components/common/Header/Header';
import * as api from 'services/api';
import s from './DepartmentsListPage.module.css';
// import slugify from 'slugify';

// const loaderStyles = {
//   position: 'absolute',
//   top: '28px',
//   left: '30%',
// };

const API_ENDPOINT = 'departments';
// const SORT_KEY = 'orderBy';
// const SORT_KEY = 'sortBy';

// const sortOptions = [
//   {
//     label: 'По времени создания',
//     value: 'id',
//   },
//   {
//     label: 'По названию',
//     value: 'name',
//   },
// ];

const DepartmentsListPage = () => {
  // const history = useHistory();
  // const location = useLocation();

  const match = useRouteMatch();
  console.log(match);

  const [departments, setDepartments] = useState([]);

  // const sortValue =
  //   new URLSearchParams(location.search).get(SORT_KEY) ?? sortOptions[0].value;

  useEffect(() => {
    const fetchDepartments = () => {
      api
        .getData(API_ENDPOINT)
        // .getData(`${API_ENDPOINT}?${SORT_KEY}=${sortValue}`)
        .then(setDepartments)
        .catch(err => console.log(err.message));
    };
    fetchDepartments();
  }, []);

  // TODO: больше не храним это в квери, лучше в локал-сторидже
  // useEffect(() => {
  //   if (location.search) return;

  //   history.push({
  //     ...location,
  //     search: `${SORT_KEY}=${sortOptions[0].value}`,
  //   });
  // }, [history, location]);

  // const handleSortDepartments = sortValue => {
  //   history.push({ ...location, search: `${SORT_KEY}=${sortValue}` });
  // };

  // const createSlug = ({ id, name }) =>
  //   slugify(`${name} ${id}`, { replacement: '_', lower: true });

  return (
    <>
      <Header title="Факультеты" />

      {/* <Selector
        title="Сортировать"
        options={sortOptions}
        onSelect={handleSortDepartments}
        value={sortValue}
      /> */}

      {!!departments.length && (
        <ul>
          {departments.map(({ id, name }) => (
            <li key={id} className={s.listElem}>
              <Link
                to={`${match.url}/${id}`}
                // to={{
                //   pathname: `/faculties/${department.id}`,
                //   // pathname: `${url}/${createSlug(department)}`,
                //   state: {
                //     from: { location, label: 'Назад ко всем факультетам' },
                //   },
                // }}
              >
                <Paper>
                  <p className={s.text}>{name}</p>
                </Paper>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DepartmentsListPage;
