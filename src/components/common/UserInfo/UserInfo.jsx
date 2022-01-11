import { IoPersonCircle } from 'react-icons/io5';
import PropTypes from 'prop-types';
import s from './UserInfo.module.css';

const UserInfo = ({ username }) => {
  return (
    <div className={s.container}>
      <span>
        <IoPersonCircle color="#ff6b0a" size="24" />
      </span>
      <b className={s.name}>{username}</b>
    </div>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
};

export default UserInfo;

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
//
//
//
//
//

/////////////////////////////////////////////////////

///   LESSON 15 final

// import { IoPersonCircle } from 'react-icons/io5';
// import { useSelector } from 'react-redux';
// import { authSelectors } from 'redux/auth';
// import s from './UserInfo.module.css';

// const UserInfo = () => {
//   const userName = useSelector(authSelectors.getUserName);

//   return (
//     <div className={s.container}>
//       <span>
//         <IoPersonCircle color="#ff6b0a" size="24" />
//       </span>
//       <b className={s.name}>{userName}</b>
//     </div>
//   );
// };

// export default UserInfo;
