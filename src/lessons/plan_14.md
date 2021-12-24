# Модуль 7

## Занятие 14

## Селекторы и мемоизация

- Ответы на вопросы
- Кахут
- Теория:
  - Общие принципы мемоизации
  - Селекторы состояния
  - Функция
    [createSelector()](https://github.com/reduxjs/reselect#redux-toolkit)

### Задача № 1

Добавим селекторы для всех 3-х полей редакс-сотосяния `tutors`

- создаем файлик `tutorsSelectors.js`
- используем селекторы в `TutorsBlock` и `TutorForm`

### Задача № 2

Добавим селекторы для всех 4-х полей редакс-соcтояния `cities`, и отдельно
селектор для отфильтрованных городов

- создаем файлик `citiesSelectors.js`
- используем селекторы в `CitiesBlock` и `Filter`
- в файл `citiesSelectors` добавляем еще один составной селектор
  `getFilteredCities`, в котором используются два предыдущих селектора и
  возвращается массив отфильтрованных городов
- используем его в `CitiesBlock`

### Задача № 3

Мемоизируем селектор `getFilteredCities` с помощью функции
[createSelector](https://github.com/reduxjs/reselect#redux-toolkit)

- импортим функцию `createSelector` из `@reduxjs/toolkit`
- мемоизируем селектор `getFilteredCities`

### ЧИСТЫЙ РЕДАКС

### Задача № 4

Реализовать логику работы с бекендом для `tutors`, используя `thunks` (на чистом
редаксе)

1. Создаем `thunk getTutors`

- подключаемся к нашему основному `store` в `index.js`
- теперь наши `actions` должны диспатчиться только после асинхронной операции
  прямо в редаксе
- для создания `thunks` сделаем новый файл `tutorsOperations.js`
- напишем операцию по get-запросу за преподавателями:
  ```
  const getTutors = () => dispatch => {}
  ```
- для этого импортируем из апи-сервиса функцию `getData`
- переносим сюда переменную `API_ENDPOINT` из `TutorsBlock`
- импортим также `setTutors` из `tutorsActions`
- получаем данные с апи и диспатчим `setTutors`

2. Создаем `actions` для `getTutors`

- теперь `actions` у нас будут по 3 штуки на каждую асинхронную операцию
- например, для get-запроса по `tutors` это может выглядеть так:
  ```
  const getTutorsRequest = () => ({
    type: TYPES.GET_REQUEST,
  });
  const getTutorsSuccess = tutors => ({
    type: TYPES.GET_SUCCESS,
    payload: tutors,
  });
  const getTutorsError = error => ({
    type: TYPES.GET_ERROR,
    payload: error,
  });
  ```

3. Дописываем thunk `getTutors`

- импортируем их `tutorsOperations` и диспатчим в соответсвующих местах `thunk`:
  ```
  const getTutors = () => dispatch => {
    dispatch(getTutorsRequest());
    getData(API_ENDPOINT)
      .then(tutors => dispatch(getTutorsSuccess(tutors)))
      .catch(err => dispatch(getTutorsError(err.message)));
  };
  ```

4. Переписываем старый и добавляем новые редьюсеры

- мы хотим получить теперь более сложную структуру состояния для `tutors`:
  ```
  tutors: {
    items: [],
    loading: false,
    error: null
  }
  ```
- импортим все `TYPES` в `tutorsReducer.js`
- в `itemsReducer` теперь вместо `TYPES.SET` ожидаем `TYPES.GET_SUCCESS`
- добавляем еще два редьюсера - `loadingReducer` и `errorReducer`
- `loadingReducer` (по умолчанию `false`) обрабатывает все три типа, где только
  для `TYPES.GET_REQUEST` возвращает `true`:
  ```
  const loadingReducer = (state = false, action) => {
    switch (action.type) {
      case TYPES.GET_REQUEST:
        return true;
      case TYPES.GET_SUCCESS:
        return false;
      case TYPES.GET_ERROR:
        return false;
      ...
      default:
        return state;
    }
  };
  ```
- `errorReducer` (по умолчанию `null`) обрабатывает два действия, где для
  `TYPES.GET_REQUEST` возвращает `null`, а для `TYPES.GET_ERROR` - `payload`:
  ```
  const errorReducer = (state = null, action) => {
    switch (action.type) {
      case TYPES.GET_REQUEST:
        return null;
      case TYPES.GET_ERROR:
        return action.payload;
      ...
      default:
        return state;
    }
  };
  ```
- импортим `combineReducers` и усложняем состояние для `Tutors`, объединяя все
  три редьюсера (`items, loading, error`)

5. В `TutorsBlock` теперь используем операцию `getTutors` в
   `mapDispatchToProps`, добавив новое поле `onGetTutors`

- в `useEffect` оставляем только вызов `onGetTutors`
- а состояния `loading`, error теперь получаем в `mapStateToProps`

6. Повторяем все предыдущие действия для операции `addTutor`

```
const addTutor = tutor => dispatch => {};
```
