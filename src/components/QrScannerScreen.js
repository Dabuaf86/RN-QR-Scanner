import React, { useEffect, useReducer, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Vibration,
	Linking,
} from 'react-native';
import Styles from './Styles';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { scanHistoryinitialState, scanHistoryReducer } from '../reducers';
import { TYPES } from '../actions';

export const initialState = {
	permission: null,
	scanned: false,
	data: '',
};

const QrScannerScreen = () => {
	const [hasPermission, setHasPermission] = useState(initialState.permission);
	const [scanned, setScanned] = useState(initialState.scanned);
	const [data, setData] = useState(initialState.data);

	const [state, dispatch] = useReducer(
		scanHistoryReducer,
		scanHistoryinitialState
	);

	// const { storedData } = state;

	const storeData = data => {
		dispatch({ type: TYPES.STORE_DATA, payload: data });
		// console.log(data);
	};

	useEffect(() => {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			if (status === 'granted') setHasPermission(status);
		})();
	}, []);

	const handleBarCodeScanned = ({ data }) => {
		try {
			if (data !== undefined && data !== '') {
				Vibration.vibrate();
				setScanned(true);
				setData(data);
				storeData(data);
			} else return;
		} catch (err) {
			console.error(err);
		}
	};

	const handleLink = async () => await Linking.openURL(data);

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	} else if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={Styles.container}>
			<View style={Styles.box}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</View>
			<View style={Styles.box2}>
				{scanned && (
					<View style={Styles.container}>
						<Text selectable={true} style={Styles.content}>
							{data}
						</Text>
					</View>
				)}
				{scanned && (
					<View style={Styles.box3}>
						<TouchableOpacity style={Styles.btnContainer} onPress={handleLink}>
							<Text style={Styles.goTotBtn}>Open Url</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={Styles.btnContainer}
							onPress={() => setScanned(false)}
						>
							<Text style={Styles.newScanBtn}>Scan again</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};

export default QrScannerScreen;
