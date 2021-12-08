import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import BigButton from '../BigButton/BigButton';
import styles from './EditCard.module.scss';

class EditCard extends Component {
  state = {
    input: this.props.inputValue,
  };

  handleChange = e => this.setState({ input: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSave(this.state.input);
    this.reset();
  };

  reset = () => this.setState({ input: '' });

  inputId = nanoid();

  render() {
    const { input } = this.state;
    const { label } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor={this.editInputId}>
          {label}
          <span className={styles.red}>*</span>
          <input
            id={this.inputId}
            type="text"
            value={input}
            onChange={this.handleChange}
          />
        </label>
        <div className={styles.btnWrapper}>
          <BigButton type="submit" text="Сохранить" disabled={!input} />
        </div>
      </form>
    );
  }
}

EditCard.dpropTypes = {
  onSave: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
};

export default EditCard;
