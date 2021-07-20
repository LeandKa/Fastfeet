import styled from 'styled-components';
import { Camera } from 'expo-camera';

export const Cam = styled(Camera)`
    width: 340px;
    height: 440px;
`;

export const IconCamera = styled.TouchableOpacity`
    position: absolute;
    padding: 15px 15px 15px 15px;
    background: #0000004d;
    top: 370px;
    border-radius: 50px;
`;
