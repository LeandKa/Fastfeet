import styled from 'styled-components/native';
import colors from '../styles/colors';

export const Container = styled.View`
    flex: 1;
    padding: 15px;
    background: ${colors.secondary};
`;

export const Content = styled.View`
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const Avatar = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 50px;
`;

export const ProfileContent = styled.View`
    flex-direction: column;
    justify-content: flex-start;
`;

export const ProfileLabel = styled.View`
    width: auto;
    margin-left: 10px;
`;

export const InfoLabel = styled.Text`
    color: ${colors.letter};
    font-size: 12px;
`;

export const InfoText = styled.Text`
    color: ${colors.title};
    font-size: 22px;
`;

export const Button = styled.TouchableOpacity`
    width: 305px;
    height: 45px;
    margin-top: 30px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-self: center;
    background: ${colors.exit};
`;

export const Text = styled.Text`
    color: ${colors.secondary};
    font-size: 16px;
`;
