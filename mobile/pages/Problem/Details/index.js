import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { format } from 'date-fns';
import Loading from '../../../components/Loading';
import { Background, Container, Content, Card, InfoLabel } from './style';
import { Alert, FlatList } from 'react-native';

export default function Details({ route }) {
    const { id } = route.params;
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProblems() {
            const response = await api.get(`/delivery/problems/${id}`);
            if (response.data) {
                setProblems(response.data);
                setLoading(false);
            } else {
                Alert.alert('Algo aconteceu');
            }
        }
        getProblems();
    }, []);

    return (
        <Container>
            <Background />
            {loading ? (
                <Loading />
            ) : (
                <Content>
                    <FlatList
                        data={problems}
                        renderItem={({ item }) => (
                            <Card>
                                <InfoLabel>{item.description}</InfoLabel>
                                <InfoLabel>
                                    {format(
                                        new Date(item.createdAt),
                                        'dd/MM/yyyy'
                                    )}
                                </InfoLabel>
                            </Card>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </Content>
            )}
        </Container>
    );
}
