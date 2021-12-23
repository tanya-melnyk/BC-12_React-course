# Модуль 7

## Занятие 13

## Асинхронный Redux

- Ответы на вопросы
- Кахут
- Теория:
  - Прослойка и стек прослоек (middleware)
  - Добавление прослоек к хранилищу
  - Библиотека [redux-thunk](https://github.com/reduxjs/redux-thunk)
  - Асинхронные действия (операции)
  - HTTP-запросы
  - [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)

### Задача № 1

Разбираем как подключать прослойки в редаксе с `redux-toolkit`

1. Подключим кастомный логгер

- разбираем кастомные логгеры в папке `middleware`
- импортируем их в наш `store` и конкатенируем в массив прослоек, который
  возвращает `getDefaultMiddleware`
- смотрим результат в консоли

### Задача № 2

Реализовать логику работы с бекендом для `tutors`, используя `thunks` (на чистом
редаксе)

```
dispatch operation => api request => dispatch action => reducers => state change
```

1. Создаем `thunk getTutors`

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
  const getTutorsRequest = createAction('tutors/getTutorsRequest');
  const getTutorsSuccess = createAction('tutors/getTutorsSuccess');
  const getTutorsError = createAction('tutors/getTutorsError');
  ...
  ```
- создаем такие же 3 `actions` для `addTutor` и импортим все `actions`

3. Дописываем `thunk getTutors` и добавляем `thunk addTutor`

- импортируем `actions` в `tutorsOperations` и диспатчим их в соответсвующих
  местах `thunk`:
  ```
  const getTutors = () => dispatch => {
    dispatch(getTutorsRequest());
    getData(API_ENDPOINT)
      .then(tutors => dispatch(getTutorsSuccess(tutors)))
      .catch(err => dispatch(getTutorsError(err.message)));
  };
  ```
- для `getTutors` будем получать `tutor` первым аргументом и отправлять его на
  бекенд:

  ```
  const addTutor = tutor => dispatch => {};
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
- импортим все actions в `tutorsReducer.js`
- в `tutorsReducer` теперь вместо `setTutors` и `addTutor` ожидаем
  `getTutorsSuccess` и `addTutorSuccess`
- добавляем еще два редьюсера - `loadingReducer` и `errorReducer`
- `loadingReducer` (по умолчанию `false`) обрабатывает все три действия по
  каждому асинхронному `action`, где только для `getTutorsRequest` или
  `addTutorRequest` возвращает `true`:
  ```
  const loadingReducer = createReducer(false, builder => {
    builder
      .addCase(getTutorsRequest, () => true)
      .addCase(getTutorsSuccess, () => false)
      .addCase(getTutorsError, () => false)
      ...
  });
  ```
- `errorReducer` (по умолчанию `null`) обрабатывает два действия, где для
  `getTutorsRequest` возвращает `null`, а для `getTutorsError` - `payload`:
  ```
  const errorReducer = createReducer(null, builder => {
    builder
      .addCase(getTutorsRequest, () => null)
      .addCase(getTutorsError, (_, action) => action.payload)
      ...
  });
  ```
- импортим combineReducers и усложняем состояние для `Tutors`, объединяя все три
  редьюсера (`items, loading, error`)

5. В `TutorsBlock` теперь используем операцию `getTutors`

- в `mapDispatchToProps` добавим новое поле `onGetTutors`:
  ```
  onGetTutors: () => dispatch(getTutors()),
  ```
- а состояния `loading` и `error` теперь получаем в `mapStateToProps`:
  ```
  tutors: state.tutors.items,
  loading: state.tutors.loading,
  error: state.tutors.error,
  ```
- в `useEffect` оставляем только вызов `onGetTutors()`

6. В `TutorForm` теперь используем операцию `addTutor`

- в `mapDispatchToProps` останется поле `onAddTutor`:
  ```
  onAddTutor: tutor => dispatch(addTutor(tutor)),
  ```
- состояния `loading` и `error` теперь получаем в `mapStateToProps`:
  ```
  const mapStateToProps = state => ({
    loading: state.tutors.loading,
    error: state.tutors.error,
  });
  ```
- в `useEffect` оставляем только вызов `onAddTutor(newTutor)`, а закрываем форму
  и
  [очищаем поле newTutor в then](https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-results):

  ```
  if (!newTutor) return;

  onAddTutor(newTutor).then(() => {
    setNewTutor(null);
    closeForm();
  });
  ```

- для этого в `operations` должен быть `return`, если они написаны не на
  `async/await`

### Задача № 3

Реализовать логику работы с бекендом для `cities`, используя
[createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk#promise-lifecycle-actions)

1. Создаем `operations`

- добавим новый файл `citiesOperations.js`
- импортируем в него `createAsyncThunk` из `@reduxjs/toolkit`
- импортируем из апи-сервиса все функции as api
- переносим сюда переменную `API_ENDPOINT` из `CitiesBlock`
- напишем операцию по get-запросу и put-запросу за городами:

  ```
  const getCities = createAsyncThunk('cities/getCitiesStatus', () =>
    api.getData(API_ENDPOINT));
  const editCity = createAsyncThunk('cities/editCityStatus', updatedCity =>
    api.editItem(API_ENDPOINT, updatedCity));
  ```

- таким же образом пишем 2 остальных операции: `addCity`, `removeCity`

2. Переписываем `Slice`

- мы хотим получить теперь более сложную структуру состояния редакса для
  `cities`:
  ```
  cities: {
    data: {
      items: [],
      loading: false,
      error: null,
    },
    filter: '',
  }
  ```
- поэтому `initialState` теперь будет выглядеть так:
  ```
  const initialState = {
    data: {
      items: [],
      loading: false,
      error: null,
    },
    filter: '',
  };
  ```
- импортим все `operations` в `citiesSlice.js`
- в `citiesSlice` теперь в поле `reducers` останется только `changeFilter`
- все асинхронные операции будем прописывать в поле
  [extraReducers](https://redux-toolkit.js.org/api/createSlice#the-extrareducers-builder-callback-notation)
- например, для `editCity` функции будут выглядеть так:
  ```
  .addCase(editCity.pending, state => {
    state.data.loading = true;
    state.data.error = null;
  })
  .addCase(editCity.fulfilled, (state, { payload }) => {
    state.data.loading = false;
    const idx = state.data.items.findIndex(({ id }) => id === payload.id);
    state.data.items[idx] = payload;
  })
  .addCase(editCity.rejected, (state, { error }) => {
    state.data.loading = false;
    state.data.error = error.message;
  })
  ```
- теперь импортим только один синхронный `action`:
  ```
  export const { changeFilter } = citiesSlice.actions;
  ```
- в файл с реєкспортами `index.js` добавим реэкспорт операций:
  ```
  export * as citiesOperations from './citiesOperations';
  ```

5. В `CitiesBlock` теперь используем все операции

- для начала получим все нужные состояния из редакса, для `cities` исправим
  путь, а `loading` и `error` добавим:
  ```
  const loading = useSelector(state => state.cities.data.loading);
  const error = useSelector(state => state.cities.data.error);
  ```
- в `useEffect` оставляем только вызовы операций и действия после, например:

  ```
  useEffect(() => dispatch(getCities()), [dispatch]);

  useEffect(() => {
    if (action !== ACTION.EDIT) return;

    dispatch(editCity(activeCity)).then(() => {
      setAction(ACTION.NONE);
      closeModal();
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch]);
  ```

- для этого в operations должен быть `return`, если они написаны не на
  `async/await`

### ЧИСТЫЙ РЕДАКС

### Задача № 4

Разбираем как подключать прослойки в чистом редаксе (будем использовать нашу
папку `redux_base`)

1. Подключим кастомный логгер

- из библиотеки
  [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm)
  импортируем метод composeWithDevTools вместо devToolsEnhancer
- а из redux дополнительно импортируем метод
  [applyMiddleware](https://redux.js.org/api/applymiddleware)
- теперь будем создавать наше хранилище так:

  ```
  const middleware = [];

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  ```

- разбираем кастомные логгеры в папке middleware
- импортируем их в наш store и записываем в массив middleware
- смотрим результат в консоли

2. Подключим прослойку для работы с асинхронным кодом из библиотеки
   [redux-thunk](https://github.com/reduxjs/redux-thunk#manual-setup)

- установим библиотеку и импортируем из нее thunk
- добавляем thunk в начало нашего массива middleware

### Задача № 5

Реализовать логику работы с бекендом для tutors, используя thunks (на чистом
редаксе)

1. Создаем thunk getTutors

- подключаемся к нашему основному store в index.js
- теперь наши actions должны диспатчиться только после асинхронной операции
  прямо в редаксе
- для создания thunks сделаем новый файл tutorsOperations.js
- напишем операцию по get-запросу за преподавателями:
  ```
  const getTutors = () => dispatch => {}
  ```
- для этого импортируем из апи-сервиса функцию getData
- переносим сюда переменную API_ENDPOINT из TutorsBlock
- импортим также setTutors из tutorsActions
- получаем данные с апи и диспатчим setTutors

2. Создаем actions для getTutors

- теперь actions у нас будут по 3 штуки на каждую асинхронную операцию
- например, для get-запроса по tutors это может выглядеть так:
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

3. Дописываем thunk getTutors

- импортируем их tutorsOperations и диспатчим в соответсвующих местах thunk:
  ```
  const getTutors = () => dispatch => {
    dispatch(getTutorsRequest());
    getData(API_ENDPOINT)
      .then(tutors => dispatch(getTutorsSuccess(tutors)))
      .catch(err => dispatch(getTutorsError(err.message)));
  };
  ```

4. Переписываем старый и добавляем новые редьюсеры

- мы хотим получить теперь более сложную структуру состояния для tutors:
  ```
  tutors: {
    items: [],
    loading: false,
    error: null
  }
  ```
- импортим все TYPES в tutorsReducer.js
- в itemsReducer теперь вместо TYPES.SET ожидаем TYPES.GET_SUCCESS
- добавляем еще два редьюсера - loadingReducer и errorReducer
- loadingReducer (по умолчанию false) обрабатывает все три типа, где только для
  TYPES.GET_REQUEST возвращает true:
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
- errorReducer (по умолчанию null) обрабатывает два действия, где для
  TYPES.GET_REQUEST возвращает null, а для TYPES.GET_ERROR - payload:
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
- импортим combineReducers и усложняем состояние для Tutors, объединяя все три
  редьюсера (items, loading, error)

5. В TutorsBlock теперь используем операцию getTutors в mapDispatchToProps,
   добавив новое поле onGetTutors

- в useEffect оставляем только вызов onGetTutors
- а состояния loading, error теперь получаем в mapStateToProps

6. Повторяем все предыдущие действия для операции addTutor

```
const addTutor = tutor => dispatch => {};
```
