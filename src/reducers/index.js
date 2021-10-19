import { TYPES } from '../actions';

export const scanHistoryinitialState = {
	storedData: [],
};

export const scanHistoryReducer = (state, action) => {
	switch (action.type) {
		case TYPES.STORE_DATA:
			return {
				...state,
				storedData: [...state.storedData, action.payload],
			};
		case TYPES.OPEN_DATA:
			return {
				//  ...state, storedData: { action.payload }
			};
		case TYPES.SEARCH_DATA: {
			let searchMatches = [];
			state.storedData.map(item => {
				if (item.includes(action.payload)) searchMatches.push(item);
			});
			// let searchMatches = state.storedData.filter(item =>
			// 	item.includes(action.payload)
			// );
			return searchMatches.length > 0
				? { ...state, storedData: searchMatches }
				: state;
		}
		case TYPES.DELETE_DATA: {
			let itemToDelete = state.storedData.find(
				item => indexOf(item) === action.payload
			);
			return {
				...state,
				storedData: state.storedData.filter(item => item !== itemToDelete),
			};
		}
		case TYPES.CLEAR_HISTORY:
			return scanHistoryinitialState;
		default:
			return state;
	}
};
