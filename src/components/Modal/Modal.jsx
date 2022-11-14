import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImg } from './Modal.styled';

// портал для модалки

import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

// модалка на классах
export default class Modal extends Component {
  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    e.code === 'Escape' && this.props.toggleModal();
  };

  handleBackdropClick = e => {
    e.target === e.currentTarget && this.props.toggleModal();
  };

  render() {
    const { handleBackdropClick } = this;
    const { largeImage } = this.props;

    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalImg>
          <img src={largeImage} alt="" />
        </ModalImg>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.prototypes = {
  alt: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  onModalClick: PropTypes.func.isRequired,
};
