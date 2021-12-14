# Модуль 4

## Занятие 7

## [React-хуки](https://reactjs.org/docs/hooks-intro.html) часть 1

- Ответы на вопросы
- Кахут
- Теория:
  - [useState](https://reactjs.org/docs/hooks-state.html)
  - [useEffect](https://reactjs.org/docs/hooks-effect.html)
  - [Рефы и useRef](https://reactjs.org/docs/hooks-reference.html#useref)
  - [Контекст](https://reactjs.org/docs/context.html) и
    [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)

### Задача № 1

useState - переписать весь стейт на хуки:

1. Sidebar (CardWithMenu)
2. AddForm (TutorForm)

### Задача № 2

useEffect - переписать весь стейт и жизненные циклы на хуки:

1. Modal
2. TutorsBlock

- перепишем простой способ убрать утечку памяти в `useEffect` с `addTutor`:
  - вместо свойства класса `isTutorsMounted`, объявим такую же локальную
    переменную `let isTutorsMounted = true;` только в `useEffect` перед
    объявлением `addTutor`
  - в функции очистки `useEffect` меняем значение этой переменной на `false`
  - в функции `addTutor` после выполнения асинхронной операции, абсолютно все
    действия по изменению стейта делаем после проверки `if (isTutorsMounted)`
- перепишем способ с `AbortController` в `useEffect` в `fetchTutors`:

  - вместо свойств в классе объявим такие же локальные переменные только в
    `useEffect` перед объявлением `fetchTutors`:
    ```
    const controller = new AbortController();
    const signal = controller.signal;
    ```
  - в функции очистки `useEffect` прерываем запрос:
    ```
    controller.abort();
    ```
  - в GET-запросе передаем, кроме ендпоинта, объект `{ signal }`
  - после выполнения асинхронной операции, в `catch` и `finally` абсолютно все
    действия по изменению стейта делаем после проверки:
    ```
    if (!signal.aborted) {};
    ```

2. CitiesBlock

- асинхронность обновления стейта в асинхронном коде - в `CitiesBlock` в
  `addCity` в `finally` сначала очистить `setActiveCity`, а потом `setAction`
- реализуем сохранение значения фильтра `CitiesBlock` в `localStorage`, чтобы
  показать ленивую инициализацию в `useState`
- в `CitiesBlock` убрать лишнюю функцию `handleFilterChange`

### Задача № 3

useRef:

1. EditCard (AddForm) при маунте получить фокус на инпут

- переписать `EditCard` на хуки
- для получения фокуса в теле `EditCard` создаем `inputRef`, используя хук с
  начальным значением `null`
- вешаем реф на инпут с привязкой к `inputRef`
- при маунте (в `useEffect` с пустым массивом зависимостей) вызываем метод
  `focus` на полученном элементе - `inputRef.current.focus()`
- для хранения `inputId` использовать `useRef` с начальным значением `nanoid()`
- рассказать про аналог `componentDidMount`

### Задача № 4

useContext:

1. Реализуем смену темы

- `themeContext.js`
  - в `src` создадим папку `context` с файлом `themeContext`
  - импортим в нем `createContext`, с помощью которого создаем `ThemeContext` с
    начальным значением:
    ```
    { theme: themes.light, toggleTheme: () => {} }
    ```
  - для тем используем объект:
    ```
    const themes = { light: 'light', dark: 'dark' };
    ```
  - экспортируем и темы, и контекст
- `App.jsx`
  - импортируем `ThemeContext` и `themes` из `themeContext.js`
  - создаем стейт `theme` с начальным значением `themes.light`
  - создаем функцию `toggleTheme`, которая меняет темы в стейте в зависимости от
    того, какаятема была предыдущей (или `themes.light`, или `themes.dark`)
  - оборачиваем все компоненты, которым нужна информация о теме в провайдер,
    которому в поле `value` передаем стейт `theme` и функцию:
    ```
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    ```
- `ThemeSwitcher.jsx`
  - импортируем `useContext`, а также `ThemeContext` и `themes` из
    `themeContext.js`
  - получаем доступ к текущей теме и функции:
    ```
    const { theme, toggleTheme } = useContext(ThemeContext);
    ```
  - функцию используем как обработчик события в onChange инпута
  - а тему для определения состояния чекбокса:
    ```
    checked={theme === themes.light}
    ```
- `Header.jsx`
  - импортируем `useContext`, `ThemeSwitcher`, а также `ThemeContext` и `themes`
    из контекста
  - подключаем `ThemeSwitcher` над заголовком
  - с помощью `useContext` получаем доступ к текущей теме, которую используем
    для определения класса на хедере:
    ```
    className={theme === themes.light ? s.lightTheme : s.darkTheme}
    ```
- Остальные файлы, которым нужна информация о теме (`Main`, `Section`,
  `Sidebar`...)
  - импортируем `useContext`, а также `ThemeContext` и `themes` из контекста
  - с помощью `useContext` получаем доступ к текущей теме, которую используем
    для определения классов
