import React from "react";
import {Link} from "react-router";
import FlatButton from 'material-ui/FlatButton';

export const Header = (props) => {
    return (
        <div className="navbar-wrapper">
                <div className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to={"/home"} className="navbar-brand" activeStyle={{color: "red"}}>Matcha</Link>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                {/*<li><Link to={"/home"} activeStyle={{color: "red"}}>Home</Link></li>*/}
                                <li><Link to={"/user"} activeClassName={"active"}>User</Link></li>
                                <li><Link to={"/profile"} activeStyle={{color: "red"}}>Profile</Link></li>
                                <li><Link to={"/profile/update"} activeStyle={{color: "red"}}>Update Profile</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <button id="loginbutton" type="button" className="btn btn-secondary narbar-btn"><i className="glyphicon glyphicon-log-in"></i>
                                    <Link to={"/login"}>Login</Link>
                                </button>
                                <button type="button" className="btn btn-success navbar-btn"><i className="glyphicon glyphicon-link"></i><Link to={"/signup"}>Create account</Link></button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    );
};