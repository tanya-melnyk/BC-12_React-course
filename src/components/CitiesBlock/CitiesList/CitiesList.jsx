/** @jsxImportSource @emotion/react */

import PropTypes from 'prop-types';
import Paper from 'components/common/Paper/Paper';
import dots from 'images/dots.svg';
import { listStyles, itemStyles } from '../../../styles/listStyles';

/**
 * Добавим коммент из документации
 * Импортировать  listStyles и itemStyles из файла listStyles.js
 * и подключить их в соответствующие элементы
 */

const CitiesList = ({ cities }) => (
  <ul css={listStyles}>
    {cities.map((city, index) => (
      <li key={index}>
        <Paper>
          <div css={itemStyles}>
            <p>{city.name}</p>
            <button>
              <img src={dots} alt="Menu" />
            </button>
          </div>
        </Paper>
      </li>
    ))}
  </ul>
);

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default CitiesList;
