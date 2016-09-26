import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Root} from "./components/Root";
import {Home} from "./components/Home";
import {User} from "./components/User";
import {Profile} from "./components/Profile";
import {ProfileUpdate} from "./components/ProfileUpdate";
import {SignUp} from "./components/entry/SignUp";
import {LogIn} from "./components/entry/LogIn";

injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router history={browserHistory}>
                    <Route path={"/"} component={Root}>
                        <IndexRoute component={Home} />
                        <Route path={"user/:id"} component={User} />
                        <Route path={"home"} component={Home} />
                        <Route path={"profile/:id"} component={Profile} />
                        <Route path={"profile/update"} component={ProfileUpdate} />
                        <Route path={"signup"} component={SignUp} />
                        <Route path={"login"} component={LogIn} />
                    </Route>
                </Router>
            </MuiThemeProvider>
        )
    };
}

render(<App/>, window.document.getElementById("app"));