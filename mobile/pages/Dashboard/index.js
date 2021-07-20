import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionOut } from '../../store/modules/user/action';
import { Alert, FlatList, Text } from 'react-native';
import api from '../../services/api';
import Loading from '../../components/Loading';
import OrderCard from '../../components/OrderCard';
import 'dotenv';
import {
    Header,
    Avatar,
    HeaderInfo,
    SubTitle,
    Title,
    ListHeader,
    ListHeaderCategoria,
    CategoryText,
    Wrapper,
} from './style';

export default function Dashboard({ navigation }) {
    const [delivered, setDelivered] = useState(false);
    const { user } = useSelector(state => state.users);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    async function loadOrders() {
        try {
            const response = await api.get(
                `deliveryman/${user.user.id}/deliveries?delivered=${delivered}`
            );

            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            Alert.alert(
                'Erro ao carregar entregas',
                'Não foi possível carregar suas entregas!'
            );
        }
    }

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        loadOrders();
    }, [delivered]);

    return (
        <Wrapper>
            <Header>
                <Avatar
                    source={
                        user.user.avatar
                            ? {
                                  uri: `${process.env.BASE_URL}/images/avatar/${user.user.avatar.path}`,
                              }
                            : require('../../assets/noImage.png')
                    }
                />
                <HeaderInfo>
                    <SubTitle>Bem vindo de volta,</SubTitle>
                    <Title>{user.user.name}</Title>
                </HeaderInfo>
                <Icon
                    name="exit-to-app"
                    size={28}
                    style={{ color: '#E74040' }}
                    onPress={() => dispatch(getSessionOut())}
                />
            </Header>
            <ListHeader>
                <Title>Entregas</Title>
                <ListHeaderCategoria>
                    <CategoryText
                        selected={!delivered}
                        onPress={() => setDelivered(false)}
                    >
                        Pendentes
                    </CategoryText>
                    <CategoryText
                        selected={delivered}
                        onPress={() => setDelivered(true)}
                    >
                        Entregues
                    </CategoryText>
                </ListHeaderCategoria>
            </ListHeader>
            {loading ? (
                <Loading />
            ) : (
                <FlatList
                    data={orders}
                    renderItem={({ item }) => (
                        <OrderCard
                            navigation={navigation}
                            created_at={item.created_at}
                            id={item.id}
                            start_date={item.start_date}
                            end_date={item.end_date}
                            city={item.recipient.city}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </Wrapper>
    );
}
