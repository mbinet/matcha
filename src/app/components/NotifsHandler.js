import React from "react";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import io from 'socket.io-client';
import DB from '../other/db';

export class Notifs extends React.Component {

    componentWillMount() {
        const socket = io.connect("http://54.93.182.167:3000/");
        socket.on('newVisit', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                Notification.requestPermission( function(status) {
                    var n = new Notification('Hello ' + user.name + ' :)', {body: msg.from.name + ' visited your profile'});
                });
            }
        });

        socket.on('newLike', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                Notification.requestPermission( function(status) {
                    var n = new Notification('Hello ' + user.name + ' :)', {body: msg.from.name + ' liked you profile'});
                });
            }
        });

        socket.on('deleteLike', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                Notification.requestPermission( function(status) {
                    var n = new Notification('Hello ' + user.name + ' :)', {body: msg.from.name + ' disliked you profile'});
                });
            }
        });

        socket.on('newLikeBack', msg => {
            var user = cookie.load('user');
            if (msg.to == user._id) {
                Notification.requestPermission( function(status) {
                    var n = new Notification('Hello ' + user.name + ' :)', {body: msg.from.name + ' liked you back !'});
                });
            }
        });

        socket.on('newMsg', msg => {
            var user = cookie.load('user');
            DB.getNameFromId(msg.from, function (res) {
                var nameFrom = res;
                if (msg.to == user._id) {
                    Notification.requestPermission( function(status) {
                        var n = new Notification('Hello ' + user.name + ' :)', {body: nameFrom + ' sent you a message !'});
                    });
                }
            })
        });
    }
    render() {return(<span></span>)}
}
