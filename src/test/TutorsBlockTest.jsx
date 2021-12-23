/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import BigButton from '../common/BigButton/BigButton';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Paper from '../common/Paper/Paper';
import Skeleton from '../common/Skeleton/Skeleton';
import Tutor from './Tutor/Tutor';
import TutorForm from './TutorForm/TutorForm';
import * as api from 'services/api';
import { setTutors } from 'redux/tutors/tutorsActions';
import plusImg from '../../images/add.svg';

import { getTutors } from 'redux/tutors/tutorsOperations';

const API_ENDPOINT = 'tutors';

const TutorsBlock = ({ tutors, onSetTutors, onGetTutors, loading, error }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // api request status
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // FETCH TUTORS

  useEffect(() => {
    onGetTutors();
    // const controller = new AbortController();
    // const signal = controller.signal;
    // const fetchTutors = async () => {
    //   setLoading(true);
    //   try {
    //     const tutors = await api.getData(API_ENDPOINT, { signal });
    //     onSetTutors(tutors);
    //   } catch (error) {
    //     if (!signal.aborted) {
    //       setError(error.message);
    //     }
    //   } finally {
    //     if (!signal.aborted) {
    //       setLoading(false);
    //     }
    //   }
    // };
    // fetchTutors();
    // return () => {
    //   controller.abort();
    // };
  }, [onGetTutors]);

  const toggleForm = useCallback(
    () => setIsFormOpen(prevIsFormOpen => !prevIsFormOpen),
    [],
  );

  const showTutors = !loading && !!tutors.length;
  const showNoTutors = !loading && !tutors.length;

  return (
    <>
      {loading && <Skeleton />}

      {loading && <Loader />}

      {showTutors && (
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

      {showNoTutors && <h4 className="absence-msg">No tutors yet</h4>}

      {error && <ErrorMsg message={error} />}

      {isFormOpen && <TutorForm closeForm={toggleForm} />}

      <BigButton
        onClick={toggleForm}
        icon={!isFormOpen && plusImg}
        text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
        disabled={loading}
      />
    </>
  );
};

// УНИВЕРСАЛЬНЫЙ СПОСОБ СВЯЗАТЬ РЕДАКС С КОМПОНЕНЬЛМ (РАБОТАЕТ И ДЛЯ КЛАССОВ, И ДЛЯ ФУНКЦИЙ)

// ПОЛУЧАЕМ СОСТОЯНИЕ
const mapStateToProps = state => ({
  tutors: state.tutors.items,
  loading: state.tutors.loading,
  error: state.tutors.error,
});

// ПОЛУЧАЕМ МЕТОДЫ ДЛЯ ИЗМЕНЕНИЯ СОСТОЯНИЯ
const mapDispatchToProps = dispatch => ({
  onSetTutors: tutors => dispatch(setTutors(tutors)),
  onGetTutors: () => dispatch(getTutors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorsBlock);

// const connectTutors = connect(mapStateToProps, mapDispatchToProps);
// export default connectTutors(TutorsBlock);
