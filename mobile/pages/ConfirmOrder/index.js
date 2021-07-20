import React, { useEffect, useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import CameraComponent from '../../components/Camera/';
import api from '../../services/api';
import {
    Background,
    Container,
    Content,
    DefaultImage,
    IconCamera,
    Button,
    Text,
} from './style';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../styles/colors';
import { Alert } from 'react-native';

export default function ConfirmOrder({ route }) {
    const camRef = useRef(null);
    const { id } = route.params;
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getCamera() {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        }

        getCamera();
    }, []);

    async function handleCamera() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            const datas = new FormData();

            const fileName = data.uri.split('/Camera/')[1];
            const name = fileName.split('.')[0];
            const extension = fileName.split('.')[1];

            datas.append('avatar', {
                uri: data.uri,
                type: `image/${extension}`,
                name,
            });

            try {
                const response = await api.post('/files', datas);
                setOpen(true);
                setLoading(false);
                setCapturedPhoto(data.uri);
                setImage(response.data.files.id);
            } catch (error) {
                Alert.alert('Algum erro aconteceu');
            }
            setOpen(true);
        }
    }

    async function handleSubmit() {
        try {
            const response = await api.post('/deliveryman/end', {
                order_id: id,
                signature_id: image,
            });
            if (response) {
                Alert.alert('Pedido entregue com sucesso');
                setOpen(null);
                setCapturedPhoto(null);
            }
        } catch (error) {
            Alert.alert('Algum erro aconteceu');
        }
    }

    if (hasPermission === null) {
        return (
            <Container>
                <Background />
                <Content>
                    <DefaultImage
                        source={require('../../assets/preview.png')}
                    />
                </Content>
            </Container>
        );
    }
    if (hasPermission === false) {
        return (
            <Container>
                <Background />
                <Content>
                    <DefaultImage
                        source={require('../../assets/preview.png')}
                    />
                    <IconCamera onPress={handleCamera}>
                        <FontAwesome
                            name="camera"
                            size={32}
                            color={colors.secondary}
                        />
                    </IconCamera>
                    <Button onPress={handleSubmit}>
                        <Text>Enviar</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
    return (
        <Container>
            <Background />
            <Content>
                {open ? (
                    <>
                        <DefaultImage source={{ uri: capturedPhoto }} />
                        <Button onPress={handleSubmit}>
                            <Text>Enviar</Text>
                        </Button>
                    </>
                ) : (
                    <CameraComponent
                        handleCamera={handleCamera}
                        camRef={camRef}
                    />
                )}
            </Content>
        </Container>
    );
}
