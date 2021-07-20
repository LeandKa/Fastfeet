import React, { useRef } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from '~/store/modules/users/action';
import Input from '~/components/Form/Input';
import { Container, Content, Logo, ContentForm, Label, Button } from './style';
import LogoPng from '~/assets/logo.png';

export default function Signin() {
    const formRef = useRef();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.users);

    async function handleSubmit(data) {
        try {
            const schema = yup.object({
                email: yup
                    .string()
                    .required('Email e requerido')
                    .email('Digite um email valido'),
                password: yup.string().required('Senha e requerida'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            dispatch(getSession(data.email, data.password));
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
        <Container>
            <Content>
                <Logo src={LogoPng} alt="Fastfeet" />
                <ContentForm ref={formRef} onSubmit={handleSubmit}>
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                    <Label htmlFor="email">
                        SEU E-MAIL
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Exemplo@email.com"
                        />
                    </Label>
                    <Label htmlFor="password">
                        SUA SENHA
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="********"
                        />
                    </Label>
                    <Button type="submit">
                        {loading ? 'Carregando ...' : 'Entrar no sistema'}
                    </Button>
                </ContentForm>
            </Content>
        </Container>
    );
}
