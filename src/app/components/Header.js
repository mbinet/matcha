import React from "react";
import {Link} from "react-router";

export const Header = (props) => {
    return (
        <div className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li><Link to={"/home"} activeStyle={{color: "red"}}>Home</Link></li>
                        <li><Link to={"/user/3"} activeClassName={"active"}>User</Link></li>
                        <li><Link to={"/profile"} activeStyle={{color: "red"}}>Profile</Link></li>
                        <li><Link to={"/profile/update"} activeStyle={{color: "red"}}>Update Profile</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};