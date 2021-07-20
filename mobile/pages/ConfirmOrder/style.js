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

export const DefaultImage = styled.Image`
    width: 335px;
    height: 444px;
`;

export const IconCamera = styled.View`
    position: absolute;
    padding: 15px 15px 15px 15px;
    background: #0000004d;
    top: 370px;
    border-radius: 50px;
`;

export const Button = styled.TouchableOpacity`
    width: 335px;
    height: 45px;
    margin-top: 10px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-self: center;
    background: ${colors.primary};
`;
export const Text = styled.Text`
    color: ${colors.secondary};
    font-size: 16px;
`;
