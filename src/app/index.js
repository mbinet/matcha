import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

injectTapEventPlugin();

class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider>
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
                    </Route>
                </Router>
            </MuiThemeProvider>
        )
    };
}

render(<App/>, window.document.getElementById("app"));