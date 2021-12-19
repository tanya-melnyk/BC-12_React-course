# Модуль 6

## Занятие 11

## Основы Redux

- Ответы на вопросы
- Кахут
- Теория:
  - [Основные концепции](https://goyaltanu25.medium.com/starting-the-journey-with-redux-7d7d0a4592f4):
    store, state, actions, action creators, reducers
  - Создаём и настраиваем [хранилище](https://redux.js.org/api/store)
  - [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension)
  - Feature based структура файлов и папок
  - Пишем редюсер
  - Компонент [Provider](https://react-redux.js.org/api/provider)
  - Композиция редюсеров с
    [combineReducers](https://redux.js.org/api/combinereducers)
  - Готовим экшены и фабрики
  - Пакет [react-redux](https://react-redux.js.org/introduction/getting-started)
  - Хуки [useDispatch](https://react-redux.js.org/api/hooks#usedispatch) и
    [useSelector](https://react-redux.js.org/api/hooks#useselector)
  - [React Context vs React Redux](https://stackoverflow.com/questions/49568073/react-context-vs-react-redux-when-should-i-use-each-one/49569183#49569183)

### Задача № 1

Подключить redux в проект

1. Базовые настройки:

- устанавливаем нужные пакеты:
  ```
  npm install redux react-redux redux-devtools-extension
  ```
- определяем, что нам нужно хранить в редаксе (что локальный стейт, а что -
  глобальный)
- представляем, как мы хотим организовать наше хранилище:
  ```
  {
    tutors: [],
    cities: {
      items: [],
      filter: '',
    },
    departments: [],
  }
  ```

2. Создаём и настраиваем хранилище ([пример](https://www.epidemicsound.com/)):

- создаем в src папочку redux с одним файлом store.js
- импортим метод createStore из redux и создаем store с помощью этого метода:
  ```
  const store = createStore(() => ({}));
  ```
- импортим метод
  [devToolsEnhancer](https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm)
  чтобы настроить дев тулзы для редакса:

  ```
  import { devToolsEnhancer } from 'redux-devtools-extension';
  ```

- передаем его вызов вторым аргументом в createStore
- экспортим store
- в index.js импортим store, а также
  [Provider](<[Provider](https://react-redux.js.org/api/provider)>) из
  react-redux
- оборачиваем наш Арр в `<Provider store={store}>`
- проверяем в браузере, что вкладка redux заработала

3. Создаем редьюсеры для cities

- добавляем в папку redux новую папку cities
- создаем в ней файл citiesReducer.js
- пишем редьюсер для массива городов:
  ```
  const itemsReducer = (state = [], action) => {
    switch (action.type) {
      case 'cities/set':
        return action.payload;
      ...
      default:
        return state;
    }
  };
  ```
- теперь создаем такой же редьюсер для фильтра
- чтобы объеденить два редьюсера импортим метод
  [combineReducers](https://redux.js.org/api/combinereducers) из redux
- экспортим объединенный редьюсер:
  ```
  const citiesReducer = combineReducers({
    items: itemsReducer,
    filter: filterReducer,
  });
  ```
- импортим редьюсер в store.js и тут также создаем комбинированный редьсер,
  чтобы создать нужную нам структуру стейта:
  ```
  const rootReducer = combineReducers({
    tutors: () => [],
    cities: citiesReducer,
    departments: () => [],
  });
  ```
- передаем теперь rootReducer в createStore
- проверяем результат в дев-тулзах на вкладке redux

4. Создаем редьюсер для tutors:

- добавляем в папку redux новую папку tutors c файлом tutorsReducer.js
- пишем редьюсер для массива tutors:
  ```
  const tutorsReducer = (state = [], action) => {
    switch (action.type) {
      case 'tutors/set':
        return action.payload;
      ...
      default:
        return state;
    }
  };
  ```
- импортим этот редьюсер в store.js и добавляем его в комбинированный редьсер
- проверяем результат в дев-тулзах на вкладке redux

### Задача № 2

Переписать логику сохраниения и добавления преподавателей на `redux`, используя
connect()

1. Создадим action creators и types для tutors

- в редаксе в папке tutors создаем файл tutorsActions
- создаем 2 функции для каждого действия, например:
  ```
  const setTutors = tutors => ({
    type: 'tutors/set',
    payload: tutors,
  });
  ```
- для того, чтобы не дублировать одинаковые строки в tutorsActions и в
  tutorsReducer, создаем файлик tutorsTypes и там создаем объект со всеми
  типами:
  ```
  const types = {
    SET: 'tutors/set',
    ...
  };
  ```
- все типы в вашем проекте обязательно должны быть УНИКАЛЬНЫМИ
- теперь и в tutorsActions, и в tutorsReducer будем его использовать для
  обозначения типов

2. Свяжем TutorsBlock с redux

- из react-redux импортируем функцию
  [connect](https://react-redux.js.org/api/connect) в TutorsBlock и вызываем ее
  при экспорте нашего компонента
- напишем функцию
  [mapStateToProps](https://react-redux.js.org/api/connect#mapstatetoprops-state-ownprops--object),
  чтобы TutorsBlock мог получить доступ к стейту из редакса:
  ```
  const mapStateToProps = state => ({
    tutors: state.tutors,
  });
  ```
- в TutorsBlock теперь получаем tutors как проп (выводим в консоль)
- чтобы иметь возможность влиять на стейт редакса, напишем функцию
  [mapDispatchToProps](https://react-redux.js.org/api/connect#mapdispatchtoprops-object--dispatch-ownprops--object):
  ```
  const mapDispatchToProps = dispatch => ({
    onSetTutors: tutors => dispatch(setTutors(tutors)),
  });
  ```
- для этого импортируем setTutors из tutorsActions
- теперь мы можем в пропсах получить все необходимые данные: tutors и
  onSetTutors
- заменим старую логику на работу с редаксом и проверяем работу:
  - удалим локальный стейт tutors
  - в fetchTutors теперь будем вызывать onSetTutors, вместо setTutors

2. Свяжем TutorForm с redux

- из react-redux импортируем функцию
  [connect](https://react-redux.js.org/api/connect) в TutorsBlock и вызываем ее
  при экспорте нашего компонента
- чтобы иметь возможность влиять на стейт редакса, напишем функцию
  mapDispatchToProps:
  ```
  const mapDispatchToProps = dispatch => ({
    onAddTutor: tutor => dispatch(addTutor(tutor)),
  });
  ```
- для этого импортируем addTutor из tutorsActions в TutorForm
- первым аргументом в connect передадим null
- теперь мы можем в пропсах получить onAddTutor
- перенесем логику добавления преподавателя из TutorsBlock:
  - заберем 3 стейта - newTutor, loading, error
  - в handleSubmit теперь будем, вместо onSubmit, вызывать setNewTutor
  - перенесем useEffect с addTutor, где вместо setTutors, будем вызывать
    onAddTutor(savedTutor), а вместо setIsFormOpen - передадим новый проп
    closeForm из TutorsBlock
  - для того, чтобы TutorForm много раз не рендерилась, в TutorsBlock обернем
    функцию toggleForm в useCallback
  - теперь очищать форму было бы логичнее в useEffect в finally перед закрытием
    формы, а не в handleSubmit
  - скопируем также в TutorForm рендер Loader и ErrorMsg
  - в TutorsBlock уберем все лишнее ( можно оставить только loading, и по нему
    показывать и Skeleton, и Loader)

### Задача № 3

Переписать логику работы CitiesBlock на `redux`, используя хуки useDispatch и
useSelector

1. Добавим файл citiesTypes со всеми типами для городов:

```
const types = {
  SET: 'cities/set_items',
  ADD: 'cities/add_item',
  EDIT: 'cities/edit_item',
  REMOVE: 'cities/remove_item',
  FILTER: 'cities/change_filter',
};
```

2. Добавим файл citiesActions со всеми action creators:

- импортируем туда типы и пишем функции:
  ```
  const setCities = cities => ({
    type: types.SET,
    payload: cities,
  });
  ...
  const changeFilter = value => ({
    type: types.FILTER,
    payload: value,
  });
  ```

3. Допишем редьюсер для работы с массивом городов:

```
case types.ADD:
  return [...state, action.payload];
case types.EDIT:
  return state.map(city =>
    city.id === action.payload.id ? action.payload : city,
  );
case types.REMOVE:
  return state.filter(city => city.id !== action.payload);
```

- в filterReducer также заменим тип в case на переменную

4. Свяжем CitiesBlock с redux

- импортируем хуки
  [useDispatch](https://react-redux.js.org/api/hooks#usedispatch) и
  [useSelector](https://react-redux.js.org/api/hooks#useselector)
- импортируем все actions из citiesActions (\* as citiesActions)
- получаем доступ к cities и filter из редакс стейта с помощью useSelector
- получаем функцию dispatch из useDispatch
- заменяем все действия с городами на отправку actions
- логику по работе с фильтром, кроме фикса бага, переносим в сам Filter (фильтру
  будем передавать теперь только label)
- в useEffect для сброса фильтра используем dispatch

5. Свяжем Filter с redux

- импортируем хуки useDispatch и useSelector
- импортируем changeFilter из citiesActions
- получаем доступ к filter из редакс стейта с помощью useSelector
- получаем функцию dispatch из useDispatch
- заменяем логику onChange на dispatch
- в value инпута передадим filter из стейта редакса

### Задача № 4

Переписать логику работы DepartmentsBlock на `redux`, используя хуки useDispatch
и useSelector

### ДЗ

1. ContactForm

- локально стейт формы, а при сабмите - `dispatch(addContact({ name, number }))`
- для проверки дублирования контактов - получить все контакты из редакса

2. ContactList

- получаем все контакты из редакса для рендера
- передаем в кнопку `Удалить` - `dispatch(deleteContact(contact.id))`

3. Filter

- получаем значение фильтра из редакса для инпута
- в onChange передаем - `dispatch(changeFilter(e.target.value))`

4. App

- здесь теперь только рендер компонетов, никакого стейта

5. id в новый контакт можно добавлять при создании action, либо в редьюсере,
   либо в slice
