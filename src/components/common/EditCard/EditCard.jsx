import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import BigButton from '../BigButton/BigButton';
import styles from './EditCard.module.scss';

const EditCard = ({ label, onSave, inputValue }) => {
  const [input, setInput] = useState(inputValue);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => setInput(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSave(input);
    reset();
  };

  const reset = () => setInput('');

  const inputId = nanoid();

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor={inputId}>
        {label}
        <span className={styles.red}>*</span>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={input}
          onChange={handleChange}
        />
      </label>
      <div className={styles.btnWrapper}>
        <BigButton type="submit" text="Сохранить" disabled={!input} />
      </div>
    </form>
  );
};

////////////////// CLASS

// class EditCard extends Component {
//   state = {
//     input: this.props.inputValue,
//   };

//   handleChange = e => this.setState({ input: e.target.value });

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSave(this.state.input);
//     this.reset();
//   };

//   reset = () => this.setState({ input: '' });

//   inputId = nanoid();

//   render() {
//     const { input } = this.state;
//     const { label } = this.props;

//     return (
//       <form onSubmit={this.handleSubmit} className={styles.form}>
//         <label htmlFor={this.inputId}>
//           {label}
//           <span className={styles.red}>*</span>
//           <input
//             id={this.inputId}
//             type="text"
//             value={input}
//             onChange={this.handleChange}
//           />
//         </label>
//         <div className={styles.btnWrapper}>
//           <BigButton type="submit" text="Сохранить" disabled={!input} />
//         </div>
//       </form>
//     );
//   }
// }

EditCard.dpropTypes = {
  onSave: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default EditCard;
