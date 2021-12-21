# QA

## React Hook Form & react-i18next

- Ответы на вопросы
- Практика:
  - переписываем форму на [React Hook Form](https://react-hook-form.com)
  - добавляем локализацию с [react-i18next](https://react.i18next.com/)

### Задача № 1

Переписать TutorForm на [React Hook Form](https://react-hook-form.com)

1. Удалим все ненужное:

- удаляем из инпутов все пропы onChange, required, checked, value (если не
  "radio")
- удаляем нашу функцию handleChange, а также проверки на заполенные поля
- удаляем локальный стейт formData, а также функцию reset
- удаляем переменную INITIAL_STATE

2. Установим библиотеку и повешаем слушатель на форму:

- [устанавливаем библиотеку](https://react-hook-form.com/get-started)
- для начала импортируем хук useForm
- деструктурируем из него handleSubmit
- наш метод handleSubmit переименуем в onSubmit
- форме передадим обработчик в onSubmit в таком виде:
  ```
  onSubmit={handleSubmit(onSubmit)}
  ```
- теперь наш метод onSubmit будет получать не е, а data
- для сброса формы после сабмита, деструктурируем из хука useForm метод reset

3. [Зарегистрируем](https://react-hook-form.com/api/useform/register) инпуты:

- деструктурируем из хука useForm метод register
- регистрируем все инпуты, удаляя пропы name:
  ```
  <input {...register("firstName")} />
  ```

4. Добавим [валидацию](https://react-hook-form.com/get-started#Applyvalidation)

- простая индивидуальная валидация:
  - во все обязательные инпуты добавляем валидацию required, а в имя и фамилию
    minLength:
    ```
    <input {...register("firstName", { required: true, minLength: 2 })} />
    ```
  - для отображения ошибок деструктурируем из хука useForm объект errors:
    ```
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    ```
  - под каждым инпутом выведем соответствующие ошибки:
    ```
    {errors.firstName?.type === 'required' && <ErrorMsg message="First name is required" />}
    {errors.firstName?.type === 'minLength' && <ErrorMsg message="First name should have more than 1 letter" />}
    ```
- простая общая валидация:
  - создаем универсальный объекты:
    ```
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
    ```
  - передаем их в соответствующие инпуты:
    ```
    <input {...register('lastName', textValidation)} />
    <input {...register('email', emailValidation)} />
    ```
  - а ниже выводим ошибки:
    ```
    {errors.firstName && <ErrorMsg message={errors.firstName.message} />}
    ```
- [Schema Validation](https://react-hook-form.com/get-started#SchemaValidation):

  - устанавливаем [yup](https://github.com/jquense/yup) и @hookform/resolvers
  - импортим нужные сущности и составляем схему:

    ```
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from "yup";

    const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = yup
      .object({
        firstName: yup.string()
          .min(2, 'В имени должно быть минимум 2 буквы')
          .max(15, 'В имени должно быть максимум 15 букв')
          .required('Обязательное поле'),
        lastName: yup.string()
          .min(2, 'В фамилии должно быть минимум 2 буквы')
          .max(20, 'В фамилии должно быть максимум 20 букв')
          .required('Обязательное поле'),
        phone: yup.string()
          .matches(phoneRegExp, 'Неверный номер телефона')
          .required('Обязательное поле'),
        email: yup.string().email('Неверный email').required('Обязательное поле'),
        city: yup.string().required('Обязательное поле'),
        gender: yup.string().nullable().required('Обязательное поле'),
      })
      .required();
    ```

  - передаем схему в хук useForm:
    ```
    useForm({ resolver: yupResolver(validationSchema) })
    ```
  - убираем простые валидации из register

- нам больше не нужно дизейблить кнопку, но если понадобится, то делаем это так:
  ```
  const { ..., formState: { isValid, errors } } = useForm({ mode: 'onChange'
    });
  <BigButton type="submit" text="Пригласить" disabled={!isValid} />
  ```

### Задача № 2

Добавить локализацию с [react-i18next](https://react.i18next.com/)

1. Базовые настройки

- [установим все нужные пакеты](https://react.i18next.com/latest/using-with-hooks#install-needed-dependencies)
- создаем файл i18n.js в папке src и переносим в него настройки из
  [руководства](https://react.i18next.com/latest/using-with-hooks#configure-i18next)
- импортируем файл в index.js

2. Компонент LanguageSwitcher

- в компонент LanguageSwitcher импортируем
  [useTranslation](https://react.i18next.com/latest/usetranslation-hook)
- из него достаем объект i18n
- на кнопку вешаем обработчик на onClick:
  [() => i18n.changeLanguage(lng)](https://react.i18next.com/legacy-v9/step-by-step-guide#d-let-the-user-toggle-the-language)
- а в className кнопки добавляем проверку по полю
  [resolvedLanguage](https://www.i18next.com/overview/api#resolvedlanguage):
  ```
  i18n.resolvedLanguage === lng ? s.active : s.button
  ```
- в Main подключим LanguageSwitcher
- чтобы приложение не падало, обернем LanguageSwitcher в
  [Suspense](https://react.i18next.com/latest/using-with-hooks#translate-your-content)
- в дальнейшем все компонеты, в которых будет реализован перевод, должны быть
  обернуты в Suspense

3. Перевод текста

- создаем файлы с переводами по пути
  [public/locales/<language_code>/translation.json](https://react.i18next.com/latest/using-with-hooks#translation-files)
- переводим тексты, используя
  [useTranslation](https://react.i18next.com/latest/using-with-hooks#translate-your-content)
  из react-i18next:
  - в UniversityPage импортируем useTranslation
  - получаем функцию: const { t } = useTranslation();
  - переводим Header title: {t('university.info')}

* почистить index.js, LanguageSwitcher, Main, UniversityPage
