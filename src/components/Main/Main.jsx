import { useContext, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
import Loader from 'components/common/Loader/Loader';
import AllRoutes from 'routes/AllRoutes';
import { authOperations, authSelectors } from 'redux/auth';
import { ThemeContext, themes } from 'context/themeContext';
import styles from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);

  // const location = useLocation();
  // const token = new URLSearchParams(location.search).get('accessToken');
  // useEffect(() => {
  //   if (!token) return;
  //   dispatch(authOperations.getUser(token));
  // }, [dispatch, token]);

  const isLoadingUser = useSelector(authSelectors.getLoadingUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getUser());
  }, [dispatch]);

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <main
      className={theme === themes.light ? styles.lightTheme : styles.darkTheme}
    >
      <div className={styles.lanquagesWrapper}>
        <Suspense fallback={<Loader />}>
          <LanguageSwitcher />
        </Suspense>
      </div>

      <AllRoutes />
    </main>
  );
};

export default Main;
