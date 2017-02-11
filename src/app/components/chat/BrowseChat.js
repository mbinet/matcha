import React from "react";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';
import io from 'socket.io-client';
import UserCard from '../browse/UserCard';

export class BrowseChat extends React.Component {

    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentWillMount() {
        var user = cookie.load('user')
        var url = "http://54.93.182.167:3000/api/chat/getConvs/" + user._id;
        console.log(url)
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
                this.setState({
                    users: response.body.message
                })
            })
    }
    render() {
        var users = _.map(this.state.users, (user) => {
            return (
                <div className="col-sm-6 " style={{marginBottom: 10, height: 300, marginLeft: 'auto', marginRight: 'auto'}} key={user._id}>
                    <UserCard user={user} chatLink={user._id} />
                </div>
            )
        });
        return (
            <span>
                <div style={{marginBottom: 50, height: '100%'}}>
                    {users}
                </div>
            </span>
        )}
}
