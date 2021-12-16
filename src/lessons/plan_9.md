# Модуль 5

## Занятие 9

## Навигация

- Ответы на вопросы
- Кахут
- Теория:
  - Концепция SPA (Single Page Application) и CSR (Client Side Rendering)
  - Структура url-строки и HTML5 History API
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

Добавить роутинг в сайдбар и возможность переключения на страницу `Факультетов`

1. Подключаем [BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter):

- устанавливаем
  [react-router-dom@5](https://reactrouter.com/docs/en/v6/getting-started/installation#basic-installation)
- из него в `index.js` импортируем `BrowserRouter` и оборачиваем им наш `Арр`

2. Определяем место для `Routes`, а также, какие адреса и странички нам
   понадобятся:

- определяем `Main`, как место, где у нас будет реализован `routing`
- в него импортим [Switch](https://v5.reactrouter.com/web/api/Switch) и
  [Route](https://v5.reactrouter.com/web/api/Route) из `react-router-dom`
- подключаем `Switch`, а внутри два `Route`
- по первому `Route` c `path='/'` рендерим заголовок "Факультеты"
- по второму c `path="/university"` - все, что есть сейчас в `Main`
- смотрим на страничку и разбираемся, почему по любому адресу выдается заголовок
  "Факультеты"
- добавляем на первый `Route` проп `exact`
- теперь используем готовые странички `DepartmentsListPage` и `UniversityPage` в
  `Routes`

3. Создаем навигацию:

- в `Navigation` передаем нашим `NavItem` доп. проп `path` с такими же путями,
  как мы передавали в `Routes`
- в `NavItem` принимаем проп, а вместо тега `а` теперь рендерим
  [NavLink](https://v5.reactrouter.com/web/api/NavLink) (рассматриваем разницу с
  [Link](https://v5.reactrouter.com/web/api/Link))
- в проп `to` передаем наш проп `path`, а в `className` старые классы
- используем
  [activeClassName](https://v5.reactrouter.com/web/api/NavLink/activeclassname-string)
  с классом `"NavItemActive"`
- чтобы оба линка не были активными по пути `"/"`, добавляем на `NavLink` проп
  `exact`

### Задача № 2

Добавить индивидуальный роутинг - при клике на название факультета переводить на
страницу одного факультета

1. Создаем вложженные ссылки:

- в `DepartmentsListPage` при рендере массива факультетов оборачиваем каждую
  `Paper` в `Link`, чтобы теперь нажимая на название факультета, мы могли
  переходить на его страницу
- в проп `to` пока будем передавать адреса `"/id"`

2. Используем [Redirect](https://v5.reactrouter.com/web/api/Redirect) для
   получения `"/departments"` в адресной строке, если зашли по `"/"`:

- проверяем как работают ссылочки
- чтобы путь выглядел красиво, а не просто `"/id"`, в `Main` добавим первым
  новый [Route](https://v5.reactrouter.com/web/api/Route/route-render-methods) c
  редиректом с главной страницы сразу на `"/departments"`
  ```
  <Route exact path="/" render={() => <Redirect to="/departments" />} />
  ```
- а в `Route`, который рендерил `DepartmentsListPage` поставим путь
  `"/departments"`
- также и в Navigation изменим проп первой NavItem на `"/departments"`
- тогда в `DepartmentsListPage` будем создавать вложенные пути сразу красиво:
  `/departments/${id}`

3. Используем
   [useRouteMatch](https://v5.reactrouter.com/web/api/Hooks/useroutematch) для
   автоматического определения начала пути:

- импортируем хук, вызываем его, записывам полученный объект в переменную
- теперь свойство `url` этого объекта будем использовать в `Link` для
  подстановки пути: `to={`${match.url}/${id}`}`

4. Отрисовываем страничку одного факультета

- для этого в `Main` добавляем еще один `Route`, который будет вести на
  `"/departments/:id"` и рендерить `DepartmentPage`
- в `DepartmentPage` определяем `id` факультета с помощью
  [useParams](https://v5.reactrouter.com/web/api/Hooks/useparams)
- используем это `id` для запроса информации о факультете
- после получения данных передаем в `title` `Header` имя факультета

### Задача № 3

Добавить вложенный роутинг на странице факультета при клике на табы на странице

1. Создаем роутинг на страничке `DepartmentPage`

- под `nav` создаем еще один `Switch` с двумя `Route`
- первый будет вести на '`/departments/:id/description'` и рендерить описание
  ```
  <Paper>
    <p className={s.text}>lorem50</p>
  </Paper>
  ```
- второй будет вести на `'/departments/:id/history'` и также рендерить историю

2. Тут же создаем навигацию по вложенным роутам:

- внутри `nav` вместо тегов а добавляем два `NavLink`, каждый из них должен
  вести на соотвествующую страничку с `id` факультета
  (`/departments/${id}/description`)
- для того, чтобы не писать везде вручную начало пути `/departments/:id` или
  `/departments/${id}` будем использовать `useRouteMatch` и свойства `url` и
  `path`
- `url` подставим в `NavLink`, а `path` в `Route`

### Задача № 4

Добавить кнопку `"Назад ко всем факультетам"` на страничку `DepartmentPage`

1. Для начала используем
   [useHistory](https://v5.reactrouter.com/web/api/history), чтобы просто
   возвращаться на 1 шаг назад в истории

- получаем объект `history` из хука `useHistory`
- в обработчике клика по кнопке `handleGoBack` вызываем метод `goBack`

2. Сделаем так, чтобы мы всегда возвращались на ту страничку, с которой пришли
   (либо к факультетам, либо к университету)

- в `CardWithMenu` раскоментируем линки
- в `DepartmentsListPage` в `Link` будем не просто передавать строку в проп
  `to`, а [объект](https://v5.reactrouter.com/web/api/Link/to-object) с полями
  `pathname` и `state`
- теперь в `state` мы можем передать объект с доп. информацией откуда мы пришли
- будем передавать два поля `label` и `from`
- в `label` укажем будущий текст на кнопке возврата, например,
  `'Назад ко всем факультетам'`
- в `from` нужно указать наше текущее местоположение - `location`
- получим его из хука [useLocation](https://v5.reactrouter.com/web/api/location)
- теперь в `DepartmentPage` также получаем `location` из `useLocation`
- для начала в обработчике клика по кнопке возврата будем использовать метод
  `push` вместо `goBack`
- пушить будем туда, откуда пришли, а то есть `location.state.from`
- текст на кнопке подставим - `location.state.label`

3. Делаем так, чтобы информация не терялась при переходе по внутренней навигации

- для этого в `DepartmentPage` в `NavLink` также будем объект с полями
  `pathname` и `state`
- только теперь в `state.from` будем прокидывать ту локацию, откуда мы пришли
  изначально, т.е. `location.state.from`
- в `label` - переданный нам текст `location.state.label`
- проверяем, как работает при переходе из университета

4. Делаем так, чтобы все не ломалось при открытии вкладки с вложенным путем в
   новом окне

- для этого в `DepartmentPage` в `handleGoBack`, в `BigButton` и в `NavLink` для
  начала проверяем наличие поля `state` в объектах (`?.`)
- потом добавляем запасной путь по умолчанию в `handleGoBack` - `"/departments"`
- и добавляем запасной текст на кнопку - `'Назад ко всем факультетам'`

### Задача № 5

Обработка неправильных путей

1. Основные пути:

- в `Main` в конце `Switch` добавим `Route` без пропа `path`, который будет
  рендерить `NotFoundPage`

2. Неверный `id` на страничке одного факультета

- при запросе на АПИ за факультетом по `id`, можно в `catch` переводить на
  страничку всех факультетов с помощью `history.replace('/departments')`
- тут же можно добавить тост с сообщением `'Факультет не найден'`

3. Неверный вложенный путь:

- сделаем так, чтобы при переходе на страничку одного факультета, мы видели
  сразу `Описание`
- для этого в первом `Route` в `DepartmentPage` добавим проп `exact`, а в проп
  `path` передадим массив из двух путей - `[path, ${path}/description]`
- а в конце `Switch` добавим `Redirect` на `url` (`to={url}`)
- теперь пофиксим отображение активной вкладки `Описание`
- в первом `NavLink` используем проп `isActive`, чтобы определить, что линк
  активный:
  ```
  isActive={(match, location) => {
    return match?.isExact || location.pathname === url;
  }}
  ```
- чтобы было легче перейти на версию 6, заменим классический редирект
  `<Redirect to={url} />` на `Route`:
  ```
  <Route render={() => <Redirect to={url} />} />
  ```

### ДЗ

- как при возврате на страничку с поиском фильма сохранить поисковое слово и
  результаты поиска?
