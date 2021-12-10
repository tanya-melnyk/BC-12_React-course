import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import Filter from '../common/Filter/Filter';
import Modal from '../common/Modal/Modal';
import ItemsList from '../ItemsList/ItemsList';
import * as storage from 'services/localStorage';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

const STORAGE_KEY = 'cities';

const MODAL = {
  NONE: 'none',
  EDIT: 'edit',
  DELETE: 'delete',
};

class CitiesBlock extends Component {
  state = {
    cities: this.props.cities,
    isAddFormOpen: false,

    openedModal: MODAL.NONE,
    // isEditModalOpen: false,
    // isDeleteModalOpen: false,

    activeCity: '',
    filter: '',
  };

  componentDidMount() {
    const savedCities = storage.get(STORAGE_KEY);
    if (savedCities) {
      this.setState({ cities: savedCities });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { cities } = this.state;
    if (prevState.cities !== cities) {
      storage.save(STORAGE_KEY, cities);
    }
  }

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
      // isEditModalOpen: true,
      openedModal: MODAL.EDIT,
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
      // activeCity: '',
    }));
    this.closeModal();
    // this.closeEditModal();
  };

  // closeEditModal = () =>
  //   this.setState({
  //     isEditModalOpen: false,
  //   });

  // DELETE CITY

  handleStartDeleting = activeCity =>
    this.setState({
      openedModal: MODAL.DELETE,
      // isDeleteModalOpen: true,
      activeCity,
    });

  deleteCity = () => {
    this.setState(prevState => ({
      cities: prevState.cities.filter(
        ({ name }) => name !== prevState.activeCity,
      ),
      // activeCity: '',
    }));
    this.closeModal();
    // this.closeDeleteModal();
  };

  // closeDeleteModal = () => this.setState({ isDeleteModalOpen: false });

  closeModal = () =>
    this.setState({
      openedModal: MODAL.NONE,
      activeCity: '',
    });

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
      cities,
      isAddFormOpen,
      // isDeleteModalOpen,
      // isEditModalOpen,
      openedModal,
      activeCity,
      filter,
    } = this.state;

    const filteredCities = this.getFilteredCities();

    return (
      <>
        {cities.length > 1 && (
          <Filter
            label="Поиск города:"
            value={filter}
            onFilterChange={this.handleFilterChange}
          />
        )}

        {!cities.length && <strong>No cities yet</strong>}

        {!!filteredCities.length && (
          <ItemsList
            items={filteredCities}
            onEditItem={this.handleStartEditting}
            onDeleteItem={this.handleStartDeleting}
          />
        )}

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

        {openedModal === MODAL.EDIT && (
          <Modal
            title="Редактировать информацию о городе"
            onClose={this.closeModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Город"
              inputValue={activeCity}
              onSave={this.saveEditedCity}
            />
          </Modal>
        )}

        {openedModal === MODAL.DELETE && (
          <Modal
            title="Удаление города"
            onClose={this.closeModal}
            icon={fingerIcon}
          >
            <DeleteCard
              text="Будут удалены все материалы и информация о городе."
              onDelete={this.deleteCity}
              onClose={this.closeModal}
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
