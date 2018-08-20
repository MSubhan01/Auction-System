import AuthAction from '../actions/AuthAction'

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  history: {},
  user: {},
  error: "",
  Users: {},
  loading: {
    Name: "",
    Email: "",
    Password: "",
    Catogary: "",
    Skills: "",
    Education: "",
    Experience: "",
    Uid: "",
  },
  auth: {
    Name: "",
    Email: "",
    Password: "",
    Catogary: "",
    Skills: "",
    Education: "",
    Experience: "",
    Uid: "",
  },
}

function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case AuthAction.SIGNUP:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        history: action.history,
        loading: {
          ...action.payload
        }
      });

    case AuthAction.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
        isLoggedIn: action.isLoggedIn,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.SIGNIN:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        history: action.history,
        error: "",
        loading: {
          ...action.payload
        }
      });

    case AuthAction.SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.SIGNIN_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.SIGNOUT:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        history: action.history,
      });

    case AuthAction.SIGNOUT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
        isLoggedIn: action.isLoggedIn,
        auth: {
          ...action.payload
        }
      });

    case AuthAction.SIGNOUT_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.DATA:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        history: action.history,
        user: action.user,
      });

    case AuthAction.DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
        auth: {
          ...action.payload
        },
        Users: {
          ...action.Users
        }
      });

    case AuthAction.DATA_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    default:
      return state;
  }

}

export default AuthReducer;