import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";

const CombinedReducers = combineReducers({
    AuthReducer,
})
export default CombinedReducers