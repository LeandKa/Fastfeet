import styled from 'styled-components/native';
import colors from '../styles/colors';

export const Container = styled.View`
    flex: 1;
    background: white;
`;

export const Background = styled.View`
    height: 20%;
    background: ${colors.primary};
`;

export const DetailsContent = styled.View`
    position: absolute;
    top: 30px;
    border-radius: 4px;
    width: 90%;
    align-items: center;
    align-self: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
`;

export const InfoCard = styled.View`
    border-radius: 4px;
    background: ${colors.secondary};
    border: 1px solid #0000001a;
    width: 90%;
    margin-bottom: 10px;
    flex-direction: column;
`;
export const DeliveryContainerId = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px 15px;
`;

export const DeliveryId = styled.Text`
    color: ${colors.primary};
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
`;

export const LabelsView = styled.View`
    width: auto;
    margin-left: 10px;
    margin-bottom: 15px;
`;

export const InfoLabel = styled.Text`
    font-weight: bold;
    color: ${colors.letter};
    font-size: 14px;
`;

export const InfoText = styled.Text`
    color: ${colors.title};
    font-size: 14px;
    font-weight: bold;
`;

export const LabelsViewDate = styled.View`
    width: auto;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 15px;
`;

export const ActionCard = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f9fd;
    margin: 10px 10px;
    border-radius: 5px;
`;

export const Button = styled.TouchableOpacity`
    height: 83px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
export const Text = styled.Text`
    margin-top: 5px;
    color: #999;
    font-size: 14px;
    text-align: center;
    max-width: 60%;
`;
