import styled from 'styled-components/native';
import colors from '../../pages/styles/colors';

export const Container = styled.View`
    border: 1px solid ${colors.detaitls}
    flex-direction: column;
    margin: 15px 0px;
    border-radius: 4px;
    padding:10px;
`;

export const DeliveryContainerId = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px 15px;
`;

export const DeliveryId = styled.Text`
    color: ${colors.primary};
    font-size: 14px;
    font-weight: bold;
    margin-left: 10px;
`;

export const ProgressContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ProgressStatusView = styled.View`
    border: 1px solid #7d40e7;
    border-radius: 180px;
    height: 12px;
    width: 12px;
    background-color: ${props =>
        props.active ? colors.primary : colors.secondary};
`;

export const ProgressLine = styled.View`
    height: 1px;
    background-color: ${colors.primary};
    width: 30%;
`;

export const ProgressStatusTextContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const ProgressStatusText = styled.Text`
    margin-top: 5px;
    color: ${colors.letter};
    font-size: 10px;
    width: ${props => (props.center ? '45%' : '22%')};
    text-align: center;
`;

export const DeliveryDetails = styled.View`
    background: ${colors.detaitls};
    flex-direction: row;
    width: auto;
    height: 64px;
    align-items: center;
    justify-content: space-between;
`;

export const DeliveryDetailsView = styled.View`
    width: auto;
    margin-left: 10px;
`;

export const InfoLabel = styled.Text`
    color: ${colors.letter};
    font-size: 8px;
`;

export const InfoText = styled.Text`
    color: ${colors.title};
    font-size: 12px;
`;

export const InfoDetails = styled.Text;
