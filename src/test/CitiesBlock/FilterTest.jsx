import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContext';

import { useSelector, useDispatch } from 'react-redux';
// import { changeFilter } from 'redux/cities/citiesActions';
import { changeFilter } from 'redux/cities';

const Filter = ({ label = '' }) => {
  const { theme } = useContext(ThemeContext);
  const filter = useSelector(state => state.cities.filter);
  const dispatch = useDispatch();

  const onChange = e => dispatch(changeFilter(e.target.value));

  return (
    <div>
      <label style={{ color: theme === themes.dark ? 'white' : 'black' }}>
        {label}
        <input type="text" value={filter} onChange={onChange}></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  label: PropTypes.string,
};

export default Filter;
