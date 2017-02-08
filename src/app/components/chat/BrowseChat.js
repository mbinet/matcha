import React from "react";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import io from 'socket.io-client';

export class BrowseChat extends React.Component {

    componentWillMount() {
        var user = cookie.load('user')
        var url = "http://54.93.182.167:3000/api/chat/getConvs/" + user._id;
        console.log(url)
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
                console.log(response.body.message)
            })
    }
    render() {return(<span></span>)}
}
