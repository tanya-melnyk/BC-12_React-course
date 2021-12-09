import { Component } from 'react';
import PropTypes from 'prop-types';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import ItemsList from '../ItemsList/ItemsList';
import Modal from '../common/Modal/Modal';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

class DepartmentsBlock extends Component {
  state = {
    departments: this.props.departments,
    isAddFormOpen: false,
    actionDepartment: '',
    isEditModalOpen: false,
    isDeleteModalOpen: false,
  };

  toggleAddForm = () =>
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));

  addDepartment = departmentName => {
    const newDepartment = { name: departmentName };
    this.setState(prevState => ({
      departments: [...prevState.departments, newDepartment],
      isAddFormOpen: false,
    }));
  };

  handleStartEditting = department =>
    this.setState({
      actionDepartment: department,
      isEditModalOpen: true,
    });

  saveEditedDepartment = editedDepartment => {
    const { actionDepartment } = this.state;
    this.setState(prevState => ({
      departments: prevState.departments.map(department =>
        department.name === actionDepartment
          ? { name: editedDepartment }
          : department,
      ),
      actionDepartment: '',
    }));
    this.closeEditModal();
  };

  closeEditModal = () =>
    this.setState({
      isEditModalOpen: false,
    });

  handleStartDeleting = department =>
    this.setState({
      actionDepartment: department,
      isDeleteModalOpen: true,
    });

  deleteDepartment = () => {
    const { actionDepartment } = this.state;

    this.setState(prevState => ({
      actionDepartment: '',
      departments: prevState.departments.filter(
        department => department.name !== actionDepartment,
      ),
    }));
    this.closeDeleteModal();
  };

  closeDeleteModal = () =>
    this.setState({
      isDeleteModalOpen: false,
    });

  render() {
    const {
      departments,
      isAddFormOpen,
      actionDepartment,
      isEditModalOpen,
      isDeleteModalOpen,
    } = this.state;

    return (
      <>
        <ItemsList
          items={departments}
          onEditItem={this.handleStartEditting}
          onDeleteItem={this.handleStartDeleting}
        />

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

        {isEditModalOpen && (
          <Modal
            title="Редактировать информацию о факультете"
            onClose={this.closeEditModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Факультет"
              inputValue={actionDepartment}
              onSave={this.saveEditedDepartment}
            />
          </Modal>
        )}

        {isDeleteModalOpen && (
          <Modal
            title="Удаление факультета"
            onClose={this.closeDeleteModal}
            icon={fingerIcon}
          >
            <DeleteCard
              text="Будут удалены все материалы и информация о факультете."
              onDelete={this.deleteDepartment}
              onClose={this.closeDeleteModal}
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
