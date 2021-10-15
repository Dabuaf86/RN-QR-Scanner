import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Styles from './Styles';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const initialState = {
	permission: null,
	scanned: false,
	store: [],
};

const QrScannerScreen = () => {
	const [hasPermission, setHasPermission] = useState(initialState.permission);
	const [scanned, setScanned] = useState(initialState.scanned);
	const [store, setStore] = useState(initialState.store);

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		console.log(data);
		alert(`${data}`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	} else if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	} else
		return (
			<View style={Styles.container}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
				{scanned && (
					<Button title='Tap to scan again' onPress={() => setScanned(false)} />
				)}
			</View>
		);
};

export default QrScannerScreen;
