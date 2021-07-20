import React from 'react';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Container,
    DeliveryContainerId,
    DeliveryId,
    ProgressLine,
    ProgressContainer,
    ProgressStatusView,
    ProgressStatusTextContainer,
    ProgressStatusText,
    DeliveryDetails,
    DeliveryDetailsView,
    InfoLabel,
    InfoText,
} from './style';

export default function OrderCard({
    id,
    start_date,
    end_date,
    city,
    created_at,
    navigation,
}) {
    const handlePress = () => {
        navigation.navigate('Details', {
            id,
        });
    };

    return (
        <Container>
            <DeliveryContainerId>
                <Icon
                    name="local-shipping"
                    size={32}
                    style={{ color: '#7D40E7' }}
                />
                <DeliveryId>
                    Encomenda {id.toString().length === 1 ? `0${id}` : id}
                </DeliveryId>
            </DeliveryContainerId>
            <ProgressContainer>
                <ProgressStatusView active />
                <ProgressLine />
                <ProgressStatusView active={start_date !== null} />
                <ProgressLine />
                <ProgressStatusView active={end_date !== null} />
            </ProgressContainer>
            <ProgressStatusTextContainer>
                <ProgressStatusText>Aguardando Retirada</ProgressStatusText>
                <ProgressStatusText center>Retirada</ProgressStatusText>
                <ProgressStatusText>Entregue</ProgressStatusText>
            </ProgressStatusTextContainer>
            <DeliveryDetails>
                <DeliveryDetailsView>
                    <InfoLabel>Data</InfoLabel>
                    <InfoText>
                        {format(new Date(created_at), 'dd/MM/yyyy')}
                    </InfoText>
                </DeliveryDetailsView>
                <DeliveryDetailsView>
                    <InfoLabel>Cidade</InfoLabel>
                    <InfoText>{city}</InfoText>
                </DeliveryDetailsView>
                <DeliveryId onPress={() => handlePress(id)}>
                    Ver detalhes
                </DeliveryId>
            </DeliveryDetails>
        </Container>
    );
}
