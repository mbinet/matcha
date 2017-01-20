import React from "react";
import {Link} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import cookie from 'react-cookie';
import RaisedButton from 'material-ui/RaisedButton';

export class Header extends React.Component {

    componentWillMount() {
        this.state = {
            user: cookie.load('user'),
            token: cookie.load('token')
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