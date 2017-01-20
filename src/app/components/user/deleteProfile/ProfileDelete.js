import React from "react";
import Request from "superagent";
import cookie from 'react-cookie';

export class ProfileDelete extends React.Component {


    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users/delete/" + this.props.params.id;
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
                console.log("User Deleted.");
           });
    }

    render() {

        return (
            <div>
                deleted lol
            </div>
        )
    };
}