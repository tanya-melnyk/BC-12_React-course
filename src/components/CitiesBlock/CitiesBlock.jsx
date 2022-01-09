import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Filter from './Filter/Filter';
import Loader from '../common/Loader/Loader';
import Modal from '../common/Modal/Modal';
import ItemsList from '../ItemsList/ItemsList';
import { citiesActions, citiesOperations, citiesSelectors } from 'redux/cities';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

const { getCities, addCity, editCity, deleteCity } = citiesOperations;

const CitiesBlock = () => {
  const cities = useSelector(citiesSelectors.getCities);
  const filteredCities = useSelector(citiesSelectors.getMemoizedFilteredCities);
  const loading = useSelector(citiesSelectors.getLoading);
  const error = useSelector(citiesSelectors.getError);
  const dispatch = useDispatch();

  // form / modal
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);
  // actions
  const [action, setAction] = useState(ACTION.NONE);
  const [activeCity, setActiveCity] = useState(null);

  // GET CITIES

  useEffect(() => dispatch(getCities()), [dispatch]);

  // ADD CITY

  const toggleAddForm = () => setIsAddFormOpen(prevState => !prevState);

  const confirmAdd = cityName => {
    const isDuplicate = checkIfDuplicate(cityName);
    if (isDuplicate) {
      toast.warn(`City "${cityName}" is already in list`);
      return;
    }
    setActiveCity({ name: cityName });
    setAction(ACTION.ADD);
  };

  const checkIfDuplicate = cityName =>
    cities.some(({ name }) => name === cityName);

  useEffect(() => {
    if (action !== ACTION.ADD || !activeCity) return;

    dispatch(addCity(activeCity)).then(() => {
      toggleAddForm();
      setAction(ACTION.NONE);
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch]);

  // EDIT CITY

  const handleStartEdit = useCallback(activeCity => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.EDIT);
  }, []);

  const confirmEdit = editedCityName => {
    if (editedCityName === activeCity.name) {
      closeModal();
      return;
    }
    setAction(ACTION.EDIT);
    setActiveCity({ ...activeCity, name: editedCityName });
  };

  useEffect(() => {
    if (action !== ACTION.EDIT) return;

    dispatch(editCity(activeCity)).then(() => {
      setAction(ACTION.NONE);
      closeModal();
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch]);

  // DELETE CITY

  const handleStartDelete = useCallback(activeCity => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.DELETE);
  }, []);

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    dispatch(deleteCity(activeCity.id)).then(() => {
      setAction(ACTION.NONE);
      closeModal();
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch]);

  const closeModal = () => {
    setOpenedModal(ACTION.NONE);
    setActiveCity(null);
  };

  // FIX FILTER BUG
  useEffect(() => {
    if (cities.length === 1) {
      dispatch(citiesActions.changeFilter(''));
    }
  }, [cities.length, dispatch]);

  const noCities = !loading && !cities.length;

  return (
    <>
      {loading && <Loader />}

      {cities.length > 1 && <Filter label="Поиск города:" />}

      {!!filteredCities.length && (
        <ItemsList
          items={filteredCities}
          onEditItem={handleStartEdit}
          onDeleteItem={handleStartDelete}
        />
      )}

      {noCities && <h4 className="absence-msg">No cities yet</h4>}

      {isAddFormOpen && (
        <AddForm
          onSubmit={confirmAdd}
          formName="Добавление города"
          placeholder="Город"
        />
      )}

      {error && <ErrorMsg message={error} />}

      <BigButton
        text={isAddFormOpen ? 'Отменить добавление' : 'Добавить город'}
        icon={!isAddFormOpen && addIcon}
        onClick={toggleAddForm}
        disabled={loading}
      />

      {openedModal === ACTION.EDIT && (
        <Modal
          title="Редактировать информацию о городе"
          onClose={closeModal}
          icon={pencilIcon}
        >
          <EditCard
            label="Город"
            inputValue={activeCity.name}
            onSave={confirmEdit}
          />
        </Modal>
      )}

      {openedModal === ACTION.DELETE && (
        <Modal title="Удаление города" onClose={closeModal} icon={fingerIcon}>
          <DeleteCard
            text="Будут удалены все материалы и информация о городе."
            onDelete={confirmDelete}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default CitiesBlock;
