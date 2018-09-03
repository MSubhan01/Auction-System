import Middleware from './Middleware'
import { combineEpics, createEpicMiddleware } from 'redux-observable';

const EpicMiddleware = (
    createEpicMiddleware(
        combineEpics(
            Middleware.signup,
            Middleware.signin,
            Middleware.signout,
            Middleware.data,
            Middleware.post,
            Middleware.bid,
            Middleware.sold,
        )
    )
)
export default EpicMiddleware