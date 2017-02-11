import React from "react";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import io from 'socket.io-client';
import TextField from 'material-ui/TextField';

export class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            allMessages: []
        }
    }

    componentWillMount() {
        var user = cookie.load('user')
        var url = "http://54.93.182.167:3000/api/chat/getConvs/" + user._id;
        console.log(url)
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
                console.log('cool')
            })
    }

    _handleTextFieldChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    sendMessage() {
        console.log(this.state.message)
        this.state.allMessages.push(<div key={this.state.message}>{this.state.message}<hr/></div>)
        this.setState({
            message: ""
        })
    }

    render() {
        return (
            <div>
                <div style={{
                    border: '1px solid black',
                    height: 400,
                    width: 600
                }}>
                    {this.state.allMessages}
                </div>
                <TextField
                    floatingLabelText="Type a message..."
                    name="message"
                    value={this.state.message}
                    onChange={this._handleTextFieldChange.bind(this)}
                />
                <RaisedButton label='Send' primary={true} onTouchTap={() => this.sendMessage()}/>
            </div>
        )
    }
}
