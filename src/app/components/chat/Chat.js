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
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import DB from '../../other/db'

export class Chat extends React.Component {

    constructor() {
        super();
        this.state = {
            message: "",
            allMessages: [],
            messages: [],
            photoFrom: "",
            idFrom: "",
            photoTo: "",
            idTo: ""
        }
    }

    componentWillMount() {
		var user = cookie.load('user')

		// this is in case a custom ID is passed to url
		var url = "http://54.93.182.167:3000/api/chat/getConvs/" + user._id;
		Request.post(url)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send({ token : cookie.load('token') })
			.then((response) => {
				let users = response.body.message
				let bool = false
				for (let o of users) {
					if(o._id == this.props.params.id) {
						bool = true
					}
				}
				if (bool == false) {
					setTimeout(function () {
						browserHistory.push('/')
					}, 1000)
				}
			})

        // getting photos for both users
        var that = this
        DB.getPhotoFromId(user._id, function (res) {
            that.setState({
                photoFrom: res,
                idFrom: user._id
            })
            DB.getPhotoFromId(that.props.params.id, function (res) {
                that.setState({
                    photoTo: res,
                    idTo: that.props.params.id
                })
                that.getAllMessages()
            })
        })

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
                        >{msg.message}</ListItem>
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
                let messages = []

                let photo;

                for (var msg of array) {
                    if (msg.from == that.state.idFrom)
                        photo = that.state.photoFrom
                    else
                        photo = that.state.photoTo
                    messages.push(
                        <ListItem
                            key={msg._id}
                            leftAvatar={<Avatar src={"https://matcha-bucket.s3.amazonaws.com/Photos/" + photo}
                                                style={{objectFit: 'cover'}}/>}
                        > {msg.message}</ListItem>
                    )
                }
                that.updateState(messages)

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
