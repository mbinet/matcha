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
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import _ from 'lodash';
import AutocompleteGoogle from 'react-google-autocomplete';
import AutoComplete from 'material-ui/AutoComplete';
import {Tags} from "../user/profile/Tags"



export class Browse extends React.Component {

    constructor() {
        super();
        this.state = {
            users: [],
            initialUsers: [],
            filters: {
                age1: "",
                age2: "",
                pop1: "",
                pop2: "",
                city: ""
            },
            searchTags: [],
            tags: []
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
        var url = "http://54.93.182.167:3000/api/tags/getAll";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
                this.setState({
                    searchTags: response.body.tags,
                    tags: []
                });
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
    }

    // var ranged = _.filter(this.state.initialUsers, (user) => (user.age >= this.state.filters.age1 && user.age <= this.state.filters.age2));
    filterUsers() {
        var ranged = this.state.initialUsers
        console.log(this.state.filters)
        if (this.state.filters.age1 != "" && this.state.filters.age2 != "") {
            if (this.state.filters.age1 < this.state.filters.age2)
                ranged = ranged.filter(u => u.age >= this.state.filters.age1 && u.age <= this.state.filters.age2)
            else
                ranged = ranged.filter(u => u.age <= this.state.filters.age1 && u.age >= this.state.filters.age2)
        }

        if (this.state.filters.pop1 != "" && this.state.filters.pop2 != "") {
            if (this.state.filters.pop1 < this.state.filters.pop2)
                ranged = ranged.filter(u => u.popu >= this.state.filters.pop1 && u.popu <= this.state.filters.pop2)
            else
                ranged = ranged.filter(u => u.popu <= this.state.filters.pop1 && u.popu >= this.state.filters.pop2)
        }
        if (this.state.filters.city != "")
            ranged = ranged.filter(u => u.city == this.state.filters.city)

        if (this.state.tags[0]) {
            var res = []
            for (var i = 0; i < this.state.tags.length; i++) {
                for (var j = 0; j < ranged.length; j++) {
                    if (ranged[j].tags) {
                        if (ranged[j].tags.indexOf(this.state.tags[i]) && res.indexOf(ranged[j]) == -1) {
                            res.push(ranged[j])
                        }
                    }
                }
            }
            ranged = res
        }

        this.setState({
            users: ranged
        }, () => {

        console.log(this.state.users)
        })
    }

    _handleTextFieldChange(e) {
        this.setState({
            filters: update(this.state.filters, {[e.target.name]: {$set: e.target.value}}),
        }, () => {
            this.filterUsers()
        });
    }

    // about tags
    handleUpdateInput = (searchText) => {
        this.setState({
            searchText: searchText,
        });
    };
    handleNewRequest = (chosenRequest) => {
        this.state.tags.push(chosenRequest);
        this.setState({
            searchText: '',
        }, () => {
            this.filterUsers()
        });
    };

    getAllUsers() {
        var url = "http://54.93.182.167:3000/api/users/";
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
                this.setState({
                    users: response.body.users,
                    initialUsers: response.body.users
                })
            });
    }

    cancelFilters() {
        var empty = {
            age1: "",
            age2: "",
            pop1: "",
            pop2: "",
            city: "",
            tag: "",
            tags: []
        }
        this.setState({
            filters : empty,
            users: this.state.initialUsers,
            tags: []
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


                <RaisedButton
                    label="Around Me"
                    style={btnStyle}
                    onTouchTap={() => this.componentWillMount()}
                />
                <RaisedButton
                    label="Advanced search"
                    style={btnStyle}
                    onTouchTap={() => this.getAllUsers()}
                />
                <Card>
                    <CardHeader
                        title="Filters"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true} style={{ paddingTop: 0}}>
                        {/***********/}
                        {/* FILTERS */}
                        {/***********/}

                        {/* AGE */}
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

                        {/* LOCATION */}
                        <div style={{ display: 'inline-block', marginLeft: 10 }}>
                            <AutocompleteGoogle
                                style={{ width: 150 }}
                                onPlaceSelected={(place) => {

                                    // check if a real city is actually selected, not just random text.
                                    if (place.address_components) {
                                        var filters = {
                                            age1: this.state.filters.age1,
                                            age2: this.state.filters.age2,
                                            pop1: this.state.filters.pop1,
                                            pop2: this.state.filters.pop2,
                                            city: place.name
                                        }
                                        this.setState({
                                            filters: filters
                                        }, () => {
                                            this.filterUsers()
                                        })
                                    }
                                }}
                                types={['(cities)']}
                            />
                        </div>

                        {/*/!* POPU *!/*/}
                        <div style={{ display: 'inline-block', marginLeft: 10 }}>
                            <TextField
                                floatingLabelText="Popularity"
                                name="pop1"
                                value={this.state.filters.pop1}
                                onChange={this._handleTextFieldChange.bind(this)}
                                style={{width: 80, marginRight: 10}}
                            />
                            -
                            <TextField
                                floatingLabelText="Popularity"
                                name="pop2"
                                value={this.state.filters.pop2}
                                onChange={this._handleTextFieldChange.bind(this)}
                                style={{width: 80, marginLeft: 10}}
                            />
                        </div>

                        <div style={{ display: 'inline-block', marginLeft: 10 }}>
                            <AutoComplete
                                hintText="#Geek"
                                floatingLabelText="Tags"
                                searchText={this.state.searchText}
                                onUpdateInput={this.handleUpdateInput}
                                onNewRequest={this.handleNewRequest}
                                dataSource={this.state.searchTags}
                                dataSourceConfig={{text: 'textKey', value: 'valueKey'}}
                                //filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                                filter={AutoComplete.fuzzyFilter}
                                openOnFocus={true}
                            />
                        </div>
                        <Tags tags={this.state.tags}/>

                        <RaisedButton
                            label="Reset"
                            style={btnStyle}
                            onTouchTap={() => this.cancelFilters()}
                        />
                    </CardText>
                </Card>
                <br />
                <Card>
                    <CardHeader
                        title="Sorting Tools"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true} style={{ paddingTop: 0 }}>
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
                    </CardText>
                </Card>
                <hr />
                {users}
            </div>
        );
    }
}
