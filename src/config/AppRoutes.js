import React from 'react'
import firebase from 'firebase'
import { Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthAction from '../store/actions/AuthAction'
// import { createBrowserHistory as history } from 'history';

import {
  // App,
  // Signup,
  // Signin,
  // Home,
  // NotFound
} from './../components/index';

import {
  Auth,
  Dashboard,
} from './../container/index';

const mapStateToProps = (state) => {
  return {
    Store: state.AuthReducer.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    data: (user, history) => {
      dispatch(AuthAction.data(user, history))
    },
    signout: (history) => {
      dispatch(AuthAction.signout(history))
    },
  };
};

class ParentApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    let config = {
      apiKey: "AIzaSyB_6aPENhdvv7OFgBY4M-ek_8lEr8DqHoA",
      authDomain: "auction-system-782426.firebaseapp.com",
      databaseURL: "https://auction-system-782426.firebaseio.com",
      projectId: "auction-system-782426",
      storageBucket: "auction-system-782426.appspot.com",
      messagingSenderId: "192528934851"
    }
    firebase.initializeApp(config)
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      setTimeout(() => {
        if (user) {
          this.props.data(user, this.props.history)
        } else {
          this.props.signout(this.props.history)
        }
      }, 1500);
    })
  }

  render() {
    return (
      <div>
        {/* <Route path={
          
          this.props.history.location.pathname == "/" || this.props.history.location.pathname == "/dashboard" || this.props.history.location.pathname == "/signup" || this.props.history.location.pathname == "/signin"
            ? "notfound"
            : "*"
        } component={NotFound} /> */}
        <Route exact path="/" component={Auth} />
        <Route exact path="/dashboard" component={Dashboard} />
        {/* <Route exact path="/admin" component={Admin} /> */}
      </div>
    );
  }
}
const AppRoutes = (props) => {
  return (
    <BrowserRouter>
      <Route component={connect(mapStateToProps, mapDispatchToProps)(ParentApp)} {...props} />
    </BrowserRouter>
  )
};


export default AppRoutes;