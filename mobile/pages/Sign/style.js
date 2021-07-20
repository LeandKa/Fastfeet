import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import colors from '../styles/colors';
import { Form } from '@unform/mobile';

const statusBarHeight =
    Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
    background: white;
    flex: 1;
    padding-top: ${statusBarHeight + 'px'};
`;

export const Container = styled.View`
    background: ${colors.primary};
    height: 100%;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 244px;
    height: 48px;
    align-self: center;
`;

export const FormContainer = styled(Form)`
    display: flex;
    padding: 10px 20px 10px 20px;
`;

export const FormButton = styled.TouchableOpacity`
    width: 305px;
    height: 45px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    align-self: center;
    background: ${colors.confirm};
`;
export const Text = styled.Text`
    color: ${colors.secondary};
    font-size: 16px;
`;
