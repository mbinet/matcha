import React from "react";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import io from 'socket.io-client';

export class Notifs extends React.Component {

    componentWillMount() {
        const socket = io.connect("http://54.93.182.167:3000/");
        socket.on('newVisit', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                console.log('coucou', msg)
                Notification.requestPermission( function(status) {
                    var n = new Notification('Hello ' + user.name + ' :)', {body: msg.from.name + ' visited your profile'});
                });
            }
        });

        socket.on('newLike', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                console.log('coucou', msg)
                Notification.requestPermission( function(status) {
                    var n = new Notification('Hello ' + user.name + ' :)', {body: msg.from.name + ' liked you profile'});
                });
            }
        });

        socket.on('deleteLike', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                console.log('coucou', msg)
                Notification.requestPermission( function(status) {
                    var n = new Notification('Hello ' + user.name + ' :)', {body: msg.from.name + ' disliked you profile'});
                });
            }
        });
    }
    render() {return(<span></span>)}
}
