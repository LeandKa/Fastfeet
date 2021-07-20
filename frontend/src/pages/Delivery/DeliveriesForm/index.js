import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import * as yup from 'yup';
import { toast } from 'react-toastify';

import ActionBar from '~/components/Form/ActionBar';
import NavBar from '~/components/NavBar';
import Api from '~/services/Api';
import Input from '~/components/Form/Input';
import Select from '~/components/Form/Select';
import {
  Container,
  Content,
  Div,
  FormContent,
  Label,
  SelectContent,
  Name,
} from './style';

export default function DeliveriesForm() {
  const formRef = useRef();
  const { id } = useParams();
  const { state } = useLocation();
  const [recipient, setRecipient] = useState([]);
  const [deliveryman, setDeliveryMan] = useState([]);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = yup.object({
        deliveryman_id: yup.number().required('Coloque um Entregador valido'),
        recipient_id: yup.number().required('Coloque um destino valido'),
        product: yup.string().required('Informe um nome de produto'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        const response = await Api.put(`/order/${id}`, data);
        if (response) {
          toast.success('Pedido de Entrega editado com sucesso ');
          toast.info('E-mail enviado para o entregador');
          reset();
        } else {
          toast.error('Algo aconteceu com a sua solicitação');
        }
      } else {
        const response = await Api.post('/orders/save', data);
        if (response) {
          toast.success('Pedido de Entrega feito com sucesso');
          toast.info('E-mail enviado para o entregador');
          reset();
        } else {
          toast.error('Algo aconteceu com a sua solicitação');
        }
      }
    } catch (error) {
      const validationErrors = {};
      if (error instanceof yup.ValidationError) {
        error.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  useEffect(() => {
    async function loadOrders() {
      formRef.current.setData({
        product: state.Editar.order.product,
      });
      formRef.current?.setFieldValue('recipient_id', {
        value: state.Editar.order.recipient.id,
        label: state.Editar.order.recipient.name,
      });
      formRef.current?.setFieldValue('deliveryman_id', {
        value: state.Editar.order.deliveryman.id,
        label: state.Editar.order.deliveryman.name,
      });
    }

    if (id) {
      loadOrders();
    }
  }, [state]);

  useEffect(() => {
    async function loadDeliverymen() {
      const response = await Api.get('/deliveryman/select');
      setDeliveryMan(response.data);
    }

    async function loadRecipients() {
      const response = await Api.get('/recipients/select');
      setRecipient(response.data);
    }
    loadRecipients();
    loadDeliverymen();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Content>
          <FormContent ref={formRef} onSubmit={handleSubmit}>
            <ActionBar text="Cadastro de encomendas" />
            <Div>
              <SelectContent>
                <Label htmlFor="recipient_id">
                  Destinatário
                  <Select
                    id="recipient_id"
                    name="recipient_id"
                    options={recipient}
                  />
                </Label>
                <Label htmlFor="deliveryman_id">
                  Entregador
                  <Select
                    id="deliveryman_id"
                    name="deliveryman_id"
                    options={deliveryman}
                  />
                </Label>
              </SelectContent>
              <Name>
                <label htmlFor="product">
                  Nome do Produto
                  <Input id="product" name="product" placeholder="Yamaha SX7" />
                </label>
              </Name>
            </Div>
          </FormContent>
        </Content>
      </Container>
    </>
  );
}
