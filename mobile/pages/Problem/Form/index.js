import React, { useRef } from 'react';
import api from '../../../services/api';
import { Background, Button, Container, Content, Text } from './style';
import TextInput from '../../../components/Form/TextInput';
import { Alert } from 'react-native';

export default function Form({ route }) {
    const formRef = useRef(null);
    const { id } = route.params;

    function handleSubmit(data) {
        async function submitProblem() {
            if (!data.problem) {
                Alert.alert('Por favor informe o seu problema');
            }

            const response = await api.post('/delivery/problems', {
                delivery_id: id,
                description: data.problem,
            });
            if (response.data) {
                Alert.alert('Problema registrado com sucesso');
            } else {
                Alert.alert('Um erro Aconteceu');
            }
        }

        submitProblem();
    }

    return (
        <Container>
            <Background />
            <Content ref={formRef} onSubmit={handleSubmit}>
                <TextInput
                    name="problem"
                    text="Inclua aqui o problema que ocorreu na entrega"
                    height={'300px'}
                />
                <Button onPress={() => formRef.current.submitForm()}>
                    <Text>Enviar</Text>
                </Button>
            </Content>
        </Container>
    );
}
