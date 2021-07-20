import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
    flex: 1;
    background: white;
`;

export const Background = styled.View`
    height: 20%;
    background: ${colors.primary};
`;

export const Content = styled.View`
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

export const Card = styled.View`
    border-radius: 4px;
    background: ${colors.secondary};
    border: 1px solid #0000001a;
    width: 90%;
    align-items: center;
    height: 50px;
    justify-content: space-around;
    margin-bottom: 10px;
    flex-direction: row;
`;

export const InfoLabel = styled.Text`
    font-weight: bold;
    color: ${colors.letter};
    font-size: 16px;
`;
