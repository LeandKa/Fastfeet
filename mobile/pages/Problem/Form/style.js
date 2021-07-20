import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { Form } from '@unform/mobile';

export const Container = styled.View`
    flex: 1;
    background: white;
`;

export const Background = styled.View`
    height: 20%;
    background: ${colors.primary};
`;

export const Content = styled(Form)`
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

export const Button = styled.TouchableOpacity`
    width: 305px;
    height: 45px;
    border-radius: 5px;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
    align-self: center;
    background: ${colors.primary};
`;

export const Text = styled.Text`
    color: ${colors.secondary};
    font-size: 16px;
`;
