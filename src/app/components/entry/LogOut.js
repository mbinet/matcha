import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import Request from 'superagent';
import sha256 from 'sha256';
import cookie from 'react-cookie';
import { browserHistory } from "react-router";


export class LogOut extends React.Component {

    constructor () {
        super();

        if (cookie.load('user')) {
            cookie.remove('user', { path: '/' });
            cookie.remove('token', { path: '/' });
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
                <h3>You are logged out.</h3>
                <RaisedButton
                    label="Take me back home"
                    primary={true}
                    onTouchTap={() => browserHistory.push('/home')}
                />
            </div>
        );
    }
}