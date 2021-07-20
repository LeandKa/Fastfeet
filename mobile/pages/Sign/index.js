import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { getSession } from '../../store/modules/user/action';
import Input from '../../components/Form/Input';
import {
    Wrapper,
    Container,
    FormContainer,
    FormButton,
    Text,
    Logo,
} from './style';
import { Alert } from 'react-native';

export default function Sign() {
    const formRef = useRef(null);
    const { loading, error } = useSelector(state => state.users);
    const dispatch = useDispatch();

    async function handleSubmit(data) {
        if (!data.id) {
            Alert.alert('Por favor informe a sua id');
        } else {
            dispatch(getSession(data.id));
        }
    }

    return (
        <Wrapper>
            <Container>
                <Logo source={require('../../assets/logo.png')} />
                {error && (
                    <Text style={{ textAlign: 'center', color: 'red' }}>
                        {error}
                    </Text>
                )}
                {loading && <Loading />}
                <FormContainer ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        name="id"
                        text="Informe seu Id de cadastro"
                        height={'45px'}
                    />
                    <FormButton onPress={() => formRef.current.submitForm()}>
                        <Text>Entrar no Sistema</Text>
                    </FormButton>
                </FormContainer>
            </Container>
        </Wrapper>
    );
}
