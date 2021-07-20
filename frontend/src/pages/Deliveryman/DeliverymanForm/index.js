import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import * as yup from 'yup';
import { toast } from 'react-toastify';
import ActionBar from '~/components/Form/ActionBar';
import NavBar from '~/components/NavBar';
import FileInput from '~/components/Form/FileInput';
import Input from '~/components/Form/Input';
import Api from '~/services/Api';
import { Container, Content, Div, FormContent, Label } from './style';

export default function DeliveryForm() {
  const formRef = useRef();
  const { state } = useLocation();
  const [avatar, setAvatar] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function loadDeliveryMan() {
      formRef.current.setData({
        name: state.Editar.name,
        email: state.Editar.email,
      });
      setAvatar(state.Editar.avatar);
    }
    if (id) {
      loadDeliveryMan();
    } else {
      setAvatar({ id: -1 });
    }
  }, []);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = yup.object({
        name: yup
          .string()
          .min(10, 'Minino de 10 caracteres')
          .max(32, 'Maximo de 32 caracteres')
          .required('Por favor informe o seu nome'),
        email: yup
          .string()
          .email('Informe um email valido')
          .min(10, 'Minino de 10 caracteres')
          .max(32, 'Maximo de 32 caracteres')
          .required('Informe uma rua valida'),
        avatar_id: yup.number(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      if (id) {
        const response = await Api.put(`/deliveryman/${id}`, data);

        if (response) {
          toast.success('Entregador editado com sucesso ');
        } else {
          toast.error('Algo aconteceu com a sua solicitação');
        }
      } else {
        const response = await Api.post('/deliveryman/save', data);

        if (response) {
          toast.success('Entregador cadastrado com sucesso');
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
              <ActionBar text="Edição de um  entregador" />
            ) : (
              <ActionBar text="Cadastro de entregadores" />
            )}
            <Div>
              <FileInput name="avatar_id" defaultValue={avatar} />
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" type="text" placeholder="John Doe" />
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="example@rockeseat.com"
              />
            </Div>
          </FormContent>
        </Content>
      </Container>
    </>
  );
}
