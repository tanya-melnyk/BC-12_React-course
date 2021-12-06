import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header className="">
      {title && <h2 className="heading">{title}</h2>}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
