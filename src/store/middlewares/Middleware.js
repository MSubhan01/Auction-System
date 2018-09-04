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
                            if (data.val().Users === undefined || data.val().Users[Auth.Uid] === undefined) {
                                return firebase.auth().signOut()
                                    .then(() => {
                                        alert("Please Sign In Again")
                                        payload.history.push("/")
                                        return store.dispatch({
                                            type: AuthAction.SIGNOUT_SUCCESS,
                                            isLoggedIn: false, isLoading: false, isError: false,
                                            payload: {
                                                Name: "", Email: "", Uid: "",
                                            },
                                        })
                                    })
                                    .catch((error) => {
                                        alert(error.message)
                                        return store.dispatch({
                                            type: AuthAction.SIGNOUT_FAILURE,
                                            isError: true, isLoading: false, error: error.message
                                        })
                                    })
                            } else {
                                payload.history.push("/dashboard")
                                if (data.val().Products !== undefined) {
                                    let Products = []
                                    let keys = Object.keys(data.val().Products)
                                    Object.values(data.val().Products)
                                        .map((Product, index) => {
                                            Product.index = keys[index]
                                            return Products.push(Product)
                                        })
                                    return store.dispatch({
                                        type: AuthAction.DATA_SUCCESS,
                                        isLoading: false, isLoggedIn: true, isError: false,
                                        payload: Auth, Products
                                    })
                                } else {
                                    return store.dispatch({
                                        type: AuthAction.DATA_SUCCESS,
                                        isLoading: false, isLoggedIn: true, isError: false,
                                        payload: Auth, Products: []
                                    })
                                }
                            }
                        })
                    })
                )
            })
    }

    static post(action$, store) {
        return action$.ofType(AuthAction.POST)
            .switchMap((payload) => {
                let time = new Date(payload.Product.endTime).getTime().toString()
                let file = payload.Product.file;
                let storage = firebase.storage().ref('try_out/').child(time);
                let task = storage.put(file)
                return task.on('state_changed',
                    function progress(snapshot) { },
                    function error(error) {
                        alert(error)
                        return {
                            type: AuthAction.POST_FAILURE,
                            isLoading: false, isError: true, error: error.message
                        }
                    },
                    function complete() {
                        return storage.getDownloadURL()
                            .then((url) => {
                                return firebase.database().ref("Products").push({ ...payload.Product, url, sold: false, notSold: false, buyer: { Email: "", Name: "", Uid: "", bidAmount: "" } })
                                    .then(() => {
                                        alert("Product Posted")
                                        return {
                                            type: AuthAction.POST_SUCCESS,
                                            isLoading: false, isError: false,
                                        }
                                    })
                                    .catch((error) => {
                                        alert(error.message)
                                        return {
                                            type: AuthAction.POST_FAILURE,
                                            isLoading: false, isError: true, error: error.message
                                        }
                                    })
                            }).catch((error) => {
                                alert(error.message)
                                return {
                                    type: AuthAction.POST_FAILURE,
                                    isLoading: false, isError: true, error: error.message
                                }
                            });
                    },
                )
            })
    }

    static bid(action$, store) {
        return action$.ofType(AuthAction.BID)
            .switchMap((payload) => {
                return firebase.database().ref(`Products/${payload.index}/Bids`).push(payload.Bid)
                    .then(() => {
                        alert("Bid Applied")
                        return {
                            type: AuthAction.BID_SUCCESS,
                            isLoading: false, isError: false,
                        }
                    })
                    .catch((error) => {
                        alert(error)
                        return {
                            type: AuthAction.BID_FAILURE,
                            isLoading: false, isError: true, error: error.message
                        }
                    })
            })
    }

    static sold(action$, store) {
        return action$.ofType(AuthAction.SOLD)
            .switchMap((payload) => {
                return firebase.database().ref(`Products/${payload.Product.index}`).update({ sold: payload.Product.sold, notSold: payload.Product.notSold, buyer: payload.Product.buyer })
                    .then(() => {
                        return {
                            type: AuthAction.SOLD_SUCCESS,
                            isLoading: false, isError: false,
                        }
                    })
                    .catch((error) => {
                        alert(error)
                        return {
                            type: AuthAction.SOLD_FAILURE,
                            isLoading: false, isError: true, error: error.message
                        }
                    })
            })
    }

}