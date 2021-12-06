import React from 'react';
import PropTypes from 'prop-types';
import BigButton from '../common/BigButton';
import Paper from '../common/Paper';
import Tutor from './Tutor';
import plusImg from '../../images/add.svg';

const TutorsBlock = ({ tutors = [] }) => {
  return (
    <div>
      <ul onClick={e => console.log()}>
        {tutors.map(tutor => (
          <li key={tutor.email}>
            <Paper>
              <Tutor firstName={tutor.firstName} {...tutor} />
            </Paper>
          </li>
        ))}
      </ul>
      <BigButton icon={plusImg} text="Добавить преподавателя" />
    </div>
  );
};

TutorsBlock.propTypes = {
  tutors: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
    }),
  ).isRequired,
};

export default TutorsBlock;
