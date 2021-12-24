import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext, themes } from 'context/themeContext';
import { citiesActions, citiesSelectors } from 'redux/cities';

const Filter = ({ label = '' }) => {
  const filter = useSelector(citiesSelectors.getFilter);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <label style={{ color: theme === themes.dark ? 'white' : 'black' }}>
        {label}
        <input
          type="text"
          value={filter}
          onChange={e => dispatch(citiesActions.changeFilter(e.target.value))}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  label: PropTypes.string,
};

export default Filter;
