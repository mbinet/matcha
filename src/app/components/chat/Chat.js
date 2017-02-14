import React from "react";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Request from 'superagent';
import io from 'socket.io-client';
import TextField from 'material-ui/TextField';
import ReactDOM from 'react-dom';
import DB from '../../other/db'

export class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            allMessages: [],
            messages: []
        }
    }

    componentWillMount() {
        this.getAllMessages()

        // watcher when getting a new MSG
        const socket = io.connect("http://54.93.182.167:3000/");
        socket.on('newMsg', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                // checking if the component is mounted (WHY THE FUCK ?? WORKS EITHER WAY!)
                if (this.refs.myRef) {
                    this.getLastMsg();
                }
            }
        });
    }

    getLastMsg() {
        var user = cookie.load('user')
        var url = "http://54.93.182.167:3000/api/chat/getMsgs/";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({token: cookie.load('token')})
            .send({from: user._id})
            .send({to: this.props.params.id})
            .then((response) => {
                var array = response.body.message
                var that = this
                var messages = that.state.messages.slice()

                const msg = array[array.length - 1]
                DB.getPhotoFromId(msg.from, function (res) {
                    messages.push(
                        <ListItem
                            key={msg._id}
                            leftAvatar={<Avatar src={"https://matcha-bucket.s3.amazonaws.com/Photos/" + res}
                                                style={{objectFit: 'cover'}}/>}
                            secondaryText={
                                <p>
                                    {msg.message}
                                </p>
                            }
                            secondaryTextLines={2}
                        />
                    )
                    that.setState({
                        messages: messages
                    });
                })
            })
    }

    getAllMessages() {
        var user = cookie.load('user')
        var url = "http://54.93.182.167:3000/api/chat/getMsgs/";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({token: cookie.load('token')})
            .send({from: user._id})
            .send({to: this.props.params.id})
            .then((response) => {
                this.setState({
                    allMessages: response.body.message
                })
                var array = response.body.message
                var that = this
                var messages = []

                function iteratePhoto() {
                    const msg = array.shift()
                    DB.getPhotoFromId(msg.from, function (res) {
                        messages.push(
                            <ListItem
                                key={msg._id}
                                leftAvatar={<Avatar src={"https://matcha-bucket.s3.amazonaws.com/Photos/" + res} style={{objectFit: 'cover'}}/>}
                                secondaryText={
                                    <p>
                                        {msg.message}
                                    </p>
                                }
                                secondaryTextLines={2}
                            />
                        )
                        if (array.length) {
                            iteratePhoto()
                        }
                        else {
                            that.updateState(messages);
                        }
                    })
                }
                iteratePhoto()
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
        var url = "http://54.93.182.167:3000/api/chat/sendMsg";
        var user = cookie.load('user')
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .send({ from : user._id })
            .send({ to : this.props.params.id })
            .send({ message: this.state.message })
            .then((response) => {
                this.setState({
                    message: ""
                })
                this.getLastMsg()
            })

    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: "smooth" });
    }

    updateState(tab) {
        this.setState({
            messages: tab
        })
    }
    render() {

        return (
            <div ref="myRef">
                {this.state.jrigole}
                {() => this.ptdr()}
                <div style={{
                    border: '1px solid black',
                    height: 400,
                    width: 600,
                    overflow: 'auto'
                }}>
                    {this.state.messages}
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
