import AuthAction from "../actions/AuthAction";
import firebase from "firebase"
import { Observable } from "rxjs";

export default class Middleware {

    ////////////////////////////////////
    //////*     Authentication   *//////
    ////////////////////////////////////

    static signup(action$) {
        return action$.ofType(AuthAction.SIGNUP)
            .switchMap((payload) => {
                let { Name, Email, Password } = payload.payload
                return firebase.auth().createUserWithEmailAndPassword(Email, Password)
                    .then((user) => {
                        return user.updateProfile({
                            displayName: Name,
                        })
                            .then(() => {
                                return firebase.database().ref(`Users/${user.uid}`).set({ ...payload.payload, Uid: user.uid })
                                    .then(() => {
                                        payload.history.push("/dashboard")
                                        return {
                                            type: AuthAction.SIGNUP_SUCCESS,
                                            isLoading: false, isLoggedIn: true, isError: false,
                                            payload: {
                                                Name, Email, Uid: user.uid
                                            }
                                        }
                                    })
                                    .catch(() => {
                                        user.delete()
                                            .then(() => {
                                                return {
                                                    type: AuthAction.SIGNUP_FAILURE,
                                                    isLoading: false, isError: true, error: "Something Went Wrong"
                                                }
                                            })
                                            .catch((error) => {
                                                alert(error.message + "error 3")
                                                return {
                                                    type: AuthAction.SIGNUP_FAILURE,
                                                    isLoading: false, isError: true, error: error.message
                                                }
                                            })
                                    })
                            })
                            .catch((error) => {
                                user.delete()
                                    .then(() => {
                                        return {
                                            type: AuthAction.SIGNUP_FAILURE,
                                            isLoading: false, isError: true, error: "Something Went Wrong"
                                        }
                                    })
                                    .catch((error) => {
                                        alert(error.message + "error 2")
                                        return {
                                            type: AuthAction.SIGNUP_FAILURE,
                                            isLoading: false, isError: true, error: error.message
                                        }
                                    })
                            })
                    })
                    .catch((error) => {
                        alert(error.message + "error 1")
                        return {
                            type: AuthAction.SIGNUP_FAILURE,
                            isLoading: false, isError: true, error: error.message
                        }
                    })
            })
    }

    static signin(action$) {
        return action$.ofType(AuthAction.SIGNIN)
            .mergeMap((payload) => {
                let email = payload.payload.Email
                let password = payload.payload.Password
                return firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        if (user.displayName !== "Admin") {
                            payload.history.push("/dashboard")
                            return {
                                type: AuthAction.SIGNIN_SUCCESS,
                                isLoading: false, isLoggedIn: true, isError: false,
                                payload: {
                                    Email: user.email, Name: user.displayName, Uid: user.Uid
                                }
                            }
                        } else {
                            payload.history.push("/admin")
                            return {
                                type: AuthAction.SIGNIN_SUCCESS,
                                isLoading: false, isLoggedIn: true, isError: false,
                                payload: {
                                    Email: user.email, Name: user.displayName, Uid: user.Uid
                                }
                            }
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.SIGNIN_FAILURE,
                            isError: true, isLoading: false, error: error.message
                        }
                    })
            })
    }

    static signout(action$) {
        return action$.ofType(AuthAction.SIGNOUT)
            .switchMap((payload) => {
                return firebase.auth().signOut()
                    .then(() => {
                        payload.history.push("/")
                        return {
                            type: AuthAction.SIGNOUT_SUCCESS,
                            isLoggedIn: false, isLoading: false, isError: false,
                            payload: {
                                Name: "", Email: "", Uid: "",
                            },
                        }
                    })
                    .catch((error) => {
                        alert(error.message)
                        return {
                            type: AuthAction.SIGNOUT_FAILURE,
                            isError: true, isLoading: false, error: error.message
                        }
                    });
            })
    }

    static data(action$, store) {
        return action$.ofType(AuthAction.DATA)
            .switchMap((payload) => {
                return Observable.fromPromise(
                    new Promise((res, rej) => {
                        let Auth = { Email: payload.user.email, Name: payload.user.displayName, Uid: payload.user.uid }
                        return firebase.database().ref('/').on("value", (data) => {
                            let locationKeys = []
                            let Locations = []
                            let bookKeys = []
                            let Bookings = []
                            let feedbackKeys = []
                            let Feedbacks = []
                            let Feedback = []
                            switch (true) {
                                case (data.val() && data.val().Locations !== undefined && data.val().Bookings !== undefined):
                                    locationKeys = Object.keys(data.val().Locations); Locations = Object.values(data.val().Locations); Locations.map((value, index) => value.Key = locationKeys[index])
                                    bookKeys = Object.keys(data.val().Bookings); Bookings = Object.values(data.val().Bookings); Bookings.map((value, index) => value.Index = bookKeys[index])
                                    break;
                                case (data.val() && data.val().Locations !== undefined):
                                    locationKeys = Object.keys(data.val().Locations); Locations = Object.values(data.val().Locations); Locations.map((value, index) => value.Key = locationKeys[index])
                                    break;
                                case (data.val() && data.val().Bookings !== undefined):
                                    bookKeys = Object.keys(data.val().Bookings); Bookings = Object.values(data.val().Bookings); Bookings.map((value, index) => value.Index = bookKeys[index])
                                    break;
                                default:
                                    console.log("Wrong")
                                    break;
                            }
                            if (payload.user.displayName !== "Admin") {
                                switch (true) {
                                    case (data.val() && data.val().Feedback !== undefined):
                                        feedbackKeys = Object.keys(data.val().Feedback); Feedbacks = Object.values(data.val().Feedback);
                                        Feedbacks.filter((Feedback) => { console.log(Feedback.Uid === Auth.Uid, Feedback.Uid, Auth.Uid); return Feedback.Uid === Auth.Uid }).map((value, index) => { console.log(value); value.Key = feedbackKeys[index]; Feedback.push(value) })
                                        console.log(Feedback);
                                        break;
                                    default:
                                        Feedback
                                        break;
                                }
                                payload.history.push("/dashboard")
                                let me = firebase.auth().currentUser
                                return data.val().Users === undefined || data.val().Users[Auth.Uid] === undefined
                                    ? me.delete()
                                        .then(() => {
                                            return {
                                                type: AuthAction.DATA_FAILURE,
                                                isLoading: false, isError: true, error: "Something Went Wrong"
                                            }
                                        })
                                        .catch((error) => {
                                            alert(error.message)
                                            return {
                                                type: AuthAction.DATA_FAILURE,
                                                isLoading: false, isError: true, error: error.message
                                            }
                                        })
                                    : store.dispatch({
                                        type: AuthAction.DATA_SUCCESS,
                                        isLoading: false, isLoggedIn: true, isError: false,
                                        Locations, Bookings, Feedback, payload: Auth
                                    })
                            } else {
                                payload.history.push("/admin")
                                if (data.val().Feedback) {
                                    feedbackKeys = Object.keys(data.val().Feedback); Feedbacks = Object.values(data.val().Feedback);
                                    Feedbacks.map((value, index) => { value.Key = feedbackKeys[index]; Feedback.push(value) })
                                } else {
                                    Feedback
                                }
                                return store.dispatch({
                                    type: AuthAction.DATA_SUCCESS,
                                    isLoading: false, isLoggedIn: true, isError: false,
                                    Locations, Bookings, Feedback, payload: Auth,
                                    Users: data.val().Users
                                })
                            }
                        })
                    })
                )
            })
    }

}