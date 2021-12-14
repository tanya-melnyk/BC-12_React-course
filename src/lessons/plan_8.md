# Модуль 4

## Занятие 8

## React-хуки часть 2

- Ответы на вопросы
- Кахут
- Теория:
  - [Рефы и useRef](https://reactjs.org/docs/hooks-reference.html#useref)
  - [Контекст](https://reactjs.org/docs/context.html) и
    [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
  - https://github.com/streamich/react-use/blob/master/docs/useLockBodyScroll.md

### Задача № 3

useRef:

1. EditCard

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
