/** @jsxImportSource @emotion/react */

import { Component } from 'react';
import BigButton from '../common/BigButton/BigButton';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Paper from '../common/Paper/Paper';
import Skeleton from '../common/Skeleton/Skeleton';
import Tutor from './Tutor/Tutor';
import TutorForm from './TutorForm/TutorForm';
import * as api from 'services/api';
import plusImg from '../../images/add.svg';

const API_ENDPOINT = 'tutors';

class TutorsBlock extends Component {
  state = {
    tutors: [],
    isFormOpen: false,
    newTutor: null,
    // api request statuses
    firstLoading: false,
    loading: false,
    error: null,
  };

  isTutorsMounted = false;
  controller = new AbortController();
  signal = this.controller.signal;

  componentDidMount() {
    this.isTutorsMounted = true;

    this.setState({ firstLoading: true });
    this.fetchTutors().finally(() => this.setState({ firstLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { newTutor } = this.state;
    if (newTutor && prevState.newTutor !== newTutor) {
      this.addTutor();
    }
  }

  componentWillUnmount() {
    this.isTutorsMounted = false;

    if (this.controller) {
      this.controller.abort();
    }
  }

  // FETCH TUTORS

  fetchTutors = async () => {
    this.createSignalAndController();
    const signal = { signal: this.signal };
    this.setState({ loading: true, error: null });
    try {
      const tutors = await api.getData(API_ENDPOINT, signal);
      this.setState({ tutors });
    } catch (error) {
      if (!this.signal.aborted) {
        this.setState({ error: error.message });
      }
    } finally {
      if (!this.signal.aborted) {
        this.setState({ loading: false });
      }
    }
  };

  // ADD TUTOR

  toggleForm = () =>
    this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));

  confirmAdd = newTutor => this.setState({ newTutor });

  addTutor = async () => {
    this.setState({ loading: true, error: null });
    const { newTutor } = this.state;
    try {
      const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
      if (this.isTutorsMounted) {
        this.setState(prevState => ({
          tutors: [...prevState.tutors, savedTutor],
        }));
      }
    } catch (error) {
      if (this.isTutorsMounted) {
        this.setState({ error: error.message });
      }
    } finally {
      if (this.isTutorsMounted) {
        this.setState({
          newTutor: null,
          loading: false,
          isFormOpen: false,
        });
      }
    }
  };

  // CREATE ABORT CONTROLLER

  createSignalAndController = () => {
    if (this.controller) {
      this.controller.abort();
    }
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  };

  render() {
    const { tutors, isFormOpen, loading, error, firstLoading } = this.state;

    const noTutors = !firstLoading && !tutors.length;

    return (
      <>
        {firstLoading && <Skeleton />}

        {loading && <Loader />}

        {!!tutors.length && (
          <ul>
            {tutors.map(tutor => (
              <li key={tutor.id} css={{ marginBottom: 24 }}>
                <Paper>
                  <Tutor {...tutor} />
                </Paper>
              </li>
            ))}
          </ul>
        )}

        {noTutors && <h4 className="absence-msg">No tutors yet</h4>}

        {isFormOpen && <TutorForm onSubmit={this.confirmAdd} />}

        {error && <ErrorMsg message={error} />}

        <BigButton
          onClick={this.toggleForm}
          icon={!isFormOpen && plusImg}
          text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
          disabled={loading}
        />
      </>
    );
  }
}

export default TutorsBlock;

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

// const TutorsBlock = () => {
//   const [tutors, setTutors] = useState([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [newTutor, setNewTutor] = useState(null);
//   // api request status
//   const [firstLoading, setFirstLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // FETCH TUTORS

//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchTutors = async () => {
//       setFirstLoading(true);
//       setError(null);
//       try {
//         const tutors = await api.getData(API_ENDPOINT, { signal });
//         setTutors(tutors);
//       } catch (error) {
//         if (!signal.aborted) {
//           setError(error.message);
//         }
//       } finally {
//         if (!signal.aborted) {
//           setFirstLoading(false);
//         }
//       }
//     };
//     fetchTutors();

//     return () => {
//       controller.abort();
//     };
//   }, []);

//   // ADD TUTOR

//   const toggleForm = () => setIsFormOpen(prevState => !prevState);

//   const confirmAdd = newTutor => setNewTutor(newTutor);

//   useEffect(() => {
//     if (!newTutor) return;

//     let isTutorsMounted = true;
//     const addTutor = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
//         if (isTutorsMounted) {
//           setTutors(prevTutors => [...prevTutors, savedTutor]);
//         }
//       } catch (error) {
//         if (isTutorsMounted) {
//           setError(error.message);
//         }
//       } finally {
//         if (isTutorsMounted) {
//           setLoading(false);
//           toggleForm();
//           setNewTutor(null);
//         }
//       }
//     };
//     addTutor();

//     return () => {
//       isTutorsMounted = false;
//     };
//   }, [newTutor]);

//   // RENDER

//   const noTutors = !firstLoading && !tutors.length;

//   return (
//     <>
//       {firstLoading && <Skeleton />}

//       {loading && <Loader />}

//       {!!tutors.length && (
//         <ul>
//           {tutors.map(tutor => (
//             <li key={tutor.id} css={{ marginBottom: 24 }}>
//               <Paper>
//                 <Tutor {...tutor} />
//               </Paper>
//             </li>
//           ))}
//         </ul>
//       )}

//       {noTutors && <h4 className="absence-msg">No tutors yet</h4>}

//       {isFormOpen && <TutorForm onSubmit={confirmAdd} />}

//       {error && <ErrorMsg message={error} />}

//       <BigButton
//         onClick={toggleForm}
//         icon={!isFormOpen && plusImg}
//         text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
//         disabled={loading}
//       />
//     </>
//   );
// };
