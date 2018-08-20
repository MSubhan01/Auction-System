import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import CombinedReducers from "./reducers/index";
import logger from 'redux-logger';
import 'rxjs';
import EpicMiddleware from "./middlewares/index";

let store = createStore(
    CombinedReducers,
    composeWithDevTools(
        applyMiddleware(
            EpicMiddleware,
            logger
        )
    )
)

export default store;