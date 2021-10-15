import React from 'react';
import { View, Text } from 'react-native';
import Styles from './Styles';

const QrScannerScreen = () => {
	return (
		<View style={Styles.container}>
			<Text style={Styles.content}>Mi scanner</Text>
		</View>
	);
};

export default QrScannerScreen;
