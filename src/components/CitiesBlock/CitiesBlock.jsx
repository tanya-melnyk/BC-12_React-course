import { Component } from 'react';
import PropTypes from 'prop-types';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import Filter from '../common/Filter/Filter';
import ItemsList from '../ItemsList/ItemsList';
import Modal from '../common/Modal/Modal';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

/**
  Использовать модалку для удаление города, которая появляется при клике на "Удалить":
  - в CitiesBlock добавляем состояние isDeleteModalOpen и activeCity
  - пишем метод handleStartDeleting(activeCity), который устанавливает активный город и открывает модалку для удаления
  - пишем метод deleteCity(), который удаляет из массива имя активного города и очищает поле activeCity, а также вызывает метод closeDeleteModal
  - написать метод по закрытию модалки для удаления closeDeleteModal
  - рендерим модальное окно по состоянию поля isDeleteModalOpen

  Использовать модалку для редактирования города, которая появляется при клике на "Редактировать":
  - в CitiesBlock добавляем состояние isEditModalOpen
  - пишем метод handleStartEditting(activeCity), который устанавливает активный город и
    открывает модалку для редактирования
  - пишем метод saveEditedCity(editedCity), который изменяет в массиве имя активного
    города и очищает поле activeCity, а также вызывает метод closeEditModal
  - написать метод по закрытию модалки для редактирования closeEditModal
  - рендерим модальное окно по состоянию поля isEditModalOpen

  Добавить фильтр для городов
  - используем универсальный компонет Filter, который ожидает значение инпута и метод для обработки его изменения
  - в CitiesBlock добавляем состояние filter
  - пишем метод handleFilterChange(value), который изменяет значение поля filter в стейте
  - пишем метод getFilteredCities, который возвращает массив отфильтрованных городов в зависимости от значения фильтра
  - именно отфильтрованный массив будем передавать в пропе items в ItemsList
  
  Недопустить дублирование городов при добавлении или редактировании
 */

class CitiesBlock extends Component {
  state = {
    cities: this.props.cities,
    isAddFormOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    activeCity: '',
    filter: '',
  };

  // ADD CITY

  toggleAddForm = () =>
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));
  addCity = city => {
    const newCity = { name: city };
    this.setState(prevState => ({
      cities: [...prevState.cities, newCity],
      isAddFormOpen: false,
    }));
  };

  // EDIT CITY

  handleStartEditting = activeCity =>
    this.setState({
      isEditModalOpen: true,
      activeCity,
    });
  saveEditedCity = editedCity => {
    this.setState(prevState => ({
      cities: prevState.cities.map(city => {
        if (city.name === prevState.activeCity) {
          return { ...city, name: editedCity };
        }
        return city;
      }),
      activeCity: '',
    }));
    this.closeEditModal();
  };
  closeEditModal = () =>
    this.setState({
      isEditModalOpen: false,
    });

  // DELETE CITY

  handleStartDeleting = activeCity =>
    this.setState({
      isDeleteModalOpen: true,
      activeCity,
    });

  deleteCity = () => {
    this.setState(prevState => ({
      cities: prevState.cities.filter(
        ({ name }) => name !== prevState.activeCity,
      ),
      activeCity: '',
    }));
    this.closeDeleteModal();
  };
  closeDeleteModal = () => this.setState({ isDeleteModalOpen: false });

  // FILTER CITIES

  handleFilterChange = value => this.setState({ filter: value });
  getFilteredCities = () => {
    const { cities, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const {
      isAddFormOpen,
      isDeleteModalOpen,
      isEditModalOpen,
      activeCity,
      filter,
    } = this.state;

    const filteredCities = this.getFilteredCities();

    return (
      <>
        <Filter
          label="Поиск города:"
          value={filter}
          onFilterChange={this.handleFilterChange}
        />

        <ItemsList
          items={filteredCities}
          // items={this.getFilteredCities()}
          onEditItem={this.handleStartEditting}
          onDeleteItem={this.handleStartDeleting}
        />

        {isAddFormOpen && (
          <AddForm
            onSubmit={this.addCity}
            formName="Добавление города"
            placeholder="Город"
          />
        )}

        <BigButton
          text={isAddFormOpen ? 'Отменить добавление' : 'Добавить город'}
          icon={!isAddFormOpen && addIcon}
          onClick={this.toggleAddForm}
        />

        {isEditModalOpen && (
          <Modal
            title="Редактировать информацию о городе"
            onClose={this.closeEditModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Город"
              inputValue={activeCity}
              onSave={this.saveEditedCity}
            />
          </Modal>
        )}

        {isDeleteModalOpen && (
          <Modal
            title="Удаление города"
            onClose={this.closeDeleteModal}
            icon={fingerIcon}
          >
            <DeleteCard
              text="Будут удалены все материалы и информация о городе."
              onDelete={this.deleteCity}
              onClose={this.closeDeleteModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

CitiesBlock.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesBlock;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// class CitiesBlock extends Component {
//   // constructor(props) {
//   //   super(props);

//   //   this.state = {
//   //     cities: this.props.cities,
//   //     filter: '',
//   //     isAddFormOpen: false,
//   //     activeCity: '',
//   //     isEditModalOpen: false,
//   //     isDeleteModalOpen: false,
//   //   };
//   // }

//   state = {
//     cities: this.props.cities,
//     filter: '',
//     isAddFormOpen: false,
//     activeCity: '',
//     isEditModalOpen: false,
//     isDeleteModalOpen: false,
//   };

//   handleFilterChange = value => this.setState({ filter: value });

//   toggleAddForm = () =>
//     this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));

//   addCity = city => {
//     const newCity = { name: city };
//     this.setState(prevState => ({
//       cities: [...prevState.cities, newCity],
//       isAddFormOpen: false,
//     }));
//   };

//   handleEditCity = activeCity =>
//     this.setState({
//       activeCity,
//       isEditModalOpen: true,
//     });

//   editCity = changedCity => {
//     const { activeCity } = this.state;
//     this.setState(prevState => ({
//       activeCity: '',
//       cities: prevState.cities.map(city =>
//         city.name === activeCity ? { name: changedCity } : city,
//       ),
//     }));
//     this.closeEditModal();
//   };

//   closeEditModal = () =>
//     this.setState({
//       isEditModalOpen: false,
//     });

//   handleDeleteCity = activeCity =>
//     this.setState({
//       activeCity,
//       isDeleteModalOpen: true,
//     });

//   deleteCity = () => {
//     const { activeCity } = this.state;

//     this.setState(prevState => ({
//       activeCity: '',
//       cities: prevState.cities.filter(city => city.name !== activeCity),
//     }));
//     this.closeDeleteModal();
//   };

//   closeDeleteModal = () =>
//     this.setState({
//       isDeleteModalOpen: false,
//     });

//   getFilteredCities = () => {
//     const { cities, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return cities.filter(({ name }) =>
//       name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   render() {
//     const {
//       filter,
//       isAddFormOpen,
//       activeCity,
//       isEditModalOpen,
//       isDeleteModalOpen,
//     } = this.state;

//     return (
//       <>
//         <Filter
//           label="Поиск города:"
//           value={filter}
//           onFilterChange={this.handleFilterChange}
//         />

//         <ItemsList
//           items={this.getFilteredCities()}
//           onEditItem={this.handleEditCity}
//           onDeleteItem={this.handleDeleteCity}
//         />

//         {isAddFormOpen && (
//           <AddForm
//             onSubmit={this.addCity}
//             formName="Добавление города"
//             placeholder="Город"
//           />
//         )}

//         <BigButton
//           text={isAddFormOpen ? 'Отменить добавление' : 'Добавить город'}
//           icon={!isAddFormOpen && addIcon}
//           onClick={this.toggleAddForm}
//         />

//         {isEditModalOpen && (
//           <Modal
//             title="Редактировать информацию о городе"
//             onClose={this.closeEditModal}
//             icon={pencilIcon}
//           >
//             <EditCard
//               label="Город"
//               inputValue={activeCity}
//               onSave={this.editCity}
//             />
//           </Modal>
//         )}

//         {isDeleteModalOpen && (
//           <Modal
//             title="Удаление города"
//             onClose={this.closeDeleteModal}
//             icon={fingerIcon}
//           >
//             <DeleteCard
//               text="Будут удалены все материалы и информация о городе."
//               onDelete={this.deleteCity}
//               onClose={this.closeDeleteModal}
//             />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }
