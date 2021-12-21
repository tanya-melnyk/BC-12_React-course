import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import BigButton from 'components/common/BigButton/BigButton';
import ErrorMsg from 'components/common/ErrorMsg/ErrorMsg';
import Loader from 'components/common/Loader/Loader';
import Paper from 'components/common/Paper/Paper';
import { addTutor } from 'redux/tutors/tutorsActions';
import * as api from 'services/api';
import s from './TutorForm.module.css';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup
  .object({
    firstName: yup
      .string()
      .min(2, 'В имени должно быть минимум 2 буквы')
      .max(15, 'В имени должно быть максимум 15 букв')
      .required('Обязательное поле'),
    lastName: yup
      .string()
      .min(2, 'В фамилии должно быть минимум 2 буквы')
      .max(20, 'В фамилии должно быть максимум 20 букв')
      .required('Обязательное поле'),
    phone: yup
      .string()
      .matches(phoneRegExp, 'Неверный номер телефона')
      .required('Обязательное поле'),
    email: yup.string().email('Неверный email').required('Обязательное поле'),
    city: yup.string().required('Обязательное поле'),
    gender: yup.string().nullable().required('Обязательное поле'),
  })
  .required();

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

const API_ENDPOINT = 'tutors';

const textValidation = {
  required: 'This field is required',
  minLength: {
    value: 2,
    message: 'Field should have more than 1 letter',
  },
};
const emailValidation = {
  required: 'Email is required',
  pattern: {
    value:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Invalid email address',
  },
};

const TutorForm = ({ closeForm, onAddTutor }) => {
  const [newTutor, setNewTutor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = data => {
    setNewTutor(data);
    reset();
  };

  // ADD TUTOR

  useEffect(() => {
    if (!newTutor) return;

    let isTutorsMounted = true;
    const addTutor = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedTutor = await api.saveItem(API_ENDPOINT, newTutor);
        if (isTutorsMounted) {
          onAddTutor(savedTutor);
        }
      } catch (error) {
        if (isTutorsMounted) {
          setError(error.message);
        }
      } finally {
        if (isTutorsMounted) {
          setLoading(false);
          setNewTutor(null);
          closeForm();
        }
      }
    };
    addTutor();

    return () => {
      isTutorsMounted = false;
    };
  }, [closeForm, newTutor, onAddTutor]);

  return (
    <div className={s.container}>
      {loading && <Loader />}

      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>Добавление преподавателя</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('lastName')}
              type="text"
              placeholder="Фамилия*"
            />
            {errors.lastName && <ErrorMsg message={errors.lastName.message} />}

            <input {...register('firstName')} type="text" placeholder="Имя*" />
            {errors.firstName && (
              <ErrorMsg message={errors.firstName.message} />
            )}

            <input {...register('phone')} type="tel" placeholder="Телефон*" />
            {errors.phone && <ErrorMsg message={errors.phone.message} />}

            <input {...register('email')} type="email" placeholder="Email*" />
            {errors.email && <ErrorMsg message={errors.email.message} />}

            <select {...register('city')} className={s.inner}>
              {citiesOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.city && <ErrorMsg message={errors.city.message} />}

            <section>
              <h5 className={s.inner}>Пол*</h5>
              <label className={s.inner}>Мужчина</label>
              <input {...register('gender')} type="radio" value={GENDER.MALE} />
              <label className={s.inner}>Женщина</label>
              <input
                {...register('gender')}
                type="radio"
                value={GENDER.FEMALE}
              />
            </section>
            {errors.gender && <ErrorMsg message={errors.gender.message} />}

            <label className={s.inner}>На постоянной основе</label>
            <input {...register('isFullTime')} type="checkbox" />

            <BigButton type="submit" text="Пригласить" />
          </form>

          {/* SIMPLE VALIDATION */}

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('lastName', textValidation)}
              type="text"
              placeholder="Фамилия*"
            />
            {errors.lastName && <ErrorMsg message={errors.lastName.message} />}

            <input
              {...register('firstName', textValidation)}
              type="text"
              placeholder="Имя*"
            />
            {errors.firstName && (
              <ErrorMsg message={errors.firstName.message} />
            )}

            <input
              {...register('phone', { required: true })}
              type="tel"
              placeholder="Телефон*"
            />
            {errors.phone?.type === 'required' && (
              <ErrorMsg message="Phone is required" />
            )}

            <input
              {...register('email', emailValidation)}
              type="email"
              placeholder="Email*"
            />
            {errors.email && <ErrorMsg message={errors.email.message} />}

            <select
              {...register('city', { required: true })}
              className={s.inner}
            >
              {citiesOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.city?.type === 'required' && (
              <ErrorMsg message="City is required" />
            )}

            <section>
              <h5 className={s.inner}>Пол*</h5>
              <label className={s.inner}>Мужчина</label>
              <input
                {...register('gender', { required: true })}
                type="radio"
                value={GENDER.MALE}
              />
              <label className={s.inner}>Женщина</label>
              <input
                {...register('gender', { required: true })}
                type="radio"
                value={GENDER.FEMALE}
              />
            </section>
            {errors.gender?.type === 'required' && (
              <ErrorMsg message="Gender is required" />
            )}

            <label className={s.inner}>На постоянной основе</label>
            <input {...register('isFullTime')} type="checkbox" />

            <BigButton type="submit" text="Пригласить" />
          </form> */}
        </div>
      </Paper>

      {error && <ErrorMsg message={error} />}
    </div>
  );
};

TutorForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAddTutor: tutor => dispatch(addTutor(tutor)),
});

export default connect(null, mapDispatchToProps)(TutorForm);
