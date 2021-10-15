import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QrScannerScreen from './components/QrScannerScreen';
import HistoryScreen from './components/HistoryScreen';
// import Styles from './components/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='Scanner'
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === 'Scanner') {
							iconName = focused ? 'barcode' : 'barcode-outline';
						} else if (route.name === 'History') {
							iconName = focused ? 'list' : 'list-outline';
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'darkred',
					tabBarInactiveTintColor: 'gray',
					headerTitleAlign: 'center',
					headerTitleStyle: {
						color: 'darkred',
					},
				})}
			>
				<Tab.Screen name='Scanner' component={QrScannerScreen} />
				<Tab.Screen name='History' component={HistoryScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
