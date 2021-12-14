/** @jsxImportSource @emotion/react */

import { useState, useEffect } from 'react';
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

const TutorsBlock = () => {
  const [tutors, setTutors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newTutor, setNewTutor] = useState(null);
  // api request status
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // FETCH TUTORS

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchTutors = async () => {
      setFirstLoading(true);
      setLoading(true);
      try {
        const tutors = await api.getData(API_ENDPOINT, { signal });
        setTutors(tutors);
      } catch (error) {
        if (!signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setFirstLoading(false);
          setLoading(false);
        }
      }
    };
    fetchTutors();

    return () => {
      controller.abort();
    };
  }, []);

  // ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    let isTutorsMounted = true;
    const addTutor = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
        if (isTutorsMounted) {
          setTutors(prevTutors => [...prevTutors, savedTutor]);
        }
      } catch (error) {
        if (isTutorsMounted) {
          setError(error.message);
        }
      } finally {
        if (isTutorsMounted) {
          setLoading(false);
          setNewTutor(null);
          setIsFormOpen(false);
        }
      }
    };
    addTutor();

    return () => {
      isTutorsMounted = false;
    };
  }, [newTutor]);

  const toggleForm = () => setIsFormOpen(prevIsFormOpen => !prevIsFormOpen);

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

      {isFormOpen && <TutorForm onSubmit={setNewTutor} />}

      {error && <ErrorMsg message={error} />}

      <BigButton
        onClick={toggleForm}
        icon={!isFormOpen && plusImg}
        text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
        disabled={loading}
      />
    </>
  );
};

export default TutorsBlock;
