import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, icon, title, children } = this.props;

    return (
      <div className={styles.backdrop} onClick={this.handleBackdropClick}>
        <div className={styles.modal}>
          <header className={styles.header}>
            <button
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
      </div>
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
