import PropTypes from 'prop-types';
import Paper from '../common/Paper/Paper';
import Card from './Card/Card';
import styles from './UniversityBlock.module.css';

const UniversityBlock = ({ name, descr }) => {
  return (
    <section className={styles.section}>
      <Paper>
        <Card name={name} />
      </Paper>

      <Paper>
        <p className={styles.text}>{descr}</p>
      </Paper>
    </section>
  );
};

UniversityBlock.propTypes = {
  name: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
};

export default UniversityBlock;
