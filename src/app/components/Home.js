import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import {Router, Route, browserHistory, IndexRoute} from "react-router";


export class Home extends React.Component {

    onNavigateLogIn() {
        browserHistory.push("/login");
    }

    onNavigateSignUp() {
        browserHistory.push("/signup");
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <RaisedButton label="Log In" secondary={true} onClick={this.onNavigateLogIn}/>
                <RaisedButton label="Sign Up" primary={true} onClick={this.onNavigateSignUp}/>
            </div>
        );
    }
}