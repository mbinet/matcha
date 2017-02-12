import React from "react";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import io from 'socket.io-client';
import TextField from 'material-ui/TextField';
import ReactDOM from 'react-dom';

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
        var url = "http://54.93.182.167:3000/api/chat/getMsgs/";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: cookie.load('token') })
            .send({ from: user._id })
            .send({ to: this.props.params.id})
            .then((response) => {
                this.setState({
                    allMessages: response.body.message
                })
                this.scrollToBottom()
            })
    }

    _handleTextFieldChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    _handleKeyDown(event) {
        if (event.which === 13) {
            this.sendMessage();
        }
    }

    sendMessage() {
        this.state.allMessages.push({message: this.state.message})
        var url = "http://54.93.182.167:3000/api/chat/sendMsg";
        var user = cookie.load('user')
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .send({ from : user._id })
            .send({ to : this.props.params.id })
            .send({ message: this.state.message })
            .then((response) => { })
        this.setState({
            message: ""
        })

    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({behavior: "smooth"});
    }

    render() {

        const socket = io.connect("http://54.93.182.167:3000/");
        socket.on('newMsg', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                this.componentWillMount()
            }
        });

        var message = _.map(this.state.allMessages, (msg) => {
            return (
                <div key={msg.message + Math.random()}>{msg.message}<hr/></div>
            )
        });

        return (
            <div>
                <div style={{
                    border: '1px solid black',
                    height: 400,
                    width: 600,
                    overflow: 'auto'
                }}>
                    {message}
                    {/* dummy div to scroll to */}
                    <div style={ {float:"left", clear: "both", height: 1} }
                         ref={(el) => { this.messagesEnd = el; }}></div>
                </div>
                <TextField
                    floatingLabelText="Type a message..."
                    name="message"
                    value={this.state.message}
                    onChange={this._handleTextFieldChange.bind(this)}
                    onKeyDown={this._handleKeyDown.bind(this)}
                />
                <RaisedButton label='Send' primary={true} onTouchTap={() => this.sendMessage()}/>
            </div>
        )
    }
}
