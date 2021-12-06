import PropTypes from 'prop-types';
import BigButton from '../common/BigButton';
import CitiesList from './CitiesList';
import addIcon from 'images/add.svg';

const CitiesBlock = ({ cities }) => {
  return (
    <div>
      <CitiesList cities={cities} />

      <BigButton text="Добавить город" icon={addIcon} />
    </div>
  );
};

CitiesBlock.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesBlock;
