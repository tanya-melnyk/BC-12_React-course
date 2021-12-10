import { Component } from 'react';
import PropTypes from 'prop-types';
import BigButton from '../BigButton/BigButton';
// import Timer from '../Timer/Timer';
import Paper from '../Paper/Paper';
import s from './AddForm.module.css';

class AddForm extends Component {
  state = { input: '' };

  // componentDidMount() {
  //   console.log('componentDidMount');
  // }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('componentDidUpdate');
  //   // console.log('prevState', prevState);
  //   // console.log(`this.state`, this.state);
  //   // console.log('~ snapshot', snapshot);
  //   // Никогда не обновляем state без проверки!
  // }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate', true);
  //   // return true;

  //   // // Нельзя повторять символы
  //   // const curInput = this.state.input;
  //   // const nextInput = nextState.input;
  //   // return curInput[curInput.length - 1] !== nextInput[nextInput.length - 1];
  // }

  // getSnapshotBeforeUpdate = (prevProps, prevState) => {
  //   console.log('getSnapshotBeforeUpdate');
  //   return 'Info from the past';
  // };

  // static getDerivedStateFromProps(props, state) {
  //   console.log('getDerivedStateFromProps', state);
  //   // // Если последний введенный символ это не число - обнуляй стейт
  //   // if (Number.isNaN(Number(state.input[state.input.length - 1]))) {
  //   //   return { input: '' };
  //   // }
  //   return null;
  // }

  handleChange = e => this.setState({ input: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.reset();
  };

  reset = () => this.setState({ input: '' });

  render() {
    console.log('render AddForm');

    const { input } = this.state;
    const { formName, placeholder } = this.props;

    return (
      <div className={s.container}>
        <Paper>
          <div className={s.inner}>
            <h4 className={s.formName}>{formName}</h4>

            {/* <Timer /> */}

            <form onSubmit={this.handleSubmit}>
              <input
                value={input}
                type="text"
                placeholder={placeholder}
                required
                onChange={this.handleChange}
              />

              <BigButton type="submit" text="Добавить" disabled={!input} />
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AddForm;
