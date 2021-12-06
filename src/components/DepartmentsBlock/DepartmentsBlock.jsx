import PropTypes from 'prop-types';
import BigButton from '../common/BigButton';
import DepartmentsList from './DepartmentsList';
import addIcon from 'images/add.svg';

const DepartmentsBlock = ({ departments }) => {
  return (
    <div>
      <DepartmentsList departments={departments} />
      <BigButton text="Добавить город" icon={addIcon} />
    </div>
  );
};

DepartmentsBlock.propTypes = {
  departments: PropTypes.array.isRequired,
};

export default DepartmentsBlock;
