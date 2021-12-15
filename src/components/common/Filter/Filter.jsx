import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContext';

const Filter = ({ label = '', value, onFilterChange }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <label style={{ color: theme === themes.dark ? 'white' : 'black' }}>
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
