/** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import Paper from '../common/Paper/Paper';
import Tutor from './Tutor/Tutor';
import plusImg from '../../images/add.svg';

/**
 * Добавим коммент из документации
 * В пропе css у верхнего дива пропишем два css правила:
 * { position: relative; margin-bottom: 32px }
 * в стиле объекта
 * Также на каждую лишку { margin-bottom: 24px }
 */

const TutorsBlock = ({ tutors = [] }) => {
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
