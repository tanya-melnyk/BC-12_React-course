import PropTypes from 'prop-types';
import Paper from 'components/common/Paper';
import dots from 'images/dots.svg';

const CitiesList = ({ cities }) => (
  <ul>
    {cities.map((city, index) => (
      <li key={index}>
        <Paper>
          <div>
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
