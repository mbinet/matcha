import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import Request from 'superagent';
import sha256 from 'sha256';
import cookie from 'react-cookie';
import Snackbar from 'material-ui/Snackbar';
import { browserHistory } from "react-router";

export class LogIn extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {
                mail: "",
                password: "",
                mailReco: ""
            },
            snackOpen: false,
            snackMsg: ""
        };
    }

    _handleTextFieldChange(e) {
        this.setState({
            user: update(this.state.user, {[e.target.name]: {$set: e.target.value}}),
        });
    }

    handleEnd() {
        var shaPass = sha256(this.state.user.password);
        var _this = this;
        console.log(shaPass);
        var url = "http://54.93.182.167:3000/api/login";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ mail: this.state.user.mail })
            .send({ passwd: shaPass })
            .end(function (err, res) {
                if(err) { console.log('There was an unexpected error.', err + "RESRESRES : " + res) }
                else {
                    console.log(res.body);
                    if (res.body.message == 'Failure') {
                        _this.handleWrongCombination();
                    }
                    else {
                        _this.handleSignInSuccess(res.body.token, res.body.user);
                    }
                }
            }, this);
    }

    handleRecover() {
        var url = "http://54.93.182.167:3000/api/recoverPasswd";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ mail: this.state.user.mailReco })
            .end(function (err, res) {
                if(err) { console.log('There was an unexpected error.', err + "RESRESRES : " + res) }
                else {
                    console.log(res.body.message);
                }
            }, this);
        this.setState({
            snackMsg: 'If you are a returning user, an email has been sent to you',
            snackOpen: true
        })
    }

    handleSignInSuccess(token, user) {

        /*
        In case of need to set an expire cookie date
         */
        // var now = new Date();
        // var time = now.getTime();
        // time += 3600 * 1000; //one hour
        // now.setTime(time);
        // cookie.save('token', token, { path: '/', expires: now});

        cookie.save('token', token, { path: '/'});
        cookie.save('user', user, { path: '/'});
        window.location.reload();
        browserHistory.push("/home");
    }

    handleWrongCombination() {
        console.log('Wrong conbination mail/password');
        this.setState({
            snackMsg: 'Check your credentials',
            snackOpen: true
        })
    }

    _handleKeyDown(event) {
        if (event.which === 13) {
            this.handleEnd();
        }
    }

    _handleKeyDownReco(event) {
        if (event.which === 13) {
            this.handleRecover();
        }
    }

    render() {
        return (
            <div>
                <div className="col-sm-6">
                    <h3>LOGIN</h3>
                    <TextField
                        floatingLabelText="Email"
                        hintText="john@doe.com"
                        name="mail"
                        value={this.state.user.mail}
                        onChange={this._handleTextFieldChange.bind(this)}
                        onKeyDown={this._handleKeyDown.bind(this)}
                    />
                    <br />
                    <TextField
                        floatingLabelText="Password"
                        hintText="••••••••"
                        name="password"
                        type="password"
                        value={this.state.user.password}
                        onChange={this._handleTextFieldChange.bind(this)}
                        onKeyDown={this._handleKeyDown.bind(this)}
                    />
                    <br />
                    <RaisedButton
                        label="Login"
                        primary={true}
                        disabled={this.state.saveDisabled}
                        id="mdrlol"
                        onTouchTap={() => this.handleEnd()}
                    />
                </div>
                <div className="col-sm-6">
                    <TextField
                        floatingLabelText="Email"
                        hintText="john@doe.com"
                        name="mailReco"
                        value={this.state.user.mailReco}
                        onChange={this._handleTextFieldChange.bind(this)}
                        onKeyDown={this._handleKeyDownReco.bind(this)}
                    />
                    <br />
                    <RaisedButton
                        label="Recover passord"
                        primary={true}
                        disabled={this.state.saveDisabled}
                        id="mdrlol"
                        onTouchTap={() => this.handleRecover()}
                    />

                    <Snackbar
                        open={this.state.snackOpen}
                        message={this.state.snackMsg}
                        autoHideDuration={4000}
                        onRequestClose={() => this.setState({ snackOpen: false })}
                    />
                </div>
            </div>
        );
    }
}