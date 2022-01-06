// import { IoPersonCircle } from 'react-icons/io5';
// import s from './UserInfo.module.css';

// const UserInfo = () => {
//   return (
//     <div className={s.container}>
//       <span>
//         <IoPersonCircle color="#ff6b0a" size="24" />
//       </span>
//       <b className={s.name}>User name</b>
//     </div>
//   );
// };

// export default UserInfo;

/////////////////////////////////////////////////////

///   LESSON 15 final

import { IoPersonCircle } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import s from './UserInfo.module.css';

const UserInfo = () => {
  const userName = useSelector(authSelectors.getUserName);

  return (
    <div className={s.container}>
      <span>
        <IoPersonCircle color="#ff6b0a" size="24" />
      </span>
      <b className={s.name}>{userName}</b>
    </div>
  );
};

export default UserInfo;
