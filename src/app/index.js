import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Root} from "./components/Root";
import {Home} from "./components/Home";
import {User} from "./components/User";
import {Profile} from "./components/Profile";
import {ProfileUpdate} from "./components/ProfileUpdate";

class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <IndexRoute component={Home} />
                    <Route path={"user/:id"} component={User} />
                    <Route path={"home"} component={Home} />
                    <Route path={"profile/:id"} component={Profile} />
                    <Route path={"profile/update"} component={ProfileUpdate} />
                </Route>
            </Router>
        )
    };
}

render(<App/>, window.document.getElementById("app"));