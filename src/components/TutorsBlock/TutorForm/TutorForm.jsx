import { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../../common/BigButton/BigButton';
import Paper from '../../common/Paper/Paper';
import s from './TutorForm.module.css';

/**
  - в форме-классе с одним пропом onSubmit создаем стейт с изначальным состоянием каждого инпута ("")
  - пишем универсальный метод `handleChange` для измненения состояния по событию в инпут и передаем его обработчиком в onChange каждого инпута
  - пишем метод `handleSubmit`, в котором вызываем метод `this.props.onSubmit`, передавая ему текущее состояние и очищаем форму
  - очистку формы вынесем в отдельный метод `reset` (использовать `INITIAL_STATE`)
  - в методе render деструктурируем все поля стейта и передаем их как значения инпутов в поле value
  - в методе render создаем переменую isAddBtnDisabled, которая будет служить значение поля disabled в BigButton, значение переменной будет true, только если все поля формы будут заполнены
 */

// const INITIAL_STATE = {
//   lastName: '',
//   firstName: '',
//   patronymic: '',
//   phone: '',
//   email: '',
//   city: '',
//   options: '',
// };

class TutorForm extends Component {
  render() {
    return (
      <div className={s.container}>
        <Paper>
          <div className={s.inner}>
            <h4 className={s.formName}>Добавление преподавателя</h4>
            <form onSubmit={this.handleSubmit}>
              <input
                name="lastName"
                type="text"
                placeholder="Фамилия*"
                required
              />
              <input name="firstName" type="text" placeholder="Имя*" required />
              <input
                name="patronymic"
                type="text"
                placeholder="Отчество*"
                required
              />
              <input name="phone" type="tel" placeholder="Телефон*" required />
              <input name="email" type="email" placeholder="Email*" required />
              <input name="city" type="text" placeholder="Город*" required />
              <input
                name="options"
                type="text"
                placeholder="Вид деятельности*"
                required
              />

              <BigButton type="submit" text="Пригласить" disabled />
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

TutorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TutorForm;

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

// class TutorForm extends Component {
//   state = { ...INITIAL_STATE };

//   handleChange = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ ...INITIAL_STATE });
//   };

//   render() {
//     const { lastName, firstName, patronymic, phone, email, city, options } =
//       this.state;
//     const isAddBtnDisabled = Object.values(this.state).some(value => !value);

//     return (
//       <div className={s.container}>
//         <Paper>
//           <div className={s.inner}>
//             <h4 className={s.formName}>Добавление преподавателя</h4>
//             <form onSubmit={this.handleSubmit}>
//               <input
//                 name="lastName"
//                 value={lastName}
//                 type="text"
//                 placeholder="Фамилия*"
//                 required
//                 onChange={this.handleChange}
//               />
//               <input
//                 name="firstName"
//                 value={firstName}
//                 type="text"
//                 placeholder="Имя*"
//                 required
//                 onChange={this.handleChange}
//               />
//               <input
//                 name="patronymic"
//                 value={patronymic}
//                 type="text"
//                 placeholder="Отчество*"
//                 required
//                 onChange={this.handleChange}
//               />
//               <input
//                 name="phone"
//                 value={phone}
//                 type="tel"
//                 placeholder="Телефон*"
//                 required
//                 onChange={this.handleChange}
//               />
//               <input
//                 name="email"
//                 value={email}
//                 type="email"
//                 placeholder="Email*"
//                 required
//                 onChange={this.handleChange}
//               />
//               <input
//                 name="city"
//                 value={city}
//                 type="text"
//                 placeholder="Город*"
//                 required
//                 onChange={this.handleChange}
//               />
//               <input
//                 name="options"
//                 value={options}
//                 type="text"
//                 placeholder="Вид деятельности*"
//                 required
//                 onChange={this.handleChange}
//               />

//               <BigButton
//                 type="submit"
//                 text="Пригласить"
//                 disabled={isAddBtnDisabled}
//               />
//             </form>
//           </div>
//         </Paper>
//       </div>
//     );
//   }
// }

// TutorForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };

// export default TutorForm;
