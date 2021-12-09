import PropTypes from 'prop-types';

const Filter = ({ label = '', value, onFilterChange }) => {
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={e => onFilterChange(e.target.value)}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
