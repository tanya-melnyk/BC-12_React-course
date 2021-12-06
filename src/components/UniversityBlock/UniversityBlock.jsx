import PropTypes from 'prop-types';
import Paper from '../common/Paper';
import Card from './Card';

const UniversityBlock = ({ name, descr }) => {
  return (
    <div>
      <Paper>
        <Card name={name} />
      </Paper>

      <Paper>
        <p>{descr}</p>
      </Paper>
    </div>
  );
};

UniversityBlock.propTypes = {
  name: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};

export default UniversityBlock;
