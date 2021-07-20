import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from './style';

export default function Modal({ children, handleClose }) {
  return (
    <Container onClick={handleClose}>
      <Content>{children}</Content>
    </Container>
  );
}

Modal.defaultProps = {
  children: null,
  handleClose: null,
};

Modal.propTypes = {
  children: PropTypes.element,
  handleClose: PropTypes.func,
};
