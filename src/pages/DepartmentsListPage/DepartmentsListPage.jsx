import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
// import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import Paper from 'components/common/Paper/Paper';
import Header from 'components/common/Header/Header';
import AbsenceMsg from 'components/common/AbsenceMsg/AbsenceMsg';
import { departmentsOperations, departmentsSelectors } from 'redux/departments';
import s from './DepartmentsListPage.module.css';

const DepartmentsListPage = () => {
  const departments = useSelector(departmentsSelectors.getDepartments);
  const loading = useSelector(departmentsSelectors.getLoading);

  const dispatch = useDispatch();

  // const match = useRouteMatch();
  const location = useLocation();

  useEffect(() => dispatch(departmentsOperations.getDepartments()), [dispatch]);

  const noDepartments = !loading && !departments.length;

  return (
    <>
      <Header title="Факультеты" />

      {noDepartments && <AbsenceMsg absentEntity="departments" />}

      {!!departments.length && (
        <ul>
          {departments.map(({ id, name }) => (
            <li key={id} className={s.listElem}>
              {/* <Link to={`/departments/${id}`}> */}
              <Link
                // to={{
                //   pathname: id,
                //   state: {
                //     from: location,
                //     label: 'Назад ко всем факультетам',
                //   },
                // }}
                to={id}
                state={{ from: location, label: 'Назад ко всем факультетам' }}
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
