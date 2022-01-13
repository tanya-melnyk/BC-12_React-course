import { useContext, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LanguageSwitcher from 'components/common/LanguageSwitcher/LanguageSwitcher';
import Loader from 'components/common/Loader/Loader';
import AllRoutes from 'routes/AllRoutes';
import { authOperations, authSelectors } from 'redux/auth';
import { ThemeContext, themes } from 'context/themeContext';
import styles from './Main.module.css';

const Main = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const isLoadingUser = useSelector(authSelectors.getLoadingUser);

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
