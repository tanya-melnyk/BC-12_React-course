## Модуль 1

### Занятие 1:

- Ответы на вопросы
- Кахут
- Теория:

  - Зачем нужны JS-фреймворки?
  - Веб-приложения, сравнение MPA и SPA
  - Концепция Virtual DOM
  - [create-react-app](https://create-react-app.dev/docs/getting-started)
  - Пакеты react и [react-dom](https://reactjs.org/docs/react-dom.html)
  - React-элементы
  - JSX как шаблонизатор. Выражения и рендер по условию.
  - Компоненты-функции
  - Передача данных через Props
  - Дефолтные значения пропсов в компонентах-функциях
  - Инструменты разработчика -
    [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  - Основы композиции компонентов
  - Пакет prop-types, свойство
    [propTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
  - Работа с коллекциями, ключи
  - [React strict mode](https://reactjs.org/docs/strict-mode.html)
  - [Алиасы](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
  - [Абсолютные импорты](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)
  - [Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)
  - [Два способа импорта картинок](https://create-react-app.dev/docs/adding-images-fonts-and-files/)

- Практика:

  - устанавливаем и запускаем `npx create-react-app .`
  - устанавливаем
    [доп. инструменты](https://github.com/goitacademy/react-lint-staged-workshop)

  ```
  npm install --save-dev prettier eslint
  npx mrm@2 lint-staged

  {
    "files.autoSave": "onFocusChange",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
  ```

  - добавляем расширения в prettier lint-staged `jsx,json,scss`
  - добавляем файлик `.prettierrc.json`
  - устанавливаем в браузере
    [react-developer-tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  - запускаем скрипт `npm start`
  - удаляем все лишние файлы
  - создаем в index.js несколько простых элементов и рендерим их
  - делаем то же самое, используя jsx
  - делаем то же самое, используя component App
  - передадим в Арр пропс `name`
  - вынесем Арр в отдельный файл, а в index.js его симпортим и подключим
  - в файле Арр создадим еще один компонент Text и подключим в компонент Арр
  - создадим там же компонент Title, который будет рендерить заголовок и детей
  - пропы по умолчанию ES6
  - установим prop-types `npm install --save-dev prop-types` и разберем их
  - пример с рендерингом по условию
  - рендер массива
  - добавим React.StrictMode в index.js

- Проект:

  - создаем базовую структуру

    - App -> Sidebar, Main
    - components
      - Sidebar -> Navigation (menu.js)
      - Navigation -> NavItems
        - NavItem -> a
      - Main -> Header, UniversityBlock, (Section -> TutorsBlock), (Section ->
        CitiesBlock), (Section -> DepartmentsBlock) (university.json)
      - Header -> header -> h2
      - UniversityBlock -> (Paper -> Card), (Paper -> p)
        - Card -> img, p, h3, buttons
      - TutorsBlock -> (ul -> li -> Paper -> Tutor), BigButton
        - Tutor -> ...
      - CitiesBlock -> CitiesList, BigButton
        - CitiesList -> ul -> li -> Paper -> p, button
      - DepartmentsBlock -> DepartmentsList, BigButton
        - DepartmentsList -> ul -> li -> Paper -> p, button
      - common
        - BigButton -> button
        - Paper -> div -> children
        - Section -> div -> img, h3, children

  - добавляем в каждую папку index.js с дефолтным импортом
  - дальше - по заданиям
  - тьютору передать все пропы, рассыпав их

### Tutor

```html
<div>
  <div>
    <p>Руденко</p>
    <p>Мария</p>
    <p>Александровна</p>
  </div>
  <div>
    <p>
      <span>+38(097) 448 73 11</span>
    </p>
    <p>
      <span>rudenko.mail@gmail.com</span>
    </p>
    <p>
      <span>Полтава</span>
    </p>
  </div>
  <div>
    <p>Создание групп</p>
  </div>
</div>
```

### Card

```html
<div>
  Card
  <div>
    <img src="" alt="University" />
  </div>
  <p>университет</p>
  <h3>MIT</h3>
  <div>
    <button>
      <EditIcon />
    </button>
    <button>
      <DeleteIcon />
    </button>
  </div>
</div>
```
