import React from "react";
import Request from "superagent";

export class Profile extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillMount() {
        var url = "http://46.101.198.52:3000/api/users/" + this.props.params.id;
        console.log(url);
        Request.get(url).then((response) => {
            this.setState({
                user: response.body.user
            });
            // console.log(this.state.user);
        });
    }

    render() {
        console.log(this.state.user);
        var test = this.state.user;
        setTimeout(function() { console.log(test.age) }, 4000);
        // console.log(test.age);

        return (
            <div>
                <h3>The Profile Page</h3>
                {/*a{test}a*/}
                {/*{this.state.user.name}*/}
                <p>User ID: {this.props.params.id}</p>
            </div>
        )
    };
}