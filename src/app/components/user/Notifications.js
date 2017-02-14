import React from "react";
import Request from "superagent";
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import cookie from 'react-cookie';
import _ from 'lodash';
import {Link} from "react-router";
import DB from '../../other/db'

export class Notifications extends React.Component {

    constructor() {
        super();
        this.state = {
            notifs: [],
        }
    }

    componentWillMount() {
        var user =  cookie.load('user');
        var url = "http://54.93.182.167:3000/api/visit/getAll/" + user._id
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
                this.setState({
                    notifs: response.body.notifs,
                });
            })
    }

    render() {

        var data = [];
        var that = this
        _.forEach(this.state.notifs, function(n) {
            // var photoName = String(n.fromPhoto)
            if (n.type == "visit") {
                data.push(
                    <div key={n._id} style={{marginBottom: 10}}>
                        <Card>
                            <CardHeader
                                title={<span><Link
                                    to={'/profile/' + n.from}>{n.fromName}</Link> visited your profile</span>}
                                subtitle={<small>{n.dateTime}</small>}
                                avatar={'https://matcha-bucket.s3.amazonaws.com/Photos/' + n.fromPhoto}
                            />
                        </Card>
                    </div>
                )
            }
            else if (n.type == "like") {
                data.push(
                    <div key={n._id} style={{marginBottom: 10}}>
                        <Card>
                            <CardHeader
                                title={<span style={{color: 'pink'}}><Link
                                    to={'/profile/' + n.from}>{n.fromName}</Link> liked your profile</span>}
                                subtitle={<small>{n.dateTime}</small>}
                                avatar={'https://matcha-bucket.s3.amazonaws.com/Photos/' + n.fromPhoto}
                            />
                        </Card>
                    </div>
                )
            }
            else if (n.type == "likeBack") {
                data.push(
                    <div key={n._id} style={{marginBottom: 10}}>
                        <Card>
                            <CardHeader
                                title={<span style={{color: 'red'}}><Link
                                    to={'/profile/' + n.from}>{n.fromName}</Link> liked your profile back !</span>}
                                subtitle={<small>{n.dateTime}</small>}
                                avatar={'https://matcha-bucket.s3.amazonaws.com/Photos/' + n.fromPhoto}
                            />
                        </Card>
                    </div>
                )
            }
            else if (n.type == "unlike") {
                data.push(
                    <div key={n._id} style={{marginBottom: 10}}>
                        <Card>
                            <CardHeader
                                title={<span style={{color: 'blue'}}><Link
                                    to={'/profile/' + n.from}>{n.fromName}</Link> unliked your profile</span>}
                                subtitle={<small>{n.dateTime}</small>}
                                avatar={'https://matcha-bucket.s3.amazonaws.com/Photos/' + n.fromPhoto}
                            />
                        </Card>
                    </div>
                )
            }
            else if (n.type == "msg") {
                data.push(
                    <div key={n._id} style={{marginBottom: 10}}>
                        <Card>
                            <CardHeader
                                title={<span style={{}}>
                                    {n.fromName} sent you a new <Link to={'/chat/' + n.from}>message</Link></span>}
                                subtitle={<small>{n.dateTime}</small>}
                                avatar={'https://matcha-bucket.s3.amazonaws.com/Photos/' + n.fromPhoto}
                            />
                        </Card>
                    </div>
                )
            }
        })
        return (
            <div>
                {data}
            </div>
        )
    }
}