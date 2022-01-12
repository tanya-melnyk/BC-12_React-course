# Модуль 8

## Занятие 16

## Приватные и публичные маршруты

- Ответы на вопросы
- Теория:
  - Редиректы при авторизации
  - Приватные и ограниченные маршруты
  - Пишем компоненты RequireAuthRoute и RequireNotAuthRoute
  - [Composing <Route> in React Router v6](https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f)
  - [Продвинутые редиректы с использованием location.state](https://fatmali.medium.com/use-context-and-custom-hooks-to-share-user-state-across-your-react-app-ad7476baaf32)

### Задача № 1

Вынесем основную маршрутизацию в отдельный компонент

- создадим отдельный компонент Routes.jsx в папке routes
- перенесем туда всю маршрутизацию и получение данных юзера из Main, а в Main
  подключим компонент Routes
- для более легкого перехода на React Router v6 перепишем наши роуты с:
  ```
  <Route path="/sign-in">
    <SignInPage />
  </Route>
  ```
  на:
  ```
  <Route path="/sign-in" render={() => <SignInPage />}/>
  ```

### Задача № 2

Реализовать приватные и ограниченные маршруты и редиректы при авторизации

- разделяем роуты на 3 категории: публичные, только для авторизованных
  пользователей (приватные), только для неавторизованных (ограниченные)
- в Routes получим доступ к редакс-состоянию isLoggedIn
- теперь для приватных путей будем редиректить их, если юзер незалогинен:
  ```
  <Route
    path="/university"
    render={() =>
      isLoggedIn ? <UniversityPage /> : <Redirect to="/sign-in" />
    }
  />
  ```
- и наоборот - для ограниченных путей будем редиректить их, если юзер залогинен:
  ```
  <Route
    path="/sign-up"
    render={() =>
      isLoggedIn ? <Redirect to="/university" /> : <SignUpPage />
    }
  />
  ```
- в Navigation линк на страницу университета будем показывать только для
  залогиненого пользователя

### Задача № 3

Пишем компоненты RequireAuthRoute и RequireNotAuthRoute

- для приватных и ограниченных роутов делаем компоненты обертки, которые будут
  определять залогинен пользователь или нет, и соответственно будут рендерить
  или children или Redirect
- компоненты будут ожидать проп redirectTo с путем, куда нужно перенаправлять:
  ```
  const RequireAuthRoute = ({ children, redirectTo }) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
    return isLoggedIn ? children : <Redirect to={redirectTo} />;
  };
  ```
- теперь в Routes импортируем эти компоненты и обернем в них наши приватные и
  ограниченные маршруты, например:
  ```
  <Route
    path="/university"
    render={() => (
      <RequireAuthRoute redirectTo="/sign-in">
        <UniversityPage />
      </RequireAuthRoute>
    )}
  />
  ```

### Задача № 4

Вынести все роуты и ленивые импорты компонентов в отдельный файл

- в папке routes создадим файл index.js
- перенесем сюда все ленивые импорты компонентов из Routes, кроме NotFoundPage,
  которую можно импортить обычным способом в Routes
- теперь для каждого раута ('/departments', '/departments/:id', '/university',
  '/sign-up', '/sign-in') создадим объект с 3-мя обязательными свойствами (path,
  exact, component) и 1-м необязательным (redirectTo), например:
  ```
  const departmentRoute = {
    path: '/departments/:id',
    exact: false,
    component: DepartmentPage,
  };
  const singUpRoute = {
    path: '/sign-up',
    exact: true,
    component: SignUpPage,
    redirectTo: '/university',
  };
  ```
- в конце сгруппируем все объекты в соответсвующие массивы:
  ```
  export const publicRoutes = [departmentsListRoute, departmentRoute];
  export const authRoutes = [universityRoute];
  export const notAuthRoutes = [singInRoute, singUpRoute];
  const allRoutes = [...authRoutes, ...publicRoutes, ...notAuthRoutes];
  export default allRoutes;
  ```
- теперь будем импортить в Routes все массивы и рендерить их с помощью map:
  ```
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/departments" />} />
    {publicRoutes.map(({ path, exact, component: Component }, index) => (
      <Route key={index} path={path} exact={exact}>
        <Component />
      </Route>
    ))}
    {authRoutes.map(
      ({ path, exact, component: Component, redirectTo }, index) => (
        <Route
          key={index}
          path={path}
          exact={exact}
          render={() => (
            <RequireAuthRoute redirectTo={redirectTo}>
              <Component />
            </RequireAuthRoute>
          )}
        />
      ),
    )}
    {notAuthRoutes.map(
      ({ path, exact, component: Component, redirectTo }, index) => (
        <Route
          key={index}
          path={path}
          exact={exact}
          render={() => (
            <RequireNotAuthRoute redirectTo={redirectTo}>
              <Component />
            </RequireNotAuthRoute>
          )}
        />
      ),
    )}
    <Route component={NotFound} />
  </Switch>
  ```

### Задача № 5

Реализовать
[продвинутые редиректы с использованием location.state](https://fatmali.medium.com/use-context-and-custom-hooks-to-share-user-state-across-your-react-app-ad7476baaf32)

- будем определять, куда перенаправлять юзера при логине/регистрации в
  зависимости от того, откуда юзер пришел
- для этого в Navigation в ссылки, который ведут на странички авторизации будем
  передавать объект с текущим location:
  ```
  <NavItem
    name="Sign In"
    path={{
      pathname: '/sign-in',
      state: { from: location },
    }}
  />
  ```
- тогда на страничках SignInPage и SignUpPage будем импортировать useHistory и
  useLocation, и после авторизации отправлять юзера на страничку, с которой он
  пришел:
  ```
  dispatch(authOperations.signIn({ email, password }))
    .then(() => history.push(location.state?.from ?? '/university'));
  ```

### Задача № 6

[Переходим на реакт-роутер 6](https://reactrouter.com/docs/en/v6/upgrading/v5)

- обновляем библиотеку
- меняем Switch на Routes
- прописываем в путях, где может быть продолжение `/*`:
  ```
  path="departments/:id/*"
  ```
- все exact удаляем
- во вложенных маршрутах все относительные пути прописываем без определения
  начала и в Links, и в Routes:
  ```
  // to={`${match.url}/history`}
  to='history'
  // path={`${match.path}/history`}
  path="history"
  // path={[match.path, `${match.path}/description`]}
  path="description"
  ```
- комментируем все useRouteMatch, useHistory, Redirect и activeClassName на
  линках
- заменить импорт useRouteMatch на useMatch
- заменяем все Redirect на Navigate:
  ```
  // <Route path="/" render={() => <Redirect to="/departments" />} />
  <Route path="/" element={<Navigate replace to="departments" />} />
  // <Route render={() => <Redirect to={match.url} />} />
  <Route path=":unknown" element={<Navigate replace to=".." />} />
  ```
- универсальному руту разадаем путь:
  ```
  // <Route render={() => <NotFoundPage />} />
  <Route path="*" element={<NotFoundPage />} />
  ```
- заменяем activeClassName на className с функцией:
  ```
  // className={navItenStyles.join(' ')}
  // activeClassName="NavItemActive"
  className={({ isActive }) =>
    navItenStyles.join(' ') + (isActive ? ' NavItemActive' : '')
  }
  // className={s.link}
  // activeClassName={s.activeLink}
  className={({ isActive }) =>
    s.link + (isActive ? ` ${s.activeLink}` : '')
  }
  ```
- вместо useHistory используем useNavigate:
  ```
  // const history = useHistory();
  const navigate = useNavigate();
  // history.replace('/departments');
  navigate('/departments', { replace: true });
  // history.push(location.state?.from ?? '/departments');
  navigate(location.state?.from ?? '/departments');
  // history.goBack();
  navigate(-1);
  ```
- все render пропы в Route меняем на element
- переносим все вложенные маршруты в один файл:
  ```
  <Route path="departments/:id" element={<DepartmentPage />}>
    <Route index element={<Paper><p>Description</p></Paper>}/>
    <Route path="description" element={<Paper><p>Description</p></Paper>}/>
    <Route path="history" element={<Paper><p>History</p></Paper>}/>
  </Route>
  ```
- а в компоненте, где до этого были вложенные роуты, рендерим `<Outlet />`
- заменим объекты в Link в пропе to на два пропа:
  ```
  // to={{
  //   pathname: id,
  //   state: {
  //     from: location,
  //     label: 'Назад ко всем факультетам',
  //   },
  // }}
  to={id}
  state={{ from: location, label: 'Назад ко всем факультетам' }}
  ```
- для определения активного стиле на линке:
  ```
  className={({ isActive }) =>
    s.link +
    (isActive || location.pathname === `/departments/${params.id}`
      ? ` ${s.activeLink}`
      : '')
  }
  ```
