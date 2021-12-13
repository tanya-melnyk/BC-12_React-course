# Модуль 4

## Занятие 7

## React-хуки часть 1

- Ответы на вопросы
- Кахут
- Теория:
  - useState
  - useEffect
  - [Рефы и useRef](https://blog.logrocket.com/a-guide-to-react-refs/)
  - Контекст и useContext

### Задача №1

useState - переписать весь стейт на хуки:

1. Sidebar (CardWithMenu)
2. AddForm (TutorForm)

### Задача №2

useEffect - переписать весь стейт и жизненные циклы на хуки:

1. TutorsBlock

- перепишем простой способ убрать утечку памяти в useEffect с addTutor:
  - вместо свойства класса isTutorsMounted, объявим такую же локальную
    переменную `let isTutorsMounted = true;` только в useEffect перед
    объявлением addTutor
  - в функции очистки useEffect меняем значение этой переменной на `false`
  - в функции `addTutor` после выполнения асинхронной операции, абсолютно все
    действия по изменению стейта делаем после проверки `if (isTutorsMounted)`
- перепишем способ с AbortController в useEffect в fetchTutors:

  - вместо свойств в классе объявим такие же локальные переменные только в
    useEffect перед объявлением fetchTutors:
    ```
    const controller = new AbortController();
    const signal = controller.signal;
    ```
  - в функции очистки useEffect прерываем запрос:
    ```
    controller.abort();
    ```
  - в GET-запросе передаем, кроме ендпоинта, объект `{ signal }`
  - после выполнения асинхронной операции, в `catch` и `finally` абсолютно все
    действия по изменению стейта делаем после проверки:
    ```
    if (!signal.aborted) {};
    ```

2. CitiesBlock

- асинхронность обновления стейта в асинхронном коде - в CitiesBlock в addCity в
  finally сначала очистить setActiveDepartment, а потом setAction
- TODO: реализуем сохранение значения фильтра CitiesBlock в localStorage, чтобы
  показать ленивую инициализацию в useState
- в CitiesBlock убрать лишнюю функцию handleFilterChange

### Задача №3

useRef:

1. EditCard (AddForm) при маунте получить фокус на инпут

- переписать EditCard на хуки
- для хранения inputId использовать useRef с начальным значением nanoid()
- для получения фокуса в теле EditCard создаем inputRef, используя хук с
  начальным значением null
- вешаем реф на инпут с привязкой к inputRef
- при маунте (в useEffect с пустым массивом зависимостей) вызываем метод focus
  на полученном элементе - inputRef.current.focus()

### Задача №3

useContext:

TODO:
