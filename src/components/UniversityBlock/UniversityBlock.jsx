import PropTypes from 'prop-types';
import Paper from '../common/Paper';
import Card from './Card';

const UniversityBlock = ({ name, descr }) => {
  return (
    <section>
      <Paper>
        <Card name={name} />
      </Paper>

      <Paper>
        <p>{descr}</p>
      </Paper>
    </section>
  );
};

UniversityBlock.propTypes = {
  name: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};

export default UniversityBlock;
