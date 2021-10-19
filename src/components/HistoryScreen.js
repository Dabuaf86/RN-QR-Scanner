import React, { useReducer, useRef, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Animated,
	TouchableOpacity,
} from 'react-native';
import { TYPES } from '../actions';
// import { SPACING } from '../constants/constants';
import { scanHistoryinitialState, scanHistoryReducer } from '../reducers';
import Styles from './Styles';

const HistoryScreen = () => {
	const [state, dispatch] = useReducer(
		scanHistoryReducer,
		scanHistoryinitialState
	);
	const { storedData } = state;

	const [input, setInput] = useState('');

	const openData = () => {};
	const searchData = input => {
		dispatch({ type: TYPES.SEARCH_DATA, payload: input });
	};
	const deleteData = index => {
		dispatch({ type: TYPES.DELETE_DATA, payload: index });
	};
	const clearHistory = () => {
		dispatch({ type: TYPES.CLEAR_HISTORY });
	};

	const handleSubmit = () => {
		if (input.length) {
			searchData(input);
			setInput('');
		}
	};

	// useRef to keep track of my values so when it re-renders I don't lose the initial value of the scrollY and it will remain the same during lifecicle of the component
	const scrollY = useRef(new Animated.Value(0)).current;

	return (
		<View style={{ flex: 1 }}>
			<View style={Styles.searchBar}>
				<TouchableOpacity onPress={clearHistory} style={Styles.clearBtn}>
					<Text style={{ fontSize: 20 }}>🗑</Text>
					<Text style={Styles.clearText}>Clear</Text>
				</TouchableOpacity>
				<TextInput
					value={input}
					onChangeText={text => setInput(text)}
					enablesReturnKeyAutomatically={true}
					placeholder='Search your QR codes'
					style={Styles.searchInput}
				/>
				<TouchableOpacity onPress={handleSubmit} style={Styles.searchBtn}>
					<Text>🔍</Text>
				</TouchableOpacity>
			</View>
			{storedData && (
				<Animated.FlatList
					// style={{ backgroundColor: 'black' }}
					data={storedData}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: true }
					)}
					keyExtractor={item => item.key}
					renderItem={({ item, index }) => {
						// const inputRange = [
						// 	-1,
						// 	0,
						// 	SPACING * 3 * index,
						// 	SPACING * 3 * (index + 1),
						// ];
						// const scale = scrollY.interpolate({
						// 	inputRange,
						// 	outputRange: [1, 1, 1, 1],
						// });
						return (
							<Animated.View
								style={[
									Styles.scrollViewCards,
									// {
									// 	transform: [{ scale }],
									// },
								]}
							>
								<TouchableOpacity
									onPress={() => deleteData(index)}
									style={Styles.deleteCardBtn}
								>
									<Text style={{ fontSize: 16 }}>🗑</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => openData(index)}>
									<Text key={item => item.key} style={Styles.cardData}>
										{item}
									</Text>
								</TouchableOpacity>
							</Animated.View>
						);
					}}
				/>
			)}
		</View>
	);
};

export default HistoryScreen;
