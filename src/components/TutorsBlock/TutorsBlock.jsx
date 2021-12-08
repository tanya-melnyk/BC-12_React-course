/** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';
import BigButton from '../common/BigButton/BigButton';
import Paper from '../common/Paper/Paper';
import Tutor from './Tutor/Tutor';
// import TutorForm from './TutorForm/TutorForm';
import plusImg from '../../images/add.svg';

/**
  При клике на "Добавить преподавателя" показывать или прятать форму добавления преподавателя:
  - переписываем `TutorsBlock` на класс
  - в состоянии одно свойство - `isFormOpen`
  - рендерим форму в зависимости от состояния `isFormOpen`
  - пишем метод `toggleForm` и передаем его пропсом onClick в `BigButton`
  - также в эту кнопку передаем текст по условию (если форма открыта текст меняется на `'Отменить добавление'`)
  - иконку тоже передаем только если форма закрыта (для этого изменяем пропТайп на иконке в кнопке на `PropTypes.oneOfType([PropTypes.string, PropTypes.bool])`,)

  Использовать форму добавления преподавателя и при клике на "Пригласить" прятать форму и добавлять преподавателя в колекцию:
  - в состояние `TutorsBlock` добавляем поле `tutors`, которое инициализируется из пропа `tutors`
  - пишем метод `addTutor(newTutor)`, который получает объект с новым
    преподавателем и добавляет его в массив `tutors`
  - передаем этот метод пропсом `onSubmit` в `TutorForm`
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

// import { Component } from 'react';

// class TutorsBlock extends Component {
//   state = {
//     tutors: this.props.tutors,
//     isFormOpen: false,
//   };

//   addTutor = newTutor => {
//     this.setState(prevState => ({
//       tutors: [...prevState.tutors, newTutor],
//       isFormOpen: false,
//     }));
//   };

//   toggleForm = () =>
//     this.setState(prevState => ({ isFormOpen: !prevState.isFormOpen }));

//   render() {
//     const { tutors, isFormOpen } = this.state;
//     return (
//       <div css={{ position: 'relative', marginBottom: 32 }}>
//         <ul>
//           {tutors.map(tutor => (
//             <li key={tutor.email} css={{ marginBottom: 24 }}>
//               <Paper>
//                 <Tutor {...tutor} />
//               </Paper>
//             </li>
//           ))}
//         </ul>

//         {isFormOpen && <TutorForm onSubmit={this.addTutor} />}

//         <BigButton
//           text={isFormOpen ? 'Отменить добавление' : 'Добавить преподавателя'}
//           icon={!isFormOpen && plusImg}
//           onClick={this.toggleForm}
//         />
//       </div>
//     );
//   }
// }

// TutorsBlock.propTypes = {
//   tutors: PropTypes.arrayOf(
//     PropTypes.shape({
//       firstName: PropTypes.string,
//     }),
//   ).isRequired,
// };

// export default TutorsBlock;
