import PropTypes from 'prop-types';

const Filter = ({ label = '', value, onChange }) => {
  return (
    <div>
      <label>
        {label}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
