import { useState, useEffect } from 'react';
import Paper from 'components/common/Paper/Paper';
import Header from 'components/common/Header/Header';
import * as api from 'services/api';
import s from './DepartmentsListPage.module.css';

const API_ENDPOINT = 'departments';

const DepartmentsListPage = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = () => {
      api
        .getData(API_ENDPOINT)
        .then(setDepartments)
        .catch(err => console.log(err.message));
    };
    fetchDepartments();
  }, []);

  return (
    <>
      <Header title="Факультеты" />

      {!!departments.length && (
        <ul>
          {departments.map(({ id, name }) => (
            <li key={id} className={s.listElem}>
              <a href="/">
                <Paper>
                  <p className={s.text}>{name}</p>
                </Paper>
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DepartmentsListPage;
