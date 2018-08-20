import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import AppRoutes from './config/AppRoutes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { lime50 } from 'material-ui/styles/colors';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const muiTheme = getMuiTheme({
    palette: {
        pickerHeaderColor: "rgba(255, 255, 255, 0.12)",
        clockCircleColor: "rgba(255, 255, 255, 0.12)",
        disabledColor: "rgba(255, 255, 255, 0.3)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        alternateTextColor: "#303030",
        secondaryTextColor: lime50,
        accent1Color: "#ff4081",
        accent2Color: "#303030",
        accent3Color: "#ff80ab",
        primary1Color: "#3BB1FF",
        primary2Color: "#3BB1FF",
        primary3Color: "#757575",
        canvasColor: "#303030",
        textColor: lime50,
    },
    spacing: {
        desktopDropDownMenuItemHeight: 32,
        desktopDrawerMenuItemHeight: 48,
        desktopDropDownMenuFontSize: 15,
        desktopKeylineIncrement: 64,
        desktopSubheaderHeight: 48,
        desktopToolbarHeight: 56,
        desktopGutterLess: 16,
        desktopGutterMore: 32,
        desktopGutterMini: 8,
        desktopGutter: 24,
        iconSize: 24,
    },
    fontFamily: "Roboto, sans-serif",
    borderRadius: 2
});

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme, )}>
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

registerServiceWorker();
