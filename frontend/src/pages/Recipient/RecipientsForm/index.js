import React, { useEffect, useRef } from 'react';

import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useLocation, useParams } from 'react-router-dom';
import ActionBar from '~/components/Form/ActionBar';
import NavBar from '~/components/NavBar';
import InputMask from '~/components/Form/InputMask';
import Input from '~/components/Form/Input';
import Api from '~/services/Api';
import {
  Container,
  Content,
  Div,
  FormContent,
  Name,
  Address,
  Street,
  Number,
  AddressLabel,
} from './style';

export default function RecipientsForm() {
  const formRef = useRef();
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    formRef.current.setData({
      name: state.Editar.name,
      street: state.Editar.street,
      number: state.Editar.number,
      complement: state.Editar.complement,
      city: state.Editar.city,
      state: state.Editar.state,
      cep: state.Editar.cep,
    });
  }, []);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = yup.object({
        name: yup
          .string()
          .min(10, 'Minino de 10 caracteres')
          .max(32, 'Maximo de 32 caracteres')
          .required('Por favor informe o seu nome'),
        street: yup
          .string()
          .min(10, 'Minino de 10 caracteres')
          .max(32, 'Maximo de 32 caracteres')
          .required('Informe uma rua valida'),
        number: yup
          .number()
          .typeError('Informe um numero valido')
          .positive('Numero deve ser positivo')
          .required('Informe o numero '),
        complement: yup.string().required('Informe o complemento'),
        city: yup.string().required('Informe a cidade'),
        cep: yup.string().required('Informe o cep'),
        state: yup.string().required('Informe o estado'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      if (id) {
        const response = await Api.put(`/recipient/${id}`, data);

        if (response) {
          toast.success('Destinatário editado com sucesso');
          reset();
        } else {
          toast.error('Algo aconteceu com a sua solicitação');
        }
      } else {
        const response = await Api.post('/recipient/save', data);

        if (response) {
          toast.success('Destinatário cadastrado com sucesso');
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

  return (
    <>
      <NavBar />
      <Container>
        <Content>
          <FormContent ref={formRef} onSubmit={handleSubmit}>
            {id ? (
              <ActionBar text="Editar um destinatário" />
            ) : (
              <ActionBar text="Cadastro de destinatário" />
            )}
            <Div>
              <Name>
                <label htmlFor="name">
                  Nome
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ludwig Van Beethoven"
                  />
                </label>
              </Name>
              <Address>
                <Street htmlFor="street">
                  Rua
                  <Input id="street" name="street" placeholder="Rua" />
                </Street>
                <Number htmlFor="number">
                  Numero
                  <Input id="number" name="number" placeholder="Numero" />
                </Number>
                <Number htmlFor="complement">
                  Complemento
                  <Input
                    id="complement"
                    name="complement"
                    placeholder="Complemento"
                  />
                </Number>
              </Address>
              <Address>
                <AddressLabel htmlFor="city">
                  Cidade
                  <Input id="city" name="city" placeholder="Cidade" />
                </AddressLabel>
                <AddressLabel htmlFor="state">
                  Estado
                  <Input id="state" name="state" placeholder="Estado" />
                </AddressLabel>
                <AddressLabel htmlFor="cep">
                  Cep
                  <InputMask
                    mask="99999-999"
                    id="cep"
                    name="cep"
                    placeholder="Cep"
                  />
                </AddressLabel>
              </Address>
            </Div>
          </FormContent>
        </Content>
      </Container>
    </>
  );
}
