import { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../../common/BigButton/BigButton';
import Paper from '../../common/Paper/Paper';
import s from './TutorForm.module.css';

const citiesOptions = [
  {
    label: 'Выберите город*',
    value: '',
  },
  {
    label: 'Полтава',
    value: 'Полтава',
  },
  {
    label: 'Киев',
    value: 'Киев',
  },
  {
    label: 'Львов',
    value: 'Львов',
  },
];

const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
};

const INITIAL_STATE = {
  lastName: '',
  firstName: '',
  phone: '',
  email: '',
  isFullTime: false, // checkbox
  city: '', // select
  gender: '', // radio
};

class TutorForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = e => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === 'checkbox';
    this.setState({
      [name]: isCheckbox ? checked : value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { lastName, firstName, phone, email, isFullTime, city, gender } =
      this.state;

    const isSubmitBtnDisabled = Object.values(this.state).some(
      value => typeof value !== 'boolean' && !value,
    );

    return (
      <div className={s.container}>
        <Paper>
          <div className={s.inner}>
            <h4 className={s.formName}>Добавление преподавателя</h4>
            <form onSubmit={this.handleSubmit}>
              <input
                name="lastName"
                value={lastName}
                type="text"
                placeholder="Фамилия*"
                required
                onChange={this.handleChange}
              />
              <input
                name="firstName"
                value={firstName}
                type="text"
                placeholder="Имя*"
                required
                onChange={this.handleChange}
              />
              <input
                name="phone"
                value={phone}
                type="tel"
                placeholder="Телефон*"
                required
                onChange={this.handleChange}
              />
              <input
                name="email"
                value={email}
                type="email"
                placeholder="Email*"
                required
                onChange={this.handleChange}
              />

              <select
                name="city"
                value={city}
                onChange={this.handleChange}
                className={s.inner}
              >
                {citiesOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <section>
                <h5 className={s.inner}>Пол*</h5>
                <label className={s.inner}>Мужчина</label>
                <input
                  type="radio"
                  checked={gender === GENDER.MALE}
                  name="gender"
                  value={GENDER.MALE}
                  onChange={this.handleChange}
                />
                <label className={s.inner}>Женщина</label>
                <input
                  type="radio"
                  checked={gender === GENDER.FEMALE}
                  name="gender"
                  value={GENDER.FEMALE}
                  onChange={this.handleChange}
                />
              </section>

              <label className={s.inner}>На постоянной основе</label>
              <input
                name="isFullTime"
                type="checkbox"
                checked={isFullTime}
                onChange={this.handleChange}
              />

              <BigButton
                type="submit"
                text="Пригласить"
                disabled={isSubmitBtnDisabled}
              />
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
