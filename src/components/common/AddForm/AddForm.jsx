import { useState, useEffect, useRef } from 'react';

import { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
import Paper from '../Paper/Paper';
import s from './AddForm.module.css';

const AddForm = ({ onSubmit, formName, placeholder }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <div className={s.container}>
      <Paper>
        <div className={s.inner}>
          <h4 className={s.formName}>{formName}</h4>

          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              type="text"
              placeholder={placeholder}
              required
              onChange={e => setInput(e.target.value)}
            />

            <BigButton type="submit" text="Добавить" disabled={!input} />
          </form>
        </div>
      </Paper>
    </div>
  );
};

// class AddForm extends Component {
//   state = { input: '' };

//   handleChange = e => this.setState({ input: e.target.value });

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.input);
//   };

//   render() {
//     const { input } = this.state;
//     const { formName, placeholder } = this.props;

//     return (
//       <div className={s.container}>
//         <Paper>
//           <div className={s.inner}>
//             <h4 className={s.formName}>{formName}</h4>

//             <form onSubmit={this.handleSubmit}>
//               <input
//                 value={input}
//                 type="text"
//                 placeholder={placeholder}
//                 required
//                 onChange={this.handleChange}
//               />

//               <BigButton type="submit" text="Добавить" disabled={!input} />
//             </form>
//           </div>
//         </Paper>
//       </div>
//     );
//   }
// }

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddForm;
