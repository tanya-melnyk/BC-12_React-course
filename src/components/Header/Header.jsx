import PropTypes from 'prop-types';
import s from './Header.module.css';

const Header = ({ title }) => {
  return (
    <header className={s.mainHeader}>
      {title && <h2 className="heading">{title}</h2>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
