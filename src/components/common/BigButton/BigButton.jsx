import PropTypes from 'prop-types';

const BigButton = ({ text, icon, onClick }) => {
  return (
    <button>
      {icon && <img src={icon} alt={text} />}
      <span>{text}</span>
    </button>
  );
};

BigButton.defaultProps = {
  icon: null,
  onClick: () => {},
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export default BigButton;
