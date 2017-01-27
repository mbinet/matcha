import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import Request from 'superagent';
import sha256 from 'sha256';
import cookie from 'react-cookie';
import { browserHistory } from "react-router";
import {Link} from "react-router";



export class Browse extends React.Component {

    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/browse/";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .send({ user : cookie.load('user') })
            .then((response) => {
                console.log(response.body.users)
                this.setState({
                    users: response.body.users
                })
            });
    }

    render() {
        var users = _.map(this.state.users, (user) => {
            return (
                <li key={user._id}>
                    <Link to={"/profile/" + user._id} activeStyle={{color: "red"}}>{user.name}</Link>
                    <span> | </span>
                    <Link to={"/profile/update/" + user._id} activeStyle={{color: "red"}}>Edit</Link>
                    <span> | </span>
                    <Link to={"/profile/delete/" + user._id} activeStyle={{color: "red"}}>Delete</Link>
                </li>)
        });

        return (
            <div>
                <ul>{users}</ul>

            </div>
        );
    }
}