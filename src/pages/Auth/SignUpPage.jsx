import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
import BigButton from 'components/common/BigButton/BigButton';
import Paper from 'components/common/Paper/Paper';
import Header from 'components/common/Header/Header';

export const SignUpPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };

  const isBtnDisabled = !displayName || !email || !password;

  return (
    <div>
      <Header />

      <Paper>
        <div style={{ padding: 20 }}>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                value={displayName}
                type="text"
                placeholder="John Doe"
                required
                onChange={e => setDisplayName(e.target.value)}
              />
            </label>

            <label>
              Email
              <input
                value={email}
                type="text"
                placeholder="email@mail.com"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                value={password}
                type="text"
                placeholder="qwerty1234"
                required
                onChange={e => setPassword(e.target.value)}
              />
            </label>

            <BigButton type="submit" text="Sign Up" disabled={isBtnDisabled} />
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default SignUpPage;

////////////////////////////////////////////////////////////////

///   LESSON 15 final

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import BigButton from 'components/common/BigButton/BigButton';
// import Paper from 'components/common/Paper/Paper';
// import Header from 'components/common/Header/Header';
// import { authOperations, authSelectors } from 'redux/auth';

// export const SignUpPage = () => {
//   const [displayName, setDisplayName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loading = useSelector(authSelectors.getLoading);
//   const error = useSelector(authSelectors.getError);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!error) return;
//     toast.error(error, { theme: 'colored' });
//   }, [error]);

//   const handleSubmit = e => {
//     e.preventDefault();
//     const credentials = { email, password, displayName };
//     dispatch(authOperations.signUp(credentials));
//   };

//   const isBtnDisabled = !displayName || !email || !password || loading;

//   return (
//     <div>
//       <Header />

//       <Paper>
//         <div style={{ padding: 20 }}>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Name
//               <input
//                 value={displayName}
//                 type="text"
//                 placeholder="John Doe"
//                 required
//                 onChange={e => setDisplayName(e.target.value)}
//               />
//             </label>

//             <label>
//               Email
//               <input
//                 value={email}
//                 type="text"
//                 placeholder="email@mail.com"
//                 required
//                 onChange={e => setEmail(e.target.value)}
//               />
//             </label>

//             <label>
//               Password
//               <input
//                 value={password}
//                 type="text"
//                 placeholder="qwerty1234"
//                 required
//                 onChange={e => setPassword(e.target.value)}
//               />
//             </label>

//             <BigButton type="submit" text="Sign Up" disabled={isBtnDisabled} />
//           </form>
//         </div>
//       </Paper>
//     </div>
//   );
// };

// export default SignUpPage;

////////////////////////////////////////////////////////////

///   LESSON 16 final

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import BigButton from 'components/common/BigButton/BigButton';
// import Paper from 'components/common/Paper/Paper';
// import Header from 'components/common/Header/Header';
// import { authOperations, authSelectors } from 'redux/auth';

// export const SignUpPage = () => {
//   const [displayName, setDisplayName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loading = useSelector(authSelectors.getLoading);
//   const error = useSelector(authSelectors.getError);
//   const dispatch = useDispatch();

//   const history = useHistory();
//   const location = useLocation();

//   useEffect(() => {
//     if (!error) return;
//     toast.error(error, { theme: 'colored' });
//   }, [error]);

//   const handleSubmit = e => {
//     e.preventDefault();
//     const credentials = { email, password, displayName };
//     dispatch(authOperations.signUp(credentials)).then(() =>
//       history.push(location.state?.from ?? '/university'),
//     );
//   };

//   const isBtnDisabled = !displayName || !email || !password || loading;

//   return (
//     <div>
//       <Header />

//       <Paper>
//         <div style={{ padding: 20 }}>
//           <form onSubmit={handleSubmit}>
//             <label>
//               Name
//               <input
//                 value={displayName}
//                 type="text"
//                 placeholder="John Doe"
//                 required
//                 onChange={e => setDisplayName(e.target.value)}
//               />
//             </label>

//             <label>
//               Email
//               <input
//                 value={email}
//                 type="text"
//                 placeholder="email@mail.com"
//                 required
//                 onChange={e => setEmail(e.target.value)}
//               />
//             </label>

//             <label>
//               Password
//               <input
//                 value={password}
//                 type="text"
//                 placeholder="qwerty1234"
//                 required
//                 onChange={e => setPassword(e.target.value)}
//               />
//             </label>

//             <BigButton type="submit" text="Sign Up" disabled={isBtnDisabled} />
//           </form>
//         </div>
//       </Paper>
//     </div>
//   );
// };

// export default SignUpPage;
