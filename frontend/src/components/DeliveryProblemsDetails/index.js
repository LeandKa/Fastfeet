import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { Details } from './style';

export default function DeliveryProblemsDetails({ handleClose, problem }) {
  return (
    <Modal handleClose={handleClose}>
      <Details>
        <h5>Informações da encomenda</h5>
        <p>{problem.description}</p>
      </Details>
    </Modal>
  );
}

DeliveryProblemsDetails.defaultProps = {
  problem: null,
  handleClose: null,
};

DeliveryProblemsDetails.propTypes = {
  problem: PropTypes.string,
  handleClose: PropTypes.func,
};
