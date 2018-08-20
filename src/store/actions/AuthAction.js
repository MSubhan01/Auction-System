export default class AuthAction {

    static SIGNUP = "SIGNUP";
    static SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
    static SIGNUP_FAILURE = "SIGNUP_FAILURE";
    static SIGNIN = "SIGNIN";
    static SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
    static SIGNIN_FAILURE = "SIGNIN_FAILURE";
    static SIGNOUT = "SIGNOUT";
    static SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
    static SIGNOUT_FAILURE = "SIGNOUT_FAILURE";
    static DATA = "DATA";
    static DATA_SUCCESS = "DATA_SUCCESS";
    static DATA_FAILURE = "DATA_FAILURE";

    static signup(payload, history) {
        return {
            type: this.SIGNUP,
            isLoading: true,
            payload,
            history
        }
    }

    static signin(payload, history) {
        return {
            type: this.SIGNIN,
            isLoading: true,
            payload,
            history
        }
    }

    static signout(history) {
        return {
            type: this.SIGNOUT,
            isLoading: true,
            history
        }
    }

    static data(user, history) {
        return {
            type: this.DATA,
            isLoading: true,
            history,
            user,
        }
    }

}