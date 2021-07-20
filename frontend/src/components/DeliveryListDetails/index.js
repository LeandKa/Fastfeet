import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import Modal from '../Modal';

import { Details, DetailsImg } from './style';

function DateFormat({ date }) {
  const [Format, setFormat] = useState('');

  useEffect(() => {
    if (date) {
      setFormat(format(new Date(date), 'dd/MM/yyyy'));
    } else {
      setFormat('-');
    }
  });

  return <span>{Format}</span>;
}

export default function DeliveryListDetails({ handleClose, delivery }) {
  useEffect(() => {
    console.log(delivery);
  }, []);

  return (
    <Modal handleClose={handleClose}>
      <Details>
        <h5>Informações da encomenda</h5>
        <p>{delivery.recipient.adress}</p>
        <p>
          {delivery.recipient.city}-{delivery.recipient.state}
        </p>
        <p>{delivery.recipient.cep}</p>
      </Details>
      <Details>
        <h5>Datas</h5>
        <p>
          <strong>Retirada:</strong>
          {delivery.start_date}
          <DateFormat date={delivery.start_date} />
        </p>
        <p>
          <strong>Entrega:</strong>
          <DateFormat date={delivery.start_date} />
        </p>
      </Details>
      <DetailsImg>
        <p>Assinatura do Destinatário</p>

        <div>
          <p>Sem assinatura</p>
        </div>
      </DetailsImg>
    </Modal>
  );
}

DeliveryListDetails.defaultProps = {
  delivery: null,
  handleClose: null,
};

DateFormat.defaultProps = {
  date: null,
};

DateFormat.propTypes = {
  date: PropTypes.string,
};

DeliveryListDetails.propTypes = {
  delivery: PropTypes.string,
  handleClose: PropTypes.func,
};
