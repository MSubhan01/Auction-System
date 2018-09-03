import AuthAction from '../actions/AuthAction'

const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: true,
  isError: false,
  Products: [],
  Product: {
    name: "",
    description: "",
    bidAmount: "",
    file: "",
    endTime: "",
    Uid: "",
    user: "",
    catogary: "",
  },
  Bid: {
    Name: "",
    Email: "",
    Uid: "",
    bidAmount: 0,
  },
}

function Products(state = INITIAL_STATE, action) {
  switch (action.type) {

    case AuthAction.POST:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        history: action.history,
        Product: action.Product,
      });

    case AuthAction.POST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.POST_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.DATA:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        history: action.history,
        Product: action.Product,
      });

    case AuthAction.DATA_SUCCESS:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
        Products: action.Products,
      });

    case AuthAction.DATA_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.BID:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        Bid: action.Bid,
      });

    case AuthAction.BID_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.BID_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.SOLD:
      return Object.assign({}, state, {
        // isLoading: action.isLoading,
      });

    case AuthAction.SOLD_SUCCESS:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    case AuthAction.SOLD_FAILURE:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        isError: action.isError,
        error: action.error,
      });

    default:
      return state;
  }

}

export default Products;