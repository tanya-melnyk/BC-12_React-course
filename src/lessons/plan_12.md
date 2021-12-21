# Модуль 6

## Занятие 12

## Redux Toolkit

- Ответы на вопросы
- Кахут
- Теория:
  - Разбираем [Redux Toolkit](https://redux-toolkit.js.org/) и рефакторим код
    предыдущего занятия
  - [configureStore()](https://redux-toolkit.js.org/api/configureStore)
  - [createAction()](https://redux-toolkit.js.org/api/createAction)
  - [createReducer()](https://redux-toolkit.js.org/api/createReducer)
  - [createSlice()](https://redux-toolkit.js.org/api/createSlice)
  - Библиотека [Redux Persist](https://github.com/rt2zz/redux-persist)

### Задача № 1

Переписать `store`, используя
[configureStore()](https://redux-toolkit.js.org/api/configureStore) из
`Redux Toolkit`

- скопируем папочку `redux`, и одну переименуем в `redux_base`
- [устанавливаем библиотеку](https://redux-toolkit.js.org/introduction/getting-started#an-existing-app)
- вместо `createStore` и `combineReducers` из `redux`, импортим
  [configureStore](https://redux-toolkit.js.org/api/configureStore) из
  `@reduxjs/toolkit`
- теперь создаем объединенный редьюсер прямо в `configureStore`:
  ```
  const store = configureStore({
    reducer: {
      tutors: tutorsReducer,
      cities: citiesReducer,
      departments: () => [],
    },
  });
  ```
- [доп. настройки](https://redux-toolkit.js.org/api/configureStore#full-example):
  - `devToolsEnhancer` нам больше не понадобится, а при создании `store` укажем,
    что `devTools` нам не нужны в `production`
  - также при создании `store` добавим `middleware` `logger` из пакета
    `redux-logger` (импортим `createLogger`):
    ```
    const logger = createLogger({
      collapsed: (getState, action, logEntry) => !logEntry.error, // collapse actions that don't have errors
      timestamp: false, // print the timestamp with each action
      diff: true,
    });
    ```

### Задача № 2

Переписать код редакса для tutors, используя
[createAction()](https://redux-toolkit.js.org/api/createAction) и
[createReducer()](https://redux-toolkit.js.org/api/createReducer) из
`Redux Toolkit`

- в `tutorsActions` импортим `createAction` из `@reduxjs/toolkit` и переписываем
  все функции
- теперь нам больше не нужен файл `tutorsTypes`
- в `tutorsReducer` импортим `createReducer` из `@reduxjs/toolkit` и все
  `аctions` из `tutorsActions`
- переписываем `tutorsReducer`, используя сначала
  [createReducer с объектом, как второй аргумент](https://redux-toolkit.js.org/api/createReducer#usage-with-the-map-object-notation)
- а потом - используя
  [колбек с builder, как второй аргумент](https://redux-toolkit.js.org/api/createReducer#usage-with-the-builder-callback-notation)

### Задача № 3

Переписать код редакса для `cities`, используя
[createSlice()](https://redux-toolkit.js.org/api/createSlice) из `Redux Toolkit`

- в папочке `cities` создаем новый файл `citiesSlice`
- импортируем в него `createSlice` и `combineReducers` из `@reduxjs/toolkit`
- создаем слайсы для `items` и для `filter`
- в конце импортим все деструктурированные `actions` из i`tems.actions` и
  `filter.actions`
- а после - импортим по умолчанию объеденненные редьюсеры `items.reducer` и
  `filter.reducer`
- теперь в `store` будем импортировать citiesReducer из `citiesSlice`
- теперь в `CitiesBlock` и `Filter` будем импортировать `actions` из
  `citiesSlice`
- чтобы было удобнее это делать можем в папочку `cities` добавить файл
  `index.js`, в котором будет реэкспорт всех `actions`:
  ```
  export * as citiesActions from './citiesSlice';
  ```
- теперь нам не нужны все остальные файлы в папке `cities`

- используя `createReducer` или `createSlice` можем
  [мутировать стейт](https://redux-toolkit.js.org/api/createReducer#direct-state-mutation):
  - сделаем из двух слайсов один общий, используя объект как начальное состояние
  - в функциях будем мутировать соответствующее поле стейта

### Задача № 4

Реализовать сохранение фильтра в `Local Storage`, используя библиотеку
[Redux Persist](https://github.com/rt2zz/redux-persist)

- [устанавливаем библиотеку](https://www.npmjs.com/package/redux-persist)
- импортируем методы
  [persistStore, persistReducer](https://github.com/rt2zz/redux-persist#basic-usage)
- импорттируем `storage` из `redux-persist/lib/storage`
- создаем `persistConfig`:

  ```
  const persistConfig = {
    key: 'filter',
    storage,
  };

  ```

- чтобы не хранить весь стейт `cities` в сторидже, а только `filter`, добавляем
  поле [whitelist](https://github.com/rt2zz/redux-persist#basic-usage) в
  `persistConfig`:

  ```
  whitelist: ['filter'],
  ```

- теперь в `configureStore` передаем `citiesReducer` в `persistReducer`:
  ```
  cities: persistReducer(persistConfig, citiesReducer),
  ```
- создем персистор:
  ```
  const persistor = persistStore(store);
  ```
- экспортим его вместе с хранилищем, и импортим и `store`, и `persistor` в
  `index.js`
- там же импортим `PersistGate`:
  ```
  import { PersistGate } from 'redux-persist/integration/react'
  ```
- и оборачиваем им наш `Арр` внутри `Provider`:
  ```
  <PersistGate loading={null} persistor={persistor}>
  ```
- чтобы не получать ошибки в консоли, реализуем
  [следующие шаги](https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist)
- теперь финальный вид нашего хранилища такой:
  ```
  const store = configureStore({
    reducer: {
      tutors: tutorsReducer,
      cities: persistReducer(persistConfig, citiesReducer),
      departments: () => [],
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(logger),
  });
  ```

### Задача № 5

Переписать логику работы `DepartmentsBlock` на `redux`, используя
[Redux Toolkit](https://redux-toolkit.js.org/)

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

5. id в новый контакт можно добавлять в самой форме / при создании action / в
   редьюсере /
   [в slice](https://redux-toolkit.js.org/api/createSlice#customizing-generated-action-creators)
   и библиотеку `nanoid` теперь можно взять прямо из
   [redux-toolkit](https://redux-toolkit.js.org/api/other-exports#nanoid)
