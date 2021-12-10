import { Component } from 'react';
import PropTypes from 'prop-types';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import ItemsList from '../ItemsList/ItemsList';
import Modal from '../common/Modal/Modal';
import * as storage from '../../services/localStorage';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

const MODAL = {
  NONE: 'none',
  EDIT: 'edit',
  DELETE: 'delete',
};

const STORAGE_KEY = 'departments';

class DepartmentsBlock extends Component {
  state = {
    departments: this.props.departments,
    isAddFormOpen: false,
    activeDepartment: '',
    openedModal: MODAL.NONE,
  };

  componentDidMount() {
    const savedDepartments = storage.get(STORAGE_KEY);
    if (savedDepartments) {
      this.setState({ departments: savedDepartments });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { departments } = this.state;
    if (prevState.departments !== departments) {
      storage.save(STORAGE_KEY, departments);
    }
  }

  // ADD DEPARTMENT

  toggleAddForm = () =>
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));

  addDepartment = departmentName => {
    const newDepartment = { name: departmentName };
    this.setState(prevState => ({
      departments: [...prevState.departments, newDepartment],
      isAddFormOpen: false,
    }));
  };

  // EDIT DEPARTMENT

  handleStartEditting = department =>
    this.setState({
      activeDepartment: department,
      openedModal: MODAL.EDIT,
    });

  saveEditedDepartment = editedDepartment => {
    const { activeDepartment } = this.state;
    this.setState(prevState => ({
      departments: prevState.departments.map(department =>
        department.name === activeDepartment
          ? { name: editedDepartment }
          : department,
      ),
    }));
    this.closeModal();
  };

  // DELETE DEPARTMENT

  handleStartDeleting = department =>
    this.setState({
      activeDepartment: department,
      openedModal: MODAL.DELETE,
    });

  deleteDepartment = () => {
    const { activeDepartment } = this.state;
    this.setState(prevState => ({
      departments: prevState.departments.filter(
        department => department.name !== activeDepartment,
      ),
    }));
    this.closeModal();
  };

  closeModal = () =>
    this.setState({
      openedModal: MODAL.NONE,
      activeDepartment: '',
    });

  render() {
    const { departments, isAddFormOpen, activeDepartment, openedModal } =
      this.state;

    return (
      <>
        {!!departments.length && (
          <ItemsList
            items={departments}
            onEditItem={this.handleStartEditting}
            onDeleteItem={this.handleStartDeleting}
          />
        )}

        {!departments.length && (
          <h4 className="absence-msg">No departments yet</h4>
        )}

        {isAddFormOpen && (
          <AddForm
            onSubmit={this.addDepartment}
            formName="Добавление филиала"
            placeholder="Филиал"
          />
        )}

        <BigButton
          text={isAddFormOpen ? 'Отменить добавление' : 'Добавить факультет'}
          icon={!isAddFormOpen && addIcon}
          onClick={this.toggleAddForm}
        />

        {openedModal === MODAL.EDIT && (
          <Modal
            title="Редактировать информацию о факультете"
            onClose={this.closeModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Факультет"
              inputValue={activeDepartment}
              onSave={this.saveEditedDepartment}
            />
          </Modal>
        )}

        {openedModal === MODAL.DELETE && (
          <Modal
            title="Удаление факультета"
            onClose={this.closeModal}
            icon={fingerIcon}
          >
            <DeleteCard
              text="Будут удалены все материалы и информация о факультете."
              onDelete={this.deleteDepartment}
              onClose={this.closeModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

DepartmentsBlock.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default DepartmentsBlock;
