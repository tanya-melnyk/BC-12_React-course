import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
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
    const isDuplicate = this.checkIfDuplicate(city);
    if (isDuplicate) {
      toast.warn(`City "${city}" is already in list`);
      return;
    }
    const newCity = { name: city };
    this.setState(prevState => ({
      cities: [...prevState.cities, newCity],
      isAddFormOpen: false,
    }));
  };

  checkIfDuplicate = city =>
    this.state.cities.some(({ name }) => name === city);

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

    return (
      <>
        <Filter
          label="Поиск города:"
          value={filter}
          onFilterChange={this.handleFilterChange}
        />

        <ItemsList
          items={this.getFilteredCities()}
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
