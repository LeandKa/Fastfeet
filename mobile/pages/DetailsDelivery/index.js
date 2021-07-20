import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Loading from '../../components/Loading';
import {
    Background,
    Container,
    DetailsContent,
    InfoCard,
    DeliveryContainerId,
    DeliveryId,
    LabelsView,
    InfoLabel,
    InfoText,
    LabelsViewDate,
    ActionCard,
    Button,
    Text,
} from './style';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonicIcons from 'react-native-vector-icons/Ionicons';

export default function DetailsDelivery({ route, navigation }) {
    const { id } = route.params;
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getOrder() {
            const response = await api.get(`/order/${id}`);
            setOrder(response.data);
            setLoading(false);
        }

        getOrder();
    }, []);

    return (
        <Container>
            <Background />
            {loading ? (
                <Loading />
            ) : (
                <DetailsContent>
                    <InfoCard>
                        <DeliveryContainerId>
                            <Icon
                                name="local-shipping"
                                size={24}
                                style={{ color: '#7D40E7' }}
                            />
                            <DeliveryId>Informações da Entrega</DeliveryId>
                        </DeliveryContainerId>
                        <LabelsView>
                            <InfoLabel>DESTINATÁRIO</InfoLabel>
                            <InfoText>{order.recipient.name}</InfoText>
                        </LabelsView>
                        <LabelsView>
                            <InfoLabel>ENDEREÇO DE ENTREGA</InfoLabel>
                            <InfoText>{order.recipient.adress}</InfoText>
                        </LabelsView>
                        <LabelsView>
                            <InfoLabel>PRODUTO</InfoLabel>
                            <InfoText>{order.product}</InfoText>
                        </LabelsView>
                    </InfoCard>

                    <InfoCard>
                        <DeliveryContainerId>
                            <Icon
                                name="date-range"
                                size={24}
                                style={{ color: '#7D40E7' }}
                            />
                            <DeliveryId>Situação da Entrega</DeliveryId>
                        </DeliveryContainerId>
                        <LabelsView>
                            <InfoLabel>STATUS</InfoLabel>
                            <InfoText>{order.status}</InfoText>
                        </LabelsView>
                        <LabelsViewDate>
                            <LabelsView>
                                <InfoLabel>DATA DE RETIRADA</InfoLabel>
                                {order.start_date === null ? (
                                    <InfoText>--/--/--</InfoText>
                                ) : (
                                    <InfoText>
                                        {format(
                                            new Date(order.start_date),
                                            'dd/MM/yyyy'
                                        )}
                                    </InfoText>
                                )}
                            </LabelsView>
                            <LabelsView>
                                <InfoLabel>DATA DE ENTREGA</InfoLabel>
                                {order.end_date === null ? (
                                    <InfoText>--/--/--</InfoText>
                                ) : (
                                    <InfoText>
                                        {format(
                                            new Date(order.end_date),
                                            'dd/MM/yyyy'
                                        )}
                                    </InfoText>
                                )}
                            </LabelsView>
                        </LabelsViewDate>
                    </InfoCard>
                    <ActionCard>
                        <Button
                            onPress={() =>
                                navigation.navigate('FormProblems', {
                                    id,
                                })
                            }
                        >
                            <IonicIcons
                                name="ios-close-circle-outline"
                                size={24}
                                style={{ color: '#E74040' }}
                            />
                            <Text>Informar Problema</Text>
                        </Button>
                        <Button
                            onPress={() =>
                                navigation.navigate('DetailsProblem', {
                                    id,
                                })
                            }
                        >
                            <Icon
                                name="info-outline"
                                size={24}
                                style={{ color: '#E7BA40' }}
                            />
                            <Text>Visualizar Problema</Text>
                        </Button>
                        <Button
                            onPress={() =>
                                navigation.navigate('ConfirmOrder', {
                                    id,
                                })
                            }
                        >
                            <IonicIcons
                                name="ios-checkmark-circle-outline"
                                size={24}
                                style={{ color: '#7D40E7' }}
                            />
                            <Text>Confirmar Entrega</Text>
                        </Button>
                    </ActionCard>
                </DetailsContent>
            )}
        </Container>
    );
}
