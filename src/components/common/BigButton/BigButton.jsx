import PropTypes from 'prop-types';

/**
 * Добавим коммент из документации
 */

// const btnStyles = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   padding: '12px 16px',
//   backgroundColor: '#FF6B0A',
//   border: 'none',
//   cursor: 'pointer',
//   transition: 'all 200ms',
//   '&:not(:disabled):hover': {
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
//   },
//   '&:disabled': {
//     backgroundColor: '#FFE0B2',
//     cursor: 'not-allowed',
//   },
//   '& .image': {
//     marginRight: 10,
//   },
//   '& .heading': {
//     color: '#fff',
//     lineHeight: 1.2,
//   },
// };

const BigButton = ({ text, icon }) => {
  return (
    <button className="btn">
      {icon && <img className="image" src={icon} alt={text} />}
      <span className="heading">{text}</span>
    </button>
  );
};

BigButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
};

export default BigButton;
