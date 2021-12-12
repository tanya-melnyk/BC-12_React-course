/** @jsxImportSource @emotion/react */

import { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import Paper from '../common/Paper/Paper';
import Tutor from './Tutor/Tutor';
import TutorForm from './TutorForm/TutorForm';
import * as storage from '../../services/localStorage';
import plusImg from '../../images/add.svg';

const STORAGE_KEY = 'tutors';

class TutorsBlock extends Component {
  state = {
    tutors: this.props.tutors,
    isFormOpen: false,
  };

  componentDidMount() {
    const savedTutors = storage.get(STORAGE_KEY);
    if (savedTutors) {
      this.setState({ tutors: savedTutors });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { tutors } = this.state;
    if (prevState.tutors !== tutors) {
      storage.save(STORAGE_KEY, tutors);
    }
  }

  toggleForm = () =>
    this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));

  addTutor = newTutor =>
    this.setState(prevState => ({
      tutors: [...prevState.tutors, newTutor],
      isFormOpen: false,
    }));

  render() {
    const { tutors, isFormOpen } = this.state;

    return (
      <div css={{ position: 'relative', marginBottom: 32 }}>
        {!!tutors.length && (
          <ul>
            {tutors.map(tutor => (
              <li key={tutor.email} css={{ marginBottom: 24 }}>
                <Paper>
                  <Tutor {...tutor} />
                </Paper>
              </li>
            ))}
          </ul>
        )}

        {!tutors.length && <h4 className="absence-msg">No tutors yet</h4>}

        {isFormOpen && <TutorForm onSubmit={this.addTutor} />}

        <BigButton
          onClick={this.toggleForm}
          icon={!isFormOpen && plusImg}
          text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
        />
      </div>
    );
  }
}

TutorsBlock.propTypes = {
  tutors: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default TutorsBlock;

/////////////////////////////////////////////////////////////////////

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

// FETCH REQUESTS WITH PREVENTING MEMORY LEAK

// /** @jsxImportSource @emotion/react */

// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
// import BigButton from '../common/BigButton/BigButton';
// import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
// import Loader from '../common/Loader/Loader';
// import Paper from '../common/Paper/Paper';
// import Skeleton from '../common/Skeleton/Skeleton';
// import Tutor from './Tutor/Tutor';
// import TutorForm from './TutorForm/TutorForm';
// import * as api from 'services/api';
// import plusImg from '../../images/add.svg';

// class TutorsBlock extends Component {
//   API_ENDPOINT = 'tutors';

//   state = {
//     tutors: [],
//     isFormOpen: false,
//     newTutor: null,
//     loading: false,
//     error: null,
//     firstLoading: true,
//   };

//   isTutorsMounted = false;
//   controller = new AbortController();
//   signal = this.controller.signal;

//   async componentDidMount() {
//     this.isTutorsMounted = true;
//     await this.fetchTutors();
//     this.setState({ firstLoading: false });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { newTutor } = this.state;
//     if (newTutor && prevState.newTutor !== newTutor) {
//       this.addTutor();
//     }
//   }

//   componentWillUnmount() {
//     this.isTutorsMounted = false;
//     if (this.controller) {
//       this.controller.abort();
//     }
//   }

//   // GET TUTORS

//   fetchTutors = async () => {
//     this.createSignalAndController();
//     const signal = { signal: this.signal };

//     this.setState({ loading: true, error: null });
//     try {
//       const tutors = await api.getData(this.API_ENDPOINT, signal);
//       this.setState({ tutors });
//     } catch (error) {
//       if (!this.signal.aborted) {
//         this.setState({ error: error.message });
//       }
//     } finally {
//       if (!this.signal.aborted) {
//         this.setState({ loading: false });
//       }
//     }
//   };

//   // ADD TUTOR

//   toggleForm = () =>
//     this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));

//   confirmAdd = newTutor => this.setState({ newTutor });

//   addTutor = async () => {
//     this.setState({ loading: true, error: null });
//     const { newTutor } = this.state;
//     try {
//       const savedTutor = await api.saveItem(this.API_ENDPOINT, newTutor);
//       if (this.isTutorsMounted) {
//         this.setState(prevState => ({
//           tutors: [...prevState.tutors, savedTutor],
//         }));
//         toast.success(`Tutor ${savedTutor.lastName} successfully added!`);
//       }
//     } catch (error) {
//       if (this.isTutorsMounted) {
//         this.setState({ error: error.message });
//         toast.error('Something went wrong. Please try again');
//       }
//     } finally {
//       if (this.isTutorsMounted) {
//         this.toggleForm();
//         this.setState({ newTutor: null, loading: false });
//       }
//     }
//   };

//   createSignalAndController = () => {
//     if (this.controller) {
//       this.controller.abort();
//     }
//     this.controller = new AbortController();
//     this.signal = this.controller.signal;
//   };

//   render() {
//     const { tutors, isFormOpen, loading, firstLoading, error } = this.state;
//     const noTutors = !firstLoading && !tutors.length;
//     return (
//       <>
//         {loading && <Loader />}

//         {firstLoading && <Skeleton />}

//         {!!tutors.length && (
//           <ul>
//             {tutors.map(tutor => (
//               <li key={tutor.id} css={{ marginBottom: 24 }}>
//                 <Paper>
//                   <Tutor {...tutor} />
//                 </Paper>
//               </li>
//             ))}
//           </ul>
//         )}

//         {noTutors && <h4 className="absence-msg">No tutors yet</h4>}

//         {isFormOpen && <TutorForm onSubmit={this.confirmAdd} />}

//         {error && <ErrorMsg message={error} />}

//         <BigButton
//           onClick={this.toggleForm}
//           icon={!isFormOpen && plusImg}
//           text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
//           disabled={loading || firstLoading}
//         />
//       </>
//     );
//   }
// }

// TutorsBlock.propTypes = {
//   tutors: PropTypes.arrayOf(
//     PropTypes.shape({
//       email: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
// };

// export default TutorsBlock;

//////////////////////////////////////////////////////////////////
