import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import Request from 'superagent';
import sha256 from 'sha256';

export class LogIn extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {
                mail: "",
                password: "",
            }
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
        var url = "http://54.93.182.167:3000/api/login/";
        Request.post(url)
            .set('Content-Type', 'application/json')
            .send({ mail: this.state.user.mail })
            .send({ passwd: shaPass })
            .end(function (err, res) {
                if(err) { console.log('There was an unexpected error.') }
                else {
                    console.log(res.body);
                    if (res.body.message == 'Failure') {
                        _this.handleWrongCombination();
                    }
                    else {
                        _this.handleSignInSuccess(res.body.token);
                    }
                }
            }, this)
        // Request.get(url).then((response) => {
        //     console.log(response.body.res)
        // });
    }

    handleSignInSuccess(token) {
        console.log('You are signed in ! And token is : ', token);
    }

    handleWrongCombination() {
        console.log('Wrong conbination mail/password');
    }

    _handleKeyDown(event) {
        if (event.which === 13) {
            this.handleEnd();
        }
    }
    render() {
        return (
            <div>
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
                    label="Save"
                    primary={true}
                    disabled={this.state.saveDisabled}
                    id="mdrlol"
                    onTouchTap={() => this.handleEnd()}
                />
            </div>
        );
    }
}