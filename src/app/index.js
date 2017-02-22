import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Request from 'superagent';
import cookie from 'react-cookie';

import NotFound from './components/NotFound';
import {Root} from "./components/Root";
import {Home} from "./components/Home";
import {User} from "./components/User";
import {Profile} from "./components/user/profile/Profile";
import {ProfileUpdate} from "./components/user/updateProfile/ProfileUpdate";
import {ProfileDelete} from "./components/user/deleteProfile/ProfileDelete";
import {SignUp} from "./components/entry/SignUp";
import {LogIn} from "./components/entry/LogIn";
import {LogOut} from "./components/entry/LogOut";
import {Browse} from "./components/browse/Browse";
import {Notifications} from "./components/user/Notifications";
import {BrowseChat} from "./components/chat/BrowseChat";
import {Chat} from "./components/chat/Chat";
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

injectTapEventPlugin();


const socket = io.connect("http://54.93.182.167:3000/");
window.socket = socket
socket.on('which_user', msg => {
    var user = cookie.load('user');
    if (user) {
        window.socket.emit('which_user_response', user._id)
    }
});
var user = cookie.load('user');
var finalRoutes;
if (user) {
    window.socket.emit('manualConnect', user._id)
    finalRoutes = (
        <Router history={browserHistory}>
            <Route path={"/"} component={Root} >
                <IndexRoute component={Home} />
                <Route path={"user"} component={User} />
                <Route path={"home"} component={Home} />
                <Route path={"profile/update/:id"} component={ProfileUpdate} />
                <Route path={"profile/delete/:id"} component={ProfileDelete} />
                <Route path={"profile/:id"} component={Profile} />
                <Route path={"signup"} component={SignUp} />
                <Route path={"login"} component={LogIn} />
                <Route path={"logout"} component={LogOut} />
                <Route path={"browse"} component={Browse} />
                <Route path={"chat"} component={BrowseChat} />
                <Route path={"chat/:id"} component={Chat} />
                <Route path={"notifications"} component={Notifications} />
                <Route path="*" component={NotFound} />
            </Route>
        </Router>
    )
}
else {
    finalRoutes = (
    <Router history={browserHistory}>
        <Route path={"/"} component={Root} >
            <IndexRoute component={LogIn} />
            <Route path={"signup"} component={SignUp} />
            <Route path={"login"} component={LogIn} />
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
)
}
const DOMNode = document.getElementById('renderTarget');

class App extends React.Component {

    render() {
        return (
            <SocketProvider socket={socket}>
                <MuiThemeProvider>
                    {finalRoutes}
                </MuiThemeProvider>
            </SocketProvider>
        )
    };
}

render(<App/>, window.document.getElementById("app"));