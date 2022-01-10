# Модуль 8

## Занятие 15

## Регистрация, логин и рефреш

- Ответы на вопросы
- Теория:
  - Знакомство с [JWT](https://jwt.io/)
  - Регистрация, логин и логаут пользователя
  - Персист токена с redux-persist
  - Рефреш пользователя по токену
  - Работа с приватными ресурсами пользователя
  - [Про токены, JSON Web Tokens (JWT), аутентификацию и авторизацию](https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc)

### Задача № 1

Переписать наш код с `mockapi` на [Firebase](https://firebase.google.com/)

- создадим проект на `Firebase` (google-аналитику отключаем)
- в разделе `realtime database` создадим базу данных
- выбираем Европу и тестовый режим
- копируем базовый урл и заменим на него наш старый `BASE_URL`
- в конце всех ендпоинтов должно быть `.json` (`${BASE_URL}/${path}.json`)
- чтобы все сразу не сломалось, добавим во всех редьюсерах запись в стейт пустой
  массив, если нет пейлоада (`payload || []`)
- добавим город и посмотрим, что приходит в ответе от апи
- сразу во всех `Operations` при `добавлении` изменим обработку ответов от
  `Firebase`, чтобы все работало как раньше:
  ```
  async newCity => {
    const data = await api.saveItem(API_ENDPOINT, newCity);
    return { id: data.name, ...newCity };
  }
  ```
- а для факультетов и преподавателей:
  ```
  const data = await api.saveItem(API_ENDPOINT, newDepartment);
  const savedDepartment = { id: data.name, ...newDepartment };
  dispatch(actions.addDepartmentFulfilled(savedDepartment));
  ```
- теперь посмотрим, что прилетает по `гет-запросу` и также во всех `Operations`
  при гет-запросах изменим обработку ответов от `Firebase` для `cities`:
  ```
  async () => {
    const data = await api.getData(API_ENDPOINT);
    return Object.keys(data || {}).map(id => ({ id, ...data[id] }));
  }
  ```
- а для факультетов и преподавателей:
  ```
  const data = await api.getData(API_ENDPOINT);
  const departments = Object.keys(data || {}).map(id => ({
    id,
    ...data[id],
  }));
  dispatch(actions.getDepartmentsFulfilled(departments));
  ```
- для редактирования ничего менять не нужно, а для удаления также изменим:
  ```
  async id => {
    await api.deleteItem(API_ENDPOINT, id);
    return { id };
  }
  ```
- а для факультетов:
  ```
  await api.deleteItem(API_ENDPOINT, idToDelete);
  dispatch(actions.deleteDepartmentFulfilled(idToDelete));
  ```

### Задача № 2

Добавить необходимый UI для реализации аутентификации

- в папку `pages` добавим две новых странички: `SignUpPage` и `SignInPage`, в
  каждой будет форма для регистрации или логина
- добавим 2 новых роута в `Main` для этих страниц
- в `Navigation` добавим два `NavItem` для этих страничек, а также кнопку
  `Sign Out`
- создадим компонент `UserInfo`, который будет показывать имя залогиненого
  пользователя
- зарендерим `UserInfo` в `Sidebar`

### Задача № 3

Создаем в папке `redux` папку `auth` со всеми файлами и базовыми настройками

- в папку `auth` добавим файлы `authOperations.js`, `authSlice.js`,
  `authSelectors.js` и `index.js`
- в файле `authOperations` будем реализовывать апи, используя `axios`
- импортируем сюда `axios` и `createAsyncThunk`
- создадим 4 операции: `signUp`, `signIn`, `signOut` и `getUser`, и экспортируем
  их
- в файле `authSlice` импортируем `createSlice` и все операции
- создадим слайс с начальным состоянием:
  ```
  const initialState = {
    user: { name: null, email: null },
    token: null,
    refreshToken: null,
    localId: null,
    loading: false,
    loadingUser: false,
    error: null,
  };
  ```
- экспортим `auth.reducer` и подключим его в `store` (токен будем хранить в
  локад-сторидже):
  ```
  const authPersistConfig = {
    key: 'token',
    storage,
    whitelist: ['token'],
  };
  const store = configureStore({
    reducer: {
      auth: persistReducer(authPersistConfig, authReducer),
      ...
    },
    ...
  });
  ```
- в файле `authSelectors` создадим 6 селекторов:
  `getUserName, getIsLoggedIn, getToken, getLoading, getLoadingUser, getError`,
  и экспортируем их
- в файле `index.js` реализуем реэкспорт:
  ```
  export * as authOperations from './authOperations';
  export * as authSelectors from './authSelectors';
  ```

### Задача № 4

Реализовать `redux`-логику для регистрации

1. Разбираемся с документацией `Firebase`:

- идем в документацию `Firebase`: [docs](https://firebase.google.com/docs) =>
  [reference](https://firebase.google.com/docs/reference) => `REST` (слева в
  Сайдбаре) =>
  [Authentication and User Management](https://firebase.google.com/docs/reference/rest/auth)
- справа находим раздел
  [Sign up with email / password](https://firebase.google.com/docs/reference/rest/auth?authuser=0#section-create-email-password)
- копируем `апи-линк` для запросов на апи для регистрации:
  ```
  https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  ```
- и смотрим, что нужно передавать при регистрации (от себя еще будем добавлять
  поле `displayName` с именем пользователя)
- на страничке нашего проекта в `Firebase` в Сайдбаре слева выбираем
  `Authentication`
- в провайдерах выбираем `Email/Password`
- `API` ключ получим в настройках на страничке нашего проекта в `Firebase`
- сохраним его в файл `.env` под названием `REACT_APP_FIREBASE_KEY`

2. Добавляем редакс-логику :

- пишем операцию `signUp` c колбеком:
  ```
  async credentials => {
    try {
      const body = { ...credentials, returnSecureToken: true };
      const { data } = await axios.post(`${BASE_URL}:signUp?key=${API_KEY}`, body );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  ```
- прописываем 3 кейса в `Slice`:
  ```
  builder
    .addCase(signUp.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(signUp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user.email = payload.email;
      state.user.name = payload.displayName;
      state.token = payload.idToken;
      state.refreshToken = payload.refreshToken;
      state.localId = payload.localId;
    })
    .addCase(signUp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
  ```
- в `SignUpPage` импортим `useDispatch` из `react-redux` и `authOperations` из
  `redux/auth`
- получаем `dispatch` и в `handleSubmit` диспатчим `authOperations.signUp` с
  данными юзера
- пробуем зарегистрироваться, проверяем `redux state`

3. Обрабатываем ошибку и загрузку:

- пробуем зарегистрироваться с неправильным имейлом и добавляем
  [обработку ошибки в операцию](https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors):
  ```
  async (credentials, thunkApi) => {
    try {
      ...
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.error.message);
    }
  },
  ```
- в `SignUpPage` импортим `useSelector` из `react-redux`, `authSelectors` из
  `redux/auth` и `{ toast }` из `react-toastify`
- получим из редакс-стейта `loading` и `error` для `auth`
- при `loading` будем дизейблить кнопку в форме
- за ошибкой будем следить в `useEffect` - если есть ошибка, показываем тост

### Задача № 5

Реализуем отображение залогиненого юзера

- в `Sidebar` будем показывать `UserInfo` только, если юзер залогинен
- для этого из редакса берем состояние `getIsLoggedIn`
- в `UserInfo` из редакса берем состояние `getUserName` и выводим его
- в `Navigation` будем показывать линки `Sign Up` и `Sign In` только если юзер
  не залогинен
- и наоборот - кнопку `Sign Out` будем показывать только залогиненым
  пользователям

### Задача № 6

Реализовать `redux`-логику для запроса информации о юзере

- в доках `Firebase` возьмем
  [инфу о запросе](https://firebase.google.com/docs/reference/rest/auth#section-get-account-info)
- в `authOperations` добавим операцию `getUser`:
  ```
  const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, { rejectWithValue, getState }) => {
      const persistedToken = getState().auth.token;
      if (!persistedToken) {
        return rejectWithValue();
      }
      try {
        const body = { idToken: persistedToken };
        const { data } = await axios.post(
          `${BASE_URL}:lookup?key=${API_KEY}`,
          body,
        );
        return data.users[0];
      } catch (error) {
        return rejectWithValue(error.response.data.error.status);
      }
    },
  );
  ```
- где-то на верхнем уровне, например, в `Main` будем делать запрос за юзером
- для этого в `useEffect` будем диспатчить `authOperations.getUser()`
- там же получим состояние `isLoadingUser` из редакса, и будем показывать
  лоадер, пока идет запрос за юзером:
  ```
  if (isLoadingUser) {
    return <Loader />;
  }
  ```

### Задача № 7

Реализовать `redux`-логику для логина юзера

1. Разбираемся с документацией `Firebase`:

- идем в документацию `Firebase`
  [Sign in with email / password](https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password)
- копируем апи-линк для запросов на апи для регистрации:
  ```
  https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  ```
- и смотрим, что нужно передавать при логине

2. Добавляем редакс-логику :

- пишем операцию `signIn` c колбеком:
  ```
  const signIn = createAsyncThunk(
    'auth/signIn',
    async (credentials, { rejectWithValue }) => {
      try {
        const body = { ...credentials, returnSecureToken: true };
        const { data } = await axios.post(
          `${BASE_URL}:signInWithPassword?key=${API_KEY}`,
          body,
        );
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data.error.message);
      }
    },
  );
  ```
- прописываем 3 кейса в `Slice`, таких же как и для `signUp`
- в `SignInPage` импортим `useDispatch` из `react-redux` и `authOperations` из
  `redux/auth`
- получаем `dispatch` и в `handleSubmit` диспатчим `authOperations.signIn` с
  данными юзера
- пробуем залогиниться, проверяем `redux state`

3. Обрабатываем ошибку и загрузку:

- пробуем зарегистрироваться с неправильным имейлом и добавляем
  [обработку ошибки в операцию](https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors):
  ```
  async (credentials, { rejectWithValue }) => {
    try {
      ...
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  },
  ```
- в `SignInPage` импортим `useSelector` из `react-redux`, `authSelectors` из
  `redux/auth` и `{ toast }` из `react-toastify`
- получим из редакс-стейта `loading` и `error` для `auth`
- при `loading` будем дизейблить кнопку в форме
- за ошибкой будем следить в `useEffect` - если есть ошибка, показываем тост

### Задача № 8

Реализовать redux-логику для логаута юзера

1. Добавляем редакс-логику:

- в `authSlice` добавим редьюсер `signOut` и экспортируем действие:
  ```
  reducers: {
    signOut: () => initialState,
  },
  ...
  export const { signOut } = authSlice.actions;
  ```
- добавим реэкспорт в `index.js`:
  ```
  export { signOut } from './authSlice';
  ```
- в `Navigation` импортим экшн `signOut` из `redux/auth` и `useDispatch` из
  `react-redux`
- получаем `dispatch` и в `handleSignOut` диспатчим `signOut`
- пробуем разлогиниться, проверяем `redux state`

### Задача № 8

При запросе за городами и преподавателями будем получать только те данные,
которые добавил авторизованный юзер

- теперь в `citiesOperations` и `tutorsOperations` во все запросы по городам
  будем добавлять `localId`:
  ```
  const getCities = createAsyncThunk(
    'cities/getCitiesStatus',
    async (_, thunkApi) => {
      const { localId } = thunkApi.getState().auth;
      const data = await api.getData(`${localId}/${API_ENDPOINT}`);
      return Object.keys(data || {}).map(id => ({ id, ...data[id] }));
    },
  );
  const getTutors = () => async (dispatch, getState) => {
    dispatch(getTutorsRequest());
    try {
      const { localId } = getState().auth;
      const data = await getData(`${localId}/${API_ENDPOINT}`);
      const tutors = Object.keys(data || {}).map(id => ({ id, ...data[id] }));
      dispatch(getTutorsSuccess(tutors));
    } catch (error) {
      dispatch(getTutorsError(error.message));
    }
  };
  ```
- чтобы увидеть результат `гет-запроса` перейдем на страничку факультетов и
  назад на университет

### Задача № 9

Реализуем рефреш токена, если его действие закончилось

- будем в локал сторидже хранить также `refreshToken`:
  ```
  const authPersistConfig = {
    key: 'token',
    storage,
    whitelist: ['token', 'refreshToken'],
  };
  ```
- при запросе за юзером, будем проверять тип ошибки, и если она будет равна
  `'INVALID_ID_TOKEN'`, то будем делать
  [рефреш](https://firebase.google.com/docs/reference/rest/auth#section-refresh-token)
- для этого добавим новую операцию `refreshToken`:
  ```
  const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue, getState, dispatch }) => {
      const persistedRefreshToken = getState().auth.refreshToken;
      if (!persistedRefreshToken) {
        return rejectWithValue();
      }
      try {
        const body = {
          grant_type: 'refresh_token',
          refresh_token: persistedRefreshToken,
        };
        const { data } = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
          body,
        );
        dispatch(getUser(data.id_token));
        return data;
      } catch (error) {
        const errMsg = error.response.data.error.message;
        return rejectWithValue(errMsg);
      }
    },
  );
  ```
- и немного изменим операцию `getUser`:
  ```
  const getUser = createAsyncThunk(
    'auth/getUser',
    async (token, { rejectWithValue, getState, dispatch }) => {
      const persistedToken = token ?? getState().auth.token;
      if (!persistedToken) {
        return rejectWithValue();
      }
      try {
        const body = { idToken: persistedToken };
        const { data } = await axios.post(
          `${BASE_URL}:lookup?key=${API_KEY}`,
          body,
        );
        return data.users[0];
      } catch (error) {
        const errMsg = error.response.data.error.message;
        if (errMsg === 'INVALID_ID_TOKEN') {
          dispatch(refreshToken());
        }
        return rejectWithValue(errMsg);
      }
    },
  );
  ```

### Отличия в ДЗ

Redux Auth Operations

- отправка токена в заголовке `Authorization`:
  ```
  const token = {
    set(token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
      axios.defaults.headers.common.Authorization = '';
    },
  };
  ```
- устанавливаем токен при `signUp` или `signIn`:
  ```
  token.set(data.token);
  ```
- удаляем при `signOut`:
  ```
  token.unset();
  ```
- а при запросе за юзером в `getUser`, также уставливаем, если нашли сохраненный
  токен:
  ```
  token.set(persistedToken);
  ```
- `signOut` будет обычной асинхронной операцией
