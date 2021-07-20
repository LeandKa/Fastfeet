import React, { useState } from 'react';
import { Camera } from 'expo-camera';
import colors from '../../pages/styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import { Cam, IconCamera } from './style';

export default function CameraComponent({ camRef, handleCamera }) {
    const [type, SetType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.auto);

    return (
        <Cam style={{ flex: 1 }} type={type} flashMode={flash} ref={camRef}>
            <IconCamera onPress={handleCamera}>
                <FontAwesome name="camera" size={32} color={colors.secondary} />
            </IconCamera>
        </Cam>
    );
}
