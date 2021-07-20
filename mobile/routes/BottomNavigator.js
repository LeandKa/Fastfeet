import React from 'react';
import Sign from '../pages/Sign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Perfil';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../pages/styles/colors';
import DetailsDelivery from '../pages/DetailsDelivery';
import Form from '../pages/Problem/Form';
import Details from '../pages/Problem/Details';
import ConfirmOrder from '../pages/ConfirmOrder';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#7d40e7',
                    elevation: 0,
                },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen
                name="Details"
                component={DetailsDelivery}
                options={{ title: 'Detalhes da encomenda' }}
            />
            <Stack.Screen
                name="FormProblems"
                component={Form}
                options={{ title: 'Informar Problema' }}
            />
            <Stack.Screen
                name="DetailsProblem"
                component={Details}
                options={{ title: 'Visualizar Problemas' }}
            />
            <Stack.Screen
                name="ConfirmOrder"
                component={ConfirmOrder}
                options={{ title: 'Confirmar Entrega' }}
            />
        </Stack.Navigator>
    );
};

export default function BottomNavigator(signed = false) {
    if (!signed) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Sign"
                    component={Sign}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }
    return (
        <Tab.Navigator
            tabToBarOptions={{
                activeTintColor: '#7D40E7',
                inactiveTintColor: '#999',
                style: {
                    backgroundColor: 'white',
                },
                keyboardHidesTabBar: true,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={MainStackNavigator}
                options={{
                    tabBarLabel: 'Entregas',
                    tabBarIcon: () => (
                        <MaterialIcon
                            name="menu"
                            size={25}
                            color={colors.primary}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Perfil}
                options={{
                    toBarLabel: 'Meu Perfil',
                    tabBarIcon: () => (
                        <IoniconsIcon
                            name="people-circle-outline"
                            size={25}
                            color={colors.primary}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
