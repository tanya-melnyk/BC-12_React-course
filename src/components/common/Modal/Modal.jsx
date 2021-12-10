import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRootRef = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscPress);
  }

  onEscPress = e => {
    if (e.code === 'Escape') {
      console.log('Escape');
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, icon, title, children } = this.props;

    return createPortal(
      <div className={styles.backdrop} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <header className={styles.header}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
          </header>

          <div className={styles.content}>
            <div className={styles.lead}>
              <div className={styles.imageWrapper}>
                <img src={icon} alt={title} />
              </div>
              <h3 className="heading">{title}</h3>
            </div>

            {children}
          </div>
        </div>
      </div>,
      modalRootRef,
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
