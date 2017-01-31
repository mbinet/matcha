import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import Request from 'superagent';
import sha256 from 'sha256';
import cookie from 'react-cookie';
import { browserHistory } from "react-router";
import {Link} from "react-router";
import UserCard from './UserCard';



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
                <div className="col-sm-6 " style={{marginBottom: 10, height: 300, marginLeft: 'auto', marginRight: 'auto'}} key={user._id}>
                        <UserCard user={user}/>
                </div>
                )
        });

        return (
            <div style={{marginBottom: 50, height: '100%'}}>
                {/*<UserCard/>*/}
                {users}
            </div>
        );
    }
}