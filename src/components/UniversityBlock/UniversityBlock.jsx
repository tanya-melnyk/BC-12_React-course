import PropTypes from 'prop-types';
import Paper from '../common/Paper';
import Card from './Card';
import styles from './UniversityBlock.module.css';

const UniversityBlock = ({ name, descr }) => {
  return (
    <section className="">
      <Paper>
        <Card name={name} />
      </Paper>

      <Paper>
        <p className="">{descr}</p>
      </Paper>
    </section>
  );
};

UniversityBlock.propTypes = {
  name: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};

export default UniversityBlock;
