/** @jsxImportSource @emotion/react */

import { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import Paper from '../common/Paper/Paper';
import Tutor from './Tutor/Tutor';
import TutorForm from './TutorForm/TutorForm';
import plusImg from '../../images/add.svg';

/**
  Использовать форму добавления преподавателя и при клике на "Пригласить" прятать форму и добавлять преподавателя в колекцию:
  - в состояние `TutorsBlock` добавляем поле `tutors`, которое инициализируется из пропа `tutors`
  - пишем метод `addTutor(newTutor)`, который получает объект с новым преподавателем, добавляет его в массив `tutors` и прячет форму
  - передаем этот метод пропсом `onSubmit` в `TutorForm`
 */

class TutorsBlock extends Component {
  state = {
    tutors: this.props.tutors,
    isFormOpen: false,
  };

  toggleForm = () =>
    this.setState(prevState => ({
      isFormOpen: !prevState.isFormOpen,
    }));

  addTutor = newTutor =>
    this.setState(prevState => ({
      tutors: [...prevState.tutors, newTutor],
      isFormOpen: false,
    }));

  render() {
    const { tutors, isFormOpen } = this.state;
    // const tutorsCount = tutors.length;

    return (
      <div css={{ position: 'relative', marginBottom: 32 }}>
        <ul>
          {tutors.map(tutor => (
            <li key={tutor.email} css={{ marginBottom: 24 }}>
              <Paper>
                <Tutor {...tutor} />
              </Paper>
            </li>
          ))}
        </ul>

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
