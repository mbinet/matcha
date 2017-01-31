import React from "react";
import {Link} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';
import Request from 'superagent';

function sendPostionToDb(long, lat, city) {

    var user = cookie.load('user');
    var url = "http://54.93.182.167:3000/api/users/updateOne/" + user._id;
    Request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ token : cookie.load('token') })
        .send({ name : user.name })
        .send({ long : long })
        .send({ lat : lat })
        .send({ city : city || "Heaven" })
        .then((response) => {
            console.log(response.body.message)
        });
}


export class Header extends React.Component {

    showPosition(position) {
        if (position) {
            var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='
                + position.coords.latitude + ','
                + position.coords.longitude + '&sensor=true';
            Request.get(url)
                .then((response) => {
                    var addr = response.body.results[2].address_components[1].short_name;
                    sendPostionToDb(position.coords.longitude, position.coords.latitude, addr);
                });
        }
    }

    handleLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition.bind(this),
                function (error) {
                    // if you can't get users location (ex: user declined)

                    // getting the ip
                    Request.get('https://api.ipify.org?format=json')
                        .then((response) => {
                            Request.get('https://freegeoip.net/json/' + response.body.ip)
                                .then((response) => {
                                    if (!response.body.city) {
                                        var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='
                                            + response.body.latitude + ','
                                            + response.body.longitude + '&sensor=true';
                                        Request.get(url)
                                            .then((response) => {
                                                var addr = response.body.results[2].address_components[1].short_name
                                                sendPostionToDb(response.body.longitude, response.body.latitude, addr)
                                            });
                                    }
                                    else {
                                        sendPostionToDb(response.body.longitude, response.body.latitude, response.body.city)
                                    }
                                });
                        });
                });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    componentWillMount() {
        this.state = {
            user: cookie.load('user'),
            token: cookie.load('token')
        }

        if(this.state.user) {
            this.handleLocation()
        }
    }

    render () {
        var rightBar;
        if (this.state.user) {
            rightBar =
                <span>
                    <ul className="nav navbar-nav">
                        <li><Link to={"/user"} activeStyle={{color: "red"}}>Users</Link></li>
                        <li><Link to={'/profile/update/' + this.state.user._id} activeStyle={{color: "red"}}>Update Profile</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <Link to={'/profile/' + this.state.user._id}>
                            <RaisedButton
                                label={'Hi ' + this.state.user.name}
                                primary={true}
                            />
                        </Link>
                        <Link to={'/logout'}>
                            <RaisedButton
                                label='Logout'
                                secondary={true}
                                icon={<i className="glyphicon glyphicon-off"></i>}
                            />
                        </Link>
                    </ul>
                </span>
        }
        else {
            rightBar =
                <ul className="nav navbar-nav navbar-right">
                    <button id="loginbutton" type="button" className="btn btn-secondary narbar-btn">
                        <i className="glyphicon glyphicon-log-in"></i>
                        <Link to={"/login"}>Login</Link>
                    </button>
                    <button type="button" className="btn btn-success navbar-btn">
                        <i className="glyphicon glyphicon-link"></i>
                        <Link to={"/signup"}>Create account</Link>
                    </button>
                </ul>
        }

        return(
            <div className="navbar-wrapper">
            <div className="navbar navbar-default" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to={"/home"} className="navbar-brand" activeStyle={{color: "red"}}>Matcha</Link>
                    </div>
                    <div className="collapse navbar-collapse">

                        { rightBar }
                    </div>
                </div>
            </div>
        </div>
        )
    };
};