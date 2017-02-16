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
import _ from 'lodash';



export class Browse extends React.Component {

    constructor() {
        super();
        this.state = {
            users: [],
            initialUsers: [],
            filters: {
                age1: "",
                age2: ""
            }
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
                    users: response.body.users,
                    initialUsers: response.body.users
                })
            });
    }

    sortBy(what) {
        if (what == 'location') {
            this.componentWillMount()
        }
        else if (what == 'tags') {
            var user = cookie.load('user');

            if (user.tags) {
                var copy = _.map(this.state.users, _.clone);
                var cpt = 0;
                var tab = []
                _.forEach(copy, function (o) {
                    o.cpt = 0
                    console.log(o.name + " " + o.tags)
                    if (o.tags) {
                        console.log(typeof o.tags[0])
                        for (var i = 0; i < o.tags.length; i++) {
                            if (user.tags.indexOf(o.tags[i]) != -1) {
                                console.log("+1 ", o.tags[i] + o.name + " " + user.tags.indexOf(o.tags[i]))
                                o.cpt++
                            }
                        }
                    }
                    tab.push(o)
                })
                var sorted = _.sortBy(tab, ['cpt'])
                sorted.reverse()
                this.setState({
                    users: sorted
                })
            }
        }
        else {
            var sorted = _.sortBy(this.state.users, [what])
            if (_.isEqual(sorted, this.state.users))
                sorted.reverse()
            this.setState({
                users: sorted
            })
        }
        console.log(this.state.users)
    }

    rangeAge() {
        // var ranged = _.filter(this.state.initialUsers, (user) => (user.age >= this.state.filters.age1 && user.age <= this.state.filters.age2));
        var ranged = this.state.initialUsers.filter(u => u.age >= this.state.filters.age1 && u.age <= this.state.filters.age2)
        this.setState({
            users: ranged
        })
        console.log(this.state.filters)
        console.log(this.state.initialUsers)
    }

    _handleTextFieldChange(e) {
        this.setState({
            filters: update(this.state.filters, {[e.target.name]: {$set: e.target.value}}),
        }, () => {
            this.rangeAge()
        });
    }

    cancelFilters() {
        var empty = { age1: "", age2: "" }
        this.setState({
            filters : empty,
            users: this.state.initialUsers
        })
    }

    render() {
        var users = _.map(this.state.users, (user) => {
            return (
                <div className="col-sm-6 " style={{marginBottom: 10, height: 300, marginLeft: 'auto', marginRight: 'auto'}} key={user._id}>
                        <UserCard user={user}/>
                </div>
                )
        });

        const btnStyle = { margin: 10, };

        return (
            <div style={{marginBottom: 50, height: '100%'}}>

                <p>Sort by</p>
                <div className="row" style={{marginBottom: 50}}>
                    <RaisedButton
                        label="Age"
                        primary={true}
                        style={btnStyle}
                        disabled={this.state.saveDisabled}
                        onTouchTap={() => this.sortBy('age')}
                    />
                    <RaisedButton
                        label="Location"
                        primary={true}
                        style={btnStyle}
                        disabled={this.state.saveDisabled}
                        onTouchTap={() => this.sortBy('location')}
                    />
                    <RaisedButton
                        label="Popularity"
                        primary={true}
                        style={btnStyle}
                        disabled={this.state.saveDisabled}
                        onTouchTap={() => this.sortBy('popu')}
                    />
                    <RaisedButton
                        label="Commun tags"
                        primary={true}
                        style={btnStyle}
                        disabled={this.state.saveDisabled}
                        onTouchTap={() => this.sortBy('tags')}
                    />
                    <hr />
                    <p>Filter by</p>
                    <TextField
                        floatingLabelText="Age"
                        name="age1"
                        value={this.state.filters.age1}
                        onChange={this._handleTextFieldChange.bind(this)}
                        style={{width: 40, marginRight: 10}}
                    />
                    -
                    <TextField
                        floatingLabelText="Age"
                        name="age2"
                        value={this.state.filters.age2}
                        onChange={this._handleTextFieldChange.bind(this)}
                        style={{width: 40, marginLeft: 10}}
                    />
                    <RaisedButton
                        label="Cancel"
                        style={btnStyle}
                        onTouchTap={() => this.cancelFilters()}
                    />
                </div>
                {/*<UserCard/>*/}
                {users}
            </div>
        );
    }
}