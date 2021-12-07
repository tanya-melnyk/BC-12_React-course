# Занятие №2

## Стилизация компонентов (Прдолжаем работать с кодом из первого занятия)

### Подготовка

- подключить нормализацию стилей, используя
  [встроенный CSS Reset](https://create-react-app.dev/docs/adding-css-reset/),
  либо установив пакет
  [modern-normalize](https://github.com/sindresorhus/modern-normalize)
- создать папку `styles` для глобальных стилей и вынести туда `index.css`
- в нем подключить шрифт
  [Montserrat](https://fonts.google.com/specimen/Montserrat) жирностью 400, 500,
  600 и использовать его в боди как основной
- там же для `:root` создать css-переменные `--accent-color` с цветом и
  `"#ff6b0a"` и `--text-color` с цветом `"#010101"`
- там же `var --text-color` использовать в боди для задания цвета шрифта

### Задача №1

Сделать стилизацию App и Sidebar используя стандартный
[CSS](https://create-react-app.dev/docs/adding-a-stylesheet)/[SCSS](https://create-react-app.dev/docs/adding-a-sass-stylesheet/):

- установим
  [node-sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet/) для
  работы с SCSS
- для Sidebar и Арр создадим CSS файлы, а для NavItem - SCSS
- для Navigation используем инлайновые стили

### Задача №2

Добавить в NavItem иконки
[react-icons](https://react-icons.github.io/react-icons/):

- задать цвет `"#ff6b0a"` и размер `24px`

```jsx
import { HiBookOpen, HiAcademicCap } from 'react-icons/hi';

export const navConfig = [
  {
    name: 'Университет',
    icon: <HiBookOpen />,
  },

  {
    name: 'Факультеты',
    icon: <HiAcademicCap />,
  },
];
```

### Задача №3

Сделать стилизацию Main, Header, UniversityBlock, Paper и Card используя
[CSS-модули](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet):

- создадим в папке styles файл `global.module.css`, в котором определим
  глобальный стиль `.heading` для всех заголовков на странице, и подключим его в
  `index.js`
- в папке styles также создадим файлик `variables.module.css`, в который добавим
  переменную, например `@value main-gap: 32px;`
- Добавим стили в Main, Header, UniversityBlock, Paper и Card

### Задача №4

Застилизировать остаток макета используя
[Emotion](https://emotion.sh/docs/introduction#react) (Section, TutorsBlock,
Tutor, BigButton, CitiesList, DepartmentsList)

- устанавливаем библиотеку и в нужных файлах
  [прописываем коммент](https://emotion.sh/docs/css-prop#jsx-pragma)
