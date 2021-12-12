import { Component } from 'react';
import AddForm from '../common/AddForm/AddForm';
import BigButton from '../common/BigButton/BigButton';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import Loader from '../common/Loader/Loader';
import Modal from '../common/Modal/Modal';
import ItemsList from '../ItemsList/ItemsList';
import * as api from 'services/api';
import addIcon from 'images/add.svg';
import pencilIcon from 'images/pencil.png';
import fingerIcon from 'images/finger.png';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

const API_ENDPOINT = 'departments';

class DepartmentsBlock extends Component {
  state = {
    departments: [],
    isAddFormOpen: false,
    openedModal: ACTION.NONE,
    action: ACTION.NONE,
    activeDepartment: null,
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchDepartments();
  }

  componentDidUpdate(prevProps, prevState) {
    const { action } = this.state;
    if (prevState.action !== action) {
      switch (action) {
        case ACTION.ADD:
          this.addDepartment();
          break;
        case ACTION.EDIT:
          this.editDepartment();
          break;
        case ACTION.DELETE:
          this.deleteDepartment();
          break;
        default:
          return;
      }
    }
  }

  // GET DEPARTMENTS

  fetchDepartments = async () => {
    this.setState({ loading: true, error: null });
    try {
      const departments = await api.getData(API_ENDPOINT);
      this.setState({ departments });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  // ADD DEPARTMENT

  toggleAddForm = () =>
    this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));

  confirmAdd = departmentName =>
    this.setState({
      action: ACTION.ADD,
      activeDepartment: { name: departmentName },
    });

  addDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const newDepartment = await api.saveItem(API_ENDPOINT, activeDepartment);
      this.setState(prevState => ({
        departments: [...prevState.departments, newDepartment],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.toggleAddForm();
      this.setState({
        activeDepartment: null,
        action: ACTION.NONE,
        loading: false,
      });
    }
  };

  // EDIT DEPARTMENT

  handleStartEdit = activeDepartment =>
    this.setState({
      activeDepartment,
      openedModal: ACTION.EDIT,
    });

  confirmEdit = editedDepartmentName =>
    this.setState({
      action: ACTION.EDIT,
      activeDepartment: {
        ...this.state.activeDepartment,
        name: editedDepartmentName,
      },
    });

  editDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const updatedDepartment = await api.editItem(
        API_ENDPOINT,
        activeDepartment,
      );
      this.setState(prevState => ({
        departments: prevState.departments.map(department =>
          department.id === updatedDepartment.id
            ? updatedDepartment
            : department,
        ),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.closeModal();
      this.setState({
        action: ACTION.NONE,
        activeDepartment: null,
        loading: false,
      });
    }
  };

  // DELETE DEPARTMENT

  handleStartDelete = activeDepartment =>
    this.setState({
      activeDepartment,
      openedModal: ACTION.DELETE,
    });

  confirmDelete = () => this.setState({ action: ACTION.DELETE });

  deleteDepartment = async () => {
    this.setState({ loading: true, error: null });
    const { activeDepartment } = this.state;
    try {
      const deletedDepartment = await api.deleteItem(
        API_ENDPOINT,
        activeDepartment.id,
      );
      this.setState(prevState => ({
        departments: prevState.departments.filter(
          department => department.id !== deletedDepartment.id,
        ),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.closeModal();
      this.setState({
        action: ACTION.NONE,
        activeDepartment: null,
        loading: false,
      });
    }
  };

  closeModal = () =>
    this.setState({
      openedModal: ACTION.NONE,
      activeDepartment: null,
    });

  render() {
    const {
      departments,
      isAddFormOpen,
      activeDepartment,
      openedModal,
      loading,
    } = this.state;

    const noDepartments = !loading && !departments.length;

    return (
      <>
        {loading && <Loader />}

        {!!departments.length && (
          <ItemsList
            items={departments}
            onEditItem={this.handleStartEdit}
            onDeleteItem={this.handleStartDelete}
          />
        )}

        {noDepartments && <h4 className="absence-msg">No departments yet</h4>}

        {isAddFormOpen && (
          <AddForm
            onSubmit={this.confirmAdd}
            formName="Добавление филиала"
            placeholder="Филиал"
          />
        )}

        <BigButton
          text={isAddFormOpen ? 'Отменить добавление' : 'Добавить факультет'}
          icon={!isAddFormOpen && addIcon}
          onClick={this.toggleAddForm}
        />

        {openedModal === ACTION.EDIT && (
          <Modal
            title="Редактировать информацию о факультете"
            onClose={this.closeModal}
            icon={pencilIcon}
          >
            <EditCard
              label="Факультет"
              inputValue={activeDepartment.name}
              onSave={this.confirmEdit}
            />
          </Modal>
        )}

        {openedModal === ACTION.DELETE && (
          <Modal
            title="Удаление факультета"
            onClose={this.closeModal}
            icon={fingerIcon}
          >
            <DeleteCard
              text="Будут удалены все материалы и информация о факультете."
              onDelete={this.confirmDelete}
              onClose={this.closeModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default DepartmentsBlock;

/////////////////////////////////////////////////////

//  USUSAL WAY WITH NO STATE MACHINE

// class DepartmentsBlock extends Component {
//   state = {
//     departments: [],

//     departmentToAdd: null,
//     departmentToEdit: null,
//     departmentToDelete: null,

//     isAddFormOpen: false,
//     openedModal: MODAL.NONE,
//     activeDepartment: null,

//     loading: false,
//     error: null,
//   };

//   componentDidMount() {
//     this.fetchDepartments();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { departmentToAdd, departmentToEdit, departmentToDelete } =
//       this.state;
//     if (departmentToAdd && prevState.departmentToAdd !== departmentToAdd) {
//       this.addDepartment();
//     }
//     if (departmentToEdit && prevState.departmentToEdit !== departmentToEdit) {
//       this.editDepartment();
//     }
//     if (
//       departmentToDelete &&
//       prevState.departmentToDelete !== departmentToDelete
//     ) {
//       this.deleteDepartment();
//     }
//   }

//   fetchDepartments = () => {
//     this.setState({ loading: true, error: null });
//     api
//       .getData(API_ENDPOINT)
//       .then(departments => this.setState({ departments }))
//       .catch(err => this.setState({ error: err.message }))
//       .finally(() => this.setState({ loading: false }));
//   };

//   // ADD DEPARTMENT

//   toggleAddForm = () =>
//     this.setState(prevState => ({ isAddFormOpen: !prevState.isAddFormOpen }));

//   setDepartmentToAdd = departmentName =>
//     this.setState({ departmentToAdd: { name: departmentName } });

//   addDepartment = () => {
//     this.setState({ loading: true, error: null });
//     const { departmentToAdd } = this.state;
//     api
//       .saveItem(API_ENDPOINT, departmentToAdd)
//       .then(department =>
//         this.setState(prevState => ({
//           departments: [...prevState.departments, department],
//         })),
//       )
//       .catch(err => this.setState({ error: err.message }))
//       .finally(() => {
//         this.toggleAddForm();
//         this.setState({ departmentToAdd: null, loading: false });
//       });
//   };

//   FETCING AS AN EVENT HANDLER

//   // addDepartment = departmentName => {
//   //   const newDepartment = { name: departmentName };
//   //   this.setState({ loading: true, error: null });
//   //   api
//   //     .saveItem(API_ENDPOINT, newDepartment)
//   //     .then(department =>
//   //       this.setState(prevState => ({
//   //         departments: [...prevState.departments, department],
//   //       })),
//   //     )
//   //     .catch(err => this.setState({ error: err.message }))
//   //     .finally(() => {
//   //       this.toggleAddForm();
//   //       this.setState({ loading: false });
//   //     });
//   // };

//   // EDIT DEPARTMENT

//   handleStartEditting = activeDepartment =>
//     this.setState({
//       activeDepartment,
//       openedModal: MODAL.EDIT,
//     });

//   setDepartmentToEdit = editedDepartmentName =>
//     this.setState({ departmentToEdit: { name: editedDepartmentName } });

//   editDepartment = () => {
//     this.setState({ loading: true, error: null });
//     const { activeDepartment, departmentToEdit } = this.state;
//     api
//       .editItem(API_ENDPOINT, activeDepartment.id, departmentToEdit)
//       .then(updatedDepartment =>
//         this.setState(prevState => ({
//           departments: prevState.departments.map(department =>
//             department.id === updatedDepartment.id
//               ? updatedDepartment
//               : department,
//           ),
//         })),
//       )
//       .catch(err => this.setState({ error: err.message }))
//       .finally(() => {
//         this.closeModal();
//         this.setState({ departmentToEdit: null, loading: false });
//       });
//   };

//   // FETCING AS AN EVENT HANDLER

//   // saveEditedDepartment = editedDepartmentName => {
//   //   this.setState({ loading: true, error: null });
//   //   const { activeDepartment } = this.state;
//   //   const update = { name: editedDepartmentName };
//   //   api
//   //     .editItem(API_ENDPOINT, activeDepartment.id, update)
//   //     .then(updatedDepartment =>
//   //       this.setState(prevState => ({
//   //         departments: prevState.departments.map(department =>
//   //           department.id === updatedDepartment.id
//   //             ? updatedDepartment
//   //             : department,
//   //         ),
//   //       })),
//   //     )
//   //     .catch(err => this.setState({ error: err.message }))
//   //     .finally(() => {
//   //       this.closeModal();
//   //       this.setState({ loading: false });
//   //     });
//   // };

//   // FETCING AS AN EVENT HANDLER

//   handleStartDeleting = activeDepartment =>
//     this.setState({
//       activeDepartment,
//       openedModal: MODAL.DELETE,
//     });

//   setDepartmentToDelete = () =>
//     this.setState({ departmentToDelete: this.state.activeDepartment });

//   deleteDepartment = () => {
//     this.setState({ loading: true, error: null });
//     const { departmentToDelete } = this.state;
//     api
//       .deleteItem(API_ENDPOINT, departmentToDelete.id)
//       .then(deletedDepartment =>
//         this.setState(prevState => ({
//           departments: prevState.departments.filter(
//             department => department.id !== deletedDepartment.id,
//           ),
//         })),
//       )
//       .catch(err => this.setState({ error: err.message }))
//       .finally(() => {
//         this.closeModal();
//         this.setState({ departmentToDelete: null, loading: false });
//       });
//   };

//   // FETCING AS AN EVENT HANDLER

//   // deleteDepartment = () => {
//   //   this.setState({ loading: true, error: null });
//   //   const { activeDepartment } = this.state;
//   //   api
//   //     .deleteItem(API_ENDPOINT, activeDepartment.id)
//   //     .then(deletedDepartment =>
//   //       this.setState(prevState => ({
//   //         departments: prevState.departments.filter(
//   //           department => department.id !== deletedDepartment.id,
//   //         ),
//   //       })),
//   //     )
//   //     .catch(err => this.setState({ error: err.message }))
//   //     .finally(() => {
//   //       this.closeModal();
//   //       this.setState({ loading: false });
//   //     });
//   // };

//   closeModal = () =>
//     this.setState({
//       openedModal: MODAL.NONE,
//       activeDepartment: null,
//     });

//   render() {
//     const {
//       departments,
//       isAddFormOpen,
//       activeDepartment,
//       openedModal,
//       loading,
//     } = this.state;

//     return (
//       <>
//         {loading && <Loader />}

//         {!!departments.length && (
//           <ItemsList
//             items={departments}
//             onEditItem={this.handleStartEditting}
//             onDeleteItem={this.handleStartDeleting}
//           />
//         )}

//         {!departments.length && (
//           <h4 className="absence-msg">No departments yet</h4>
//         )}

//         {isAddFormOpen && (
//           <AddForm
//             onSubmit={this.setDepartmentToAdd}
//             formName="Добавление филиала"
//             placeholder="Филиал"
//           />
//         )}

//         <BigButton
//           text={isAddFormOpen ? 'Отменить добавление' : 'Добавить факультет'}
//           icon={!isAddFormOpen && addIcon}
//           onClick={this.toggleAddForm}
//         />

//         {openedModal === MODAL.EDIT && (
//           <Modal
//             title="Редактировать информацию о факультете"
//             onClose={this.closeModal}
//             icon={pencilIcon}
//           >
//             <EditCard
//               label="Факультет"
//               inputValue={activeDepartment.name}
//               onSave={this.setDepartmentToEdit}
//             />
//           </Modal>
//         )}

//         {openedModal === MODAL.DELETE && (
//           <Modal
//             title="Удаление факультета"
//             onClose={this.closeModal}
//             icon={fingerIcon}
//           >
//             <DeleteCard
//               text="Будут удалены все материалы и информация о факультете."
//               onDelete={this.setDepartmentToDelete}
//               onClose={this.closeModal}
//             />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

// export default DepartmentsBlock;
