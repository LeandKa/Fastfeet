import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Constants from 'expo-constants';
import colors from '../styles/colors';

const statusBarHeight =
    Platform.OS === 'android' ? Constants.statusBarHeight : 0;

export const Wrapper = styled.SafeAreaView`
    background: white;
    flex: 1;
    padding-top: ${statusBarHeight + 'px'};
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 68px;
    margin-top: 25px;
    padding: 10px;
`;

export const Avatar = styled.Image`
    width: 68px;
    height: 68px;
    border-radius: 50px;
`;

export const HeaderInfo = styled.View`
    width: auto;
    height: auto;
`;

export const SubTitle = styled.Text`
    color: ${colors.border};
    font-size: 12px;
`;

export const Title = styled.Text`
    color: ${colors.title};
    font-size: 22px;
`;

export const ListHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 10px;
`;
export const ListHeaderCategoria = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 45%;
`;

export const CategoryText = styled.Text`
    font-weight: bold;
    font-size: 15px;
    color: ${props => (props.selected ? '#7D40E7' : '#666')};
    text-decoration: ${props => (props.selected ? 'underline' : 'none')};
`;
