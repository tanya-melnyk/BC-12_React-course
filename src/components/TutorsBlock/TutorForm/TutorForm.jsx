import { useState } from 'react';
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

const TutorForm = ({ onSubmit }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isFullTime, setIsFullTime] = useState(false);
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ lastName, firstName, phone, email, isFullTime, city, gender });
    reset();
  };

  const reset = () => {
    setLastName('');
    setFirstName('');
    setPhone('');
    setEmail('');
    setIsFullTime(false);
    setCity('');
    setGender('');
  };

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
              onChange={e => setLastName(e.target.value)}
            />
            <input
              name="firstName"
              value={firstName}
              type="text"
              placeholder="Имя*"
              required
              onChange={e => setFirstName(e.target.value)}
            />
            <input
              name="phone"
              value={phone}
              type="tel"
              placeholder="Телефон*"
              required
              onChange={e => setPhone(e.target.value)}
            />
            <input
              name="email"
              value={email}
              type="email"
              placeholder="Email*"
              required
              onChange={e => setEmail(e.target.value)}
            />

            <select
              name="city"
              value={city}
              onChange={e => setCity(e.target.value)}
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
                onChange={e => setGender(e.target.value)}
              />
              <label className={s.inner}>Женщина</label>
              <input
                type="radio"
                checked={gender === GENDER.FEMALE}
                name="gender"
                value={GENDER.FEMALE}
                onChange={e => setGender(e.target.value)}
              />
            </section>

            <label className={s.inner}>На постоянной основе</label>
            <input
              name="isFullTime"
              type="checkbox"
              checked={isFullTime}
              onChange={e => setIsFullTime(e.target.checked)}
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
