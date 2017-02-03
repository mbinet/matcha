import React from "react";

import {Header} from "./Header";
import {Notifs} from "./NotifsHandler";

export class Root extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Notifs />
                        <Header />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    };
}