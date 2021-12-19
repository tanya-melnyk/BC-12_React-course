import { useState } from 'react';
import PropTypes from 'prop-types';
import BigButton from 'components/common/BigButton/BigButton';
import Paper from 'components/common/Paper/Paper';
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

const TutorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const isCheckbox = type === 'checkbox';
    setFormData({
      ...formData,
      [name]: isCheckbox ? checked : value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...formData });
    reset();
  };

  const reset = () => setFormData({ ...INITIAL_STATE });

  const { lastName, firstName, phone, email, city, gender, isFullTime } =
    formData;

  const requiredValues = [lastName, firstName, phone, email, city, gender];
  const isSubmitBtnDisabled = requiredValues.some(value => !value);

  return (
    <div className={s.container}>
      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>Добавление преподавателя</h4>
          <form onSubmit={handleSubmit}>
            <input
              name="lastName"
              value={lastName}
              type="text"
              placeholder="Фамилия*"
              required
              onChange={handleChange}
            />
            <input
              name="firstName"
              value={firstName}
              type="text"
              placeholder="Имя*"
              required
              onChange={handleChange}
            />
            <input
              name="phone"
              value={phone}
              type="tel"
              placeholder="Телефон*"
              required
              onChange={handleChange}
            />
            <input
              name="email"
              value={email}
              type="email"
              placeholder="Email*"
              required
              onChange={handleChange}
            />

            <select
              name="city"
              value={city}
              onChange={handleChange}
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
                onChange={handleChange}
              />
              <label className={s.inner}>Женщина</label>
              <input
                type="radio"
                checked={gender === GENDER.FEMALE}
                name="gender"
                value={GENDER.FEMALE}
                onChange={handleChange}
              />
            </section>

            <label className={s.inner}>На постоянной основе</label>
            <input
              name="isFullTime"
              type="checkbox"
              checked={isFullTime}
              onChange={handleChange}
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
};

TutorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TutorForm;
