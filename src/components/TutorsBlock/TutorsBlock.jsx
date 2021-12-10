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
