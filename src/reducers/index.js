import { TYPES } from '../actions';

export const initialState = {
	storedData: [],
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.STORE_DATA:
			return { ...state, storedData: [...storedData, action.payload] };
		// case TYPES.OPEN_DATA:
		// 	return { ...state, storedData: { action.payload } };
		default:
			return state;
	}
};
