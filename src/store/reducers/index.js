import { combineReducers } from 'redux';
import AuthReducer from "./AuthReducer";
import Products from "./Products";

const CombinedReducers = combineReducers({
    AuthReducer,
    Products,
})
export default CombinedReducers