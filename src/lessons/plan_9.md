# Модуль 5

## Занятие 9

## Навигация

- Ответы на вопросы
- Кахут
- Теория:
  - Концепция SPA (Single Page Application) и CSR (Client Side Rendering)
  - Структура url-строки и HTML5 History API
  - Типы истории: browserHistory и memoryHistory
  - Компоненты
    [BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter),
    [Route](https://v5.reactrouter.com/web/api/Route),
    [Switch](https://v5.reactrouter.com/web/api/Switch)
  - Обработка 404 c Redirect
  - Компоненты [Link](https://v5.reactrouter.com/web/api/Link) и
    [NavLink](https://v5.reactrouter.com/web/api/NavLink)
  - [Хуки](https://v5.reactrouter.com/web/api/Hooks) useParams, useLocation,
    useHistory, useRouteMatch
  - Вложенные маршруты и навигация
  - Динамические URL-параметры
  - Параметры адресной строки c useLocation
  - Программная навигация с useHistory
  - [Инструкция по переходу на v6 в react-router-dom](https://reactrouter.com/docs/en/v6/upgrading/v5)

### Задача № 1

Добавить роутинг в сайдбар и возможность переключения на страницу Факультетов

1. Подключаем [BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter):

- устанавливаем
  [react-router-dom@5](https://reactrouter.com/docs/en/v6/getting-started/installation#basic-installation)
- из него в index.js импортируем BrowserRouter и оборачиваем им наш Арр

2. Определяем место для Routes, а также, какие адреса и странички нам
   понадобятся:

- определяем Main, как место, где у нас будет реализован routing
- в него импортим [Switch](https://v5.reactrouter.com/web/api/Switch) и
  [Route](https://v5.reactrouter.com/web/api/Route) из react-router-dom
- подключаем Switch, а внутри два Route
- по первому Route c path='/' рендерим заголовок "Факультеты"
- по второму c path="/university" - все, что есть сейчас в Main
- смотрим на страничку и разбираемся, почему по любому адресу выдается заголовок
  "Факультеты"
- добавляем на первый Route проп exact
- теперь используем готовые странички DepartmentsListPage и UniversityPage в
  Routes

3. Создаем навигацию:

- в Navigation передаем нашим NavItem доп. проп path с такими же путями, как мы
  передавали в Routes
- в NavItem принимаем проп, а вместо тега а теперь рендерим
  [NavLink](https://v5.reactrouter.com/web/api/NavLink) (рассматриваем разницу с
  [Link](https://v5.reactrouter.com/web/api/Link))
- в проп to передаем наш проп path, а в className старые классы
- используем
  [activeClassName](https://v5.reactrouter.com/web/api/NavLink/activeclassname-string)
  с классом "NavItemActive"
- чтобы оба линка не были активными по пути "/", добавляем на NavLink проп exact

### Задача № 2

Добавить индивидуальный роутинг - при клике на название факультета переводить на
страницу одного факультета

1. Создаем вложженные ссылки:

- в DepartmentsListPage при рендере массива факультетов оборачиваем каждую Paper
  в Link, чтобы теперь нажимая на название факультета, мы могли переходить на
  его страницу
- в проп to пока будем передавать адреса "/id"

2. Используем [Redirect](https://v5.reactrouter.com/web/api/Redirect) для
   получения "/departments" в адресной строке, если зашли по "/":

- проверяем как работают ссылочки
- чтобы путь выглядел красиво, а не просто "/id", в Main добавим первым новый
  [Route](https://v5.reactrouter.com/web/api/Route/route-render-methods) c
  редиректом с главной страницы сразу на "/departments"
  ```
  <Route exact path="/" render={() => <Redirect to="/departments" />} />
  ```
- а в Route, который рендерил DepartmentsListPage поставим путь "/departments"
- также и в Navigation изменим проп первой NavItem на "/departments"
- тогда в DepartmentsListPage будем создавать вложенные пути сразу красиво:
  `/departments/${id}`

3. Используем
   [useRouteMatch](https://v5.reactrouter.com/web/api/Hooks/useroutematch) для
   автоматического определения начала пути:

- импортируем хук, вызываем его, записывам полученный объект в переменную
- теперь свойство url этого объекта будем использовать в Link для подстановки
  пути: `to={`${match.url}/${id}`}`

4. Отрисовываем страничку одного факультета

- для этого в Main добавляем еще один Route, который будет вести на
  "/departments/:id" и рендерить DepartmentPage
- в DepartmentPage определяем id факультета с помощью
  [useParams](https://v5.reactrouter.com/web/api/Hooks/useparams)
- используем это id для запроса информации о факультете
- после получения данных передаем в title Header имя факультета

### Задача № 3

Добавить вложенный роутинг на странице факультета при клике на табы на странице

1. Создаем роутинг на страничке DepartmentPage

- под nav создаем еще один Switch с двумя Route
- первый будет вести на '/departments/:id/description' и рендерить описание
  ```
  <Paper>
    <p className={s.text}>lorem50</p>
  </Paper>
  ```
- второй будет вести на '/departments/:id/history' и также рендерить историю

2. Тут же создаем навигацию по вложенным роутам:

- внутри nav вместо тегов а добавляем два NavLink, каждый из них должен вести на
  соотвествующую страничку с id факультета (`/departments/${id}/description`)
- для того, чтобы не писать везде вручную начало пути /departments/:id или
  /departments/${id} будем использовать useRouteMatch и свойства url и path
- url подставим в NavLink, а path в Route

### Задача № 4

Добавить кнопку "Назад ко всем факультетам" на страничку DepartmentPage

1.

- Почистить: index.js, Main, Navigation, NavItem, DepartmentPage,
  DepartmentsListPage
