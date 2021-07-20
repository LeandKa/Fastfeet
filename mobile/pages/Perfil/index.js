import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionOut } from '../../store/modules/user/action';
import { format } from 'date-fns';
import {
    Avatar,
    Container,
    Content,
    ProfileLabel,
    InfoText,
    InfoLabel,
    ProfileContent,
    Button,
    Text,
} from './style';

export default function Perfil() {
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(getSessionOut());
    };

    return (
        <Container>
            <Content>
                <Avatar
                    source={
                        user.user.avatar
                            ? {
                                  uri: `http://192.168.0.11:3000/images/avatar/${user.user.avatar.path}`,
                              }
                            : require('../../assets/noImage.png')
                    }
                />
                <ProfileContent>
                    <ProfileLabel>
                        <InfoLabel>Nome Completo</InfoLabel>
                        <InfoText>{user.user.name}</InfoText>
                    </ProfileLabel>
                    <ProfileLabel>
                        <InfoLabel>Email</InfoLabel>
                        <InfoText>{user.user.email}</InfoText>
                    </ProfileLabel>
                    <ProfileLabel>
                        <InfoLabel>Data de cadastro</InfoLabel>
                        <InfoText>
                            {format(
                                new Date(user.user.createdAt),
                                'dd/MM/yyyy'
                            )}
                        </InfoText>
                    </ProfileLabel>
                    <Button onPress={handleLogout}>
                        <Text>Logout</Text>
                    </Button>
                </ProfileContent>
            </Content>
        </Container>
    );
}
