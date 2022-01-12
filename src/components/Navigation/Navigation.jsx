import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  HiBookOpen,
  HiAcademicCap,
  HiOutlineUserAdd,
  HiOutlineLogin,
  HiOutlineLogout,
} from 'react-icons/hi';
import NavItem from './NavItem/NavItem';
import { authSelectors, signOut } from 'redux/auth';
import s from './Navigation.module.scss';

const Navigation = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(signOut());

  return (
    <nav style={{ paddingTop: 12 }}>
      <NavItem
        name={t('sidebar.departments')}
        icon={<HiAcademicCap color="#ff6b0a" size="24" />}
        path="/departments"
      />

      {isLoggedIn && (
        <NavItem
          name={t('sidebar.university')}
          icon={<HiBookOpen color="#ff6b0a" size="24" />}
          path="/university"
        />
      )}

      <hr />

      {!isLoggedIn && (
        <>
          <NavItem
            name="Sign Up"
            path={{
              pathname: '/sign-up',
              state: { from: location },
            }}
            // path="/sign-up"
            icon={<HiOutlineUserAdd color="#ff6b0a" size="24px" />}
          />
          <NavItem
            name="Sign In"
            path={{
              pathname: '/sign-in',
              state: { from: location },
            }}
            // path="/sign-in"
            icon={<HiOutlineLogin color="#ff6b0a" size="24px" />}
          />
        </>
      )}

      {isLoggedIn && (
        <p className={s.logOutBtn} onClick={handleSignOut}>
          <span className={s.iconWrapper}>
            <HiOutlineLogout color="#ff6b0a" size="24px" />
          </span>
          <span className={s.itemName}>Sign Out</span>
        </p>
      )}
    </nav>
  );
};

export default Navigation;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//////////////////////////////////////////////////////////

/////   LESSON 15 final

// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   HiBookOpen,
//   HiAcademicCap,
//   HiOutlineUserAdd,
//   HiOutlineLogin,
//   HiOutlineLogout,
// } from 'react-icons/hi';
// import NavItem from './NavItem/NavItem';
// import { authSelectors, signOut } from 'redux/auth';
// import s from './Navigation.module.scss';

// const Navigation = () => {
//   const { t } = useTranslation();

//   const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
//   const dispatch = useDispatch();

//   const handleSignOut = () => dispatch(signOut());

//   return (
//     <nav style={{ paddingTop: 12 }}>
//       <NavItem
//         name={t('sidebar.departments')}
//         icon={<HiAcademicCap color="#ff6b0a" size="24" />}
//         path="/departments"
//       />

//       <NavItem
//         name={t('sidebar.university')}
//         icon={<HiBookOpen color="#ff6b0a" size="24" />}
//         path="/university"
//       />

//       <hr />

//       {!isLoggedIn && (
//         <>
//           <NavItem
//             name="Sign Up"
//             path="/sign-up"
//             icon={<HiOutlineUserAdd color="#ff6b0a" size="24px" />}
//           />
//           <NavItem
//             name="Sign In"
//             path="/sign-in"
//             icon={<HiOutlineLogin color="#ff6b0a" size="24px" />}
//           />
//         </>
//       )}

//       {isLoggedIn && (
//         <p className={s.logOutBtn} onClick={handleSignOut}>
//           <span className={s.iconWrapper}>
//             <HiOutlineLogout color="#ff6b0a" size="24px" />
//           </span>
//           <span className={s.itemName}>Sign Out</span>
//         </p>
//       )}
//     </nav>
//   );
// };

// export default Navigation;

//////////////////////////////////////////////////////////

///   LESSON 16 final

// import { useTranslation } from 'react-i18next';
// import { useSelector, useDispatch } from 'react-redux';
// import { useLocation } from 'react-router-dom';
// import {
//   HiBookOpen,
//   HiAcademicCap,
//   HiOutlineUserAdd,
//   HiOutlineLogin,
//   HiOutlineLogout,
// } from 'react-icons/hi';
// import NavItem from './NavItem/NavItem';
// import { authSelectors, signOut } from 'redux/auth';
// import s from './Navigation.module.scss';

// const Navigation = () => {
//   const { t } = useTranslation();

//   const location = useLocation();
//   const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
//   const dispatch = useDispatch();

//   const handleSignOut = () => dispatch(signOut());

//   return (
//     <nav style={{ paddingTop: 12 }}>
//       <NavItem
//         name={t('sidebar.departments')}
//         icon={<HiAcademicCap color="#ff6b0a" size="24" />}
//         path="/departments"
//       />

//       {isLoggedIn && (
//         <NavItem
//           name={t('sidebar.university')}
//           icon={<HiBookOpen color="#ff6b0a" size="24" />}
//           path="/university"
//         />
//       )}

//       <hr />

//       {!isLoggedIn && (
//         <>
//           <NavItem
//             name="Sign Up"
//             // path="/sign-up"
//             path={{
//               pathname: '/sign-up',
//               state: { from: location },
//             }}
//             icon={<HiOutlineUserAdd color="#ff6b0a" size="24px" />}
//           />
//           <NavItem
//             name="Sign In"
//             // path="/sign-in"
//             path={{
//               pathname: '/sign-in',
//               state: { from: location },
//             }}
//             icon={<HiOutlineLogin color="#ff6b0a" size="24px" />}
//           />
//         </>
//       )}

//       {isLoggedIn && (
//         <p className={s.logOutBtn} onClick={handleSignOut}>
//           <span className={s.iconWrapper}>
//             <HiOutlineLogout color="#ff6b0a" size="24px" />
//           </span>
//           <span className={s.itemName}>Sign Out</span>
//         </p>
//       )}
//     </nav>
//   );
// };

// export default Navigation;
