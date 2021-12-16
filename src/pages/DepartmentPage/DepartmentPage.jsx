import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// import BigButton from 'components/common/BigButton/BigButton';
// import Paper from 'components/common/Paper/Paper';
import Header from 'components/common/Header/Header';
import * as api from 'services/api';
import s from './DepartmentPage.module.scss';

const API_ENDPOINT = 'departments';

const DepartmentPage = () => {
  const [department, setDepartment] = useState({});

  useEffect(() => {
    const fetchDepartment = () => {
      api
        .getData(API_ENDPOINT) // добавить id
        .then(setDepartment)
        .catch(err => {
          toast.error('Факультет не найден');
        });
    };
    fetchDepartment();
  }, []);

  // const handleGoBack = () => {};

  return (
    <>
      <Header title={department.name ?? 'Факультет'} />

      {/* <div className={s.wrapper}>
        <BigButton
          text="Назад"
          onClick={handleGoBack}
          isGray
        />
      </div> */}

      <nav className={s.nav}>
        <div className={s.linkWrapper}>
          <a href="/" className={s.link} activeClassName={s.activeLink}>
            Описание
          </a>
        </div>
        <div>
          <a href="/" className={s.link} activeClassName={s.activeLink}>
            История
          </a>
        </div>
      </nav>
    </>
  );
};

export default DepartmentPage;
