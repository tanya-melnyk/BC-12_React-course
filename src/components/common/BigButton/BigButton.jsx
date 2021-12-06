import PropTypes from 'prop-types';

const BigButton = ({ text, icon }) => {
  return (
    <button>
      {icon && <img src={icon} alt={text} />}
      <span>{text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export default BigButton;
