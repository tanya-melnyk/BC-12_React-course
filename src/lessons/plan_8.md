# Модуль 4

## Занятие 8

## React-хуки часть 2

- Ответы на вопросы
- Кахут
- Теория:
  - [Рефы и useRef](https://blog.logrocket.com/a-guide-to-react-refs/)
  - [Контекст](https://medium.com/@mohamedelayadi/react-context-all-you-need-to-know-40de6662b074)
    и [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
  - [useMemo](https://dev.to/afozbek/react-hooks-usememo-4n23) и
    [React.memo](https://dmitripavlutin.com/use-react-memo-wisely/)
  - [useCallback](https://habr.com/ru/post/529950/)
  - [useReducer](https://webtricks-master.ru/react-hooks/uchim-usereducer-na-primerah-react-hooks/)
  - [Кастомные хуки](https://reactjs.org/docs/hooks-custom.html) и
    [useDebugValue](https://reactjs.org/docs/hooks-reference.html#usedebugvalue)
  - Библиотека [react-use](https://github.com/streamich/react-use)
  - [15 Custom Hooks to Make your React Component Lightweight](https://javascript.plainenglish.io/15-custom-hooks-to-make-your-react-component-lightweight-8b59b122d83a)
- [Use Context and Custom Hooks to share user state](https://fatmali.medium.com/use-context-and-custom-hooks-to-share-user-state-across-your-react-app-ad7476baaf32)

### Задача № 1

[useRef](https://reactjs.org/docs/hooks-reference.html#useref):

1. EditCard

- для хранения `inputId` использовать `useRef` с начальным значением `nanoid()`
- рассказать про аналог `componentDidUpdate`

### Задача № 2

[Контекст](https://reactjs.org/docs/context.html) и
[useContext](https://reactjs.org/docs/hooks-reference.html#usecontext):

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
  - функцию используем как обработчик события в `onChange` инпута
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

### Задача № 3

[useMemo](https://reactjs.org/docs/hooks-reference.html#usememo),
[React.memo](https://reactjs.org/docs/react-api.html#reactmemo) и
[useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback):

- в компоненте `ItemsList` ставим консоль-лог и наблюдаем, как он перерендерится
  каждый раз, как мы открываем и закрываем форму добавления
- пробуем обернуть `ItemsList` в `React.memo` и смотрим на результат
- расставляем консоль-логи для каждого изменившегося пропа и проверяем, какие
  пропы меняются
- для того, чтобы избавиться от пересоздания пропов-функций, оборачиваем их при
  создании в `useCallback` в родителе `CitiesBlock`
- для того, чтобы отфильтрованные города не вычислялись каждый раз, оборачиваем
  их расчет в `useMemo`
- в браузере в `Profiler` сравнивам рендер `ItemsList` при открытии и закрытии
  формы добавления с и без `React.memo`
- - в Арр обернем в `useCallback` функцию смены темы

### Задача № 4

[useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer):

- в `DepartmentsBlock` перепишем `useState` для `departments` на `useReducer`:
  ```
  const [departments, dispatch] = useReducer(departmentsReducer, []);
  ```
- теперь везде вместо вызова setDepartments, будем использовать вызов
  `dispatch`, передавая ему объект с `action`, например:
  ```
  dispatch({ type: 'delete', payload: deletedDepartment.id });
  ```

### Задача № 6

[Кастомные хуки](https://reactjs.org/docs/hooks-custom.html) с
[useDebugValue](https://reactjs.org/docs/hooks-reference.html#usedebugvalue):

- написать свой `toggle` хук и использовать его для тоггла `Sidebar`
  (useDebugValue)
- разобрать кастомный хук `useOutsideClickDetector` и применить его в
  `CardWithMenu`

### Задача № 7

Библиотека [react-use](https://github.com/streamich/react-use):

- для фильтра в `CitiesBlock` использовать хук
  [useLocalStorage](https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md)
- в `Modal` используем хук
  [useLockBodyScroll](https://github.com/streamich/react-use/blob/master/docs/useLockBodyScroll.md)
