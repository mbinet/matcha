import React from "react";
import { browserHistory } from "react-router";
import Request from "superagent";
import _ from "lodash";
import {Link} from "react-router";
import cookie from 'react-cookie';

export class User extends React.Component {

    constructor() {
        super();
        this.state = {
            users: []
        };
        // this.state.users = [];
    }

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users/";
        var token = cookie.load('token');
        var that = this;
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : token})
            .end(function (err, res) {
                if (err)
                    console.log('err : \n', err);
                if (res) {
                    console.log("HELLO", res)
                    that.setState({
                        users: res.body.users
                    })
                }
            })
    }

    onNavigateHome() {
        browserHistory.push("/home");
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
                <h3>The User Page</h3>
                <ul>{users}</ul>
                <p>User ID: {this.props.params.id}</p>
                <button onClick={this.onNavigateHome} className="btn btn-primary">Go Home!</button>
            </div>
        )
    };
}