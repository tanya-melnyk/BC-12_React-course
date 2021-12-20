/** @jsxImportSource @emotion/react */

import { useState, useEffect, useCallback } from 'react';
import BigButton from '../common/BigButton/BigButton';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Paper from '../common/Paper/Paper';
import Skeleton from '../common/Skeleton/Skeleton';
import Tutor from './Tutor/Tutor';
import TutorForm from './TutorFormTest';
import * as api from 'services/api';
import plusImg from '../../images/add.svg';

import { connect } from 'react-redux';
import { setTutors } from '../../redux/tutors/tutorsActions';

const API_ENDPOINT = 'tutors';

const TutorsBlock = ({ tutors, onSetTutors }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // api request status
  const [firstLoading, setFirstLoading] = useState(false);
  const [error, setError] = useState(null);

  // FETCH TUTORS

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchTutors = async () => {
      setFirstLoading(true);
      try {
        const tutors = await api.getData(API_ENDPOINT, { signal });
        onSetTutors(tutors);
      } catch (error) {
        if (!signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setFirstLoading(false);
        }
      }
    };
    fetchTutors();

    return () => {
      controller.abort();
    };
  }, [onSetTutors]);

  const toggleForm = useCallback(
    () => setIsFormOpen(prevIsFormOpen => !prevIsFormOpen),
    [],
  );

  const noTutors = !firstLoading && !tutors.length;

  return (
    <>
      {firstLoading && <Skeleton />}

      {firstLoading && <Loader />}

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

      {isFormOpen && <TutorForm closeForm={toggleForm} />}

      {error && <ErrorMsg message={error} />}

      <BigButton
        onClick={toggleForm}
        icon={!isFormOpen && plusImg}
        text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
        disabled={firstLoading}
      />
    </>
  );
};

const mapStateToProps = state => ({
  tutors: state.tutors,
});

const mapDispatchToProps = dispatch => ({
  onSetTutors: tutors => dispatch(setTutors(tutors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorsBlock);
