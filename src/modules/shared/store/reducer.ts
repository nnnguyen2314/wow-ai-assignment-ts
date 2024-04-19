import {AnyAction, combineReducers} from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

import todoSlice from '../../todo/store/todoSlice';

export const combinedReducer = combineReducers({
    todo: todoSlice
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type === REHYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export default reducer;