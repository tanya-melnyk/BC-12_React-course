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
import { tutorsSelectors, tutorsOperations } from 'redux/tutors';
import plusImg from '../../images/add.svg';

const TutorsBlock = ({ tutors, onGetTutors, error, loading }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // FETCH TUTORS

  useEffect(() => onGetTutors(), [onGetTutors]);

  const toggleForm = useCallback(
    () => setIsFormOpen(prevIsFormOpen => !prevIsFormOpen),
    [],
  );

  // const noTutors = !loading && !tutors.length;
  const noTutors = !loading && tutors.length === 0;

  // const showTutors = !loading && !!tutors.length;
  const showTutors = !loading && tutors.length > 0;

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

      {noTutors && <h4 className="absence-msg">No tutors yet</h4>}

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

// УНИВЕРСАЛЬНЫЙ СПОСОБ СВЯЗАТЬ РЕДАКС С КОМПОНЕНТОМ (РАБОТАЕТ И ДЛЯ КЛАССОВ, И ДЛЯ ФУНКЦИЙ)

// ПОЛУЧАЕМ СОСТОЯНИЕ
const mapStateToProps = state => ({
  tutors: tutorsSelectors.getTutors(state),
  loading: tutorsSelectors.getFirstLoading(state),
  error: tutorsSelectors.getError(state),
});

// ПОЛУЧАЕМ МЕТОДЫ ДЛЯ ИЗМЕНЕНИЯ СОСТОЯНИЯ
const mapDispatchToProps = dispatch => ({
  onGetTutors: () => dispatch(tutorsOperations.getTutors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorsBlock);
