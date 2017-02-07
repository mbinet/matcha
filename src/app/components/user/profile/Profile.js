import React from "react";
import Request from "superagent";
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import {Tags} from "./Tags"
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import PhotoGallery from './PhotoGallery';
import cookie from 'react-cookie';
import Dialog from 'material-ui/Dialog';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

export class Profile extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {
                _id: "",
                name: "",
                age: "",
                mail: "",
                sex: "",
                loves: {
                    // b: true,
                    // g: true,
                    // t: true,
                },
                photo: {},
                bio: "",
                tags: [],
                city: "",
                popu: ""
            },
            canLike: true,
            doesLikeVisitor: ""
        };
    }

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users/getOne/" + this.props.params.id;
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
            this.setState({
                user: response.body.user,
            });

            // sending a visit event
            var url = "http://54.93.182.167:3000/api/visit/newVisit";
            var user = cookie.load('user');
            console.warn(this.state.user._id)
            Request.post(url)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({ token: cookie.load('token') })
                .send({ from: user })
                .send({ to: this.state.user._id })
                .then((response) => {
                    console.log("Notif sent.")
                });

            // asking if user can like or not
            var url = "http://54.93.182.167:3000/api/like/canILike";
            var user = cookie.load('user');
            Request.post(url)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({ token: cookie.load('token') })
                .send({ from: user })
                .send({ to: this.state.user._id })
                .then((response) => {
                    this.setState({
                        canLike: (response.body.result == 'true')
                    })
                });

            // checking if presented user likes visitor or not
            var url = "http://54.93.182.167:3000/api/like/doesLikeVisitor";
            var user = cookie.load('user');
            Request.post(url)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({ token: cookie.load('token') })
                .send({ visitor: user._id })
                .send({ liker: this.state.user._id })
                .then((response) => {
                    this.setState({
                        doesLikeVisitor: (response.body.result == 'true')
                    })
                });
        });

    }

    sendLike() {
        var user = cookie.load('user');
        if (user.photo.p1 == '400.jpeg') {
            alert(this.state.user.name + 'won\'t be interested in this kitten, add a photo of you ;)')
        }
        else {
            // sending a like event
            var url = "http://54.93.182.167:3000/api/like/newLike";
            Request.post(url)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({ token: cookie.load('token') })
                .send({ from: user })
                .send({ to: this.state.user._id })
                .then((response) => {
                    console.log("Like sent.")
                    this.componentWillMount()
                });
        }
    }

    sendUnlike() {
        // deleting the like
        var url = "http://54.93.182.167:3000/api/like/deleteLike";
        var user = cookie.load('user');
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token: cookie.load('token') })
            .send({ from: user })
            .send({ to: this.state.user._id })
            .then((response) => {
                console.log("Like deleted.")
                this.componentWillMount()
            });
    }

    getLove() {
        var maps = <FontAwesome className='fa fa-map-marker' name='' alt='mars' title='mars'/>;
        var city = this.state.user.city
        var text = " | interested in";
        if(this.state.user.loves.b == 'true')
            var mars = <FontAwesome className='fa fa-mars' name='' alt='mars' title='men' style={{color: 'rgb(0, 188, 212)'}}/>;
        if(this.state.user.loves.g == 'true')
            var venus = <FontAwesome className='fa fa-venus' name='' alt='venus' title='women' style={{color: 'pink'}}/>;
        if(this.state.user.loves.t == 'true')
            var trans = <FontAwesome className='fa fa-transgender' name='' alt='transgender' title='trans' style={{color: 'purple'}}/>;
        var res = <div>{maps} {city} {text} {mars} {venus} {trans}</div>;
        return res;
    }

    getSex(sex) {
        var res;
        switch (sex) {
            case "boy":
                res = <FontAwesome className='fa fa-mars' name='' alt='mars' title='men' style={{color: 'rgb(0, 188, 212)'}}/>
                break;
            case "girl":
                res = <FontAwesome className='fa fa-venus' name='' alt='venus' title='women' style={{color: 'pink'}}/>
                break;
            case "trans":
                res = <FontAwesome className='fa fa-transgender' name='' alt='transgender' title='trans' style={{color: 'purple'}}/>
                break;
        }
        return res
    }

    getLikeOrNot() {
        if (this.state.canLike == true) {
            var likeBtn = <FlatButton label={<FontAwesome className="fa fa-heartbeat" name="" style={{color: 'red'}}/>} onTouchTap={() => this.sendLike()}/>
        }
        else {
            var likeBtn = <div><small>You like {this.state.user.name}</small><FlatButton label='Unlike' onTouchTap={() => this.sendUnlike()}/></div>
        }
        // var res3 = <FlatButton label={<FontAwesome className="fa fa-envelope-o" name="" style={{color: 'red'}}/>} />
        var res = <div>{likeBtn}</div>
        return res
    }

    render() {
        var sex = this.getSex(this.state.user.sex);
        var name = this.state.user.name;
        var age = this.state.user.age;
        var photo = this.state.user.photo.p1;
        var bio = this.state.user.bio;
        var tags = this.state.user.tags;
        var style = {color: 'red'};
        var like = <FontAwesome className="fa fa-heartbeat" name="" style={{color: 'red'}}/>;
        var mail = <FontAwesome className="fa fa-envelope-o" name="" style={{color: 'red'}}/>;
        var icon = <FontAwesome className='fa fa-mars' name=''/>;
        return (
            <div className="">
                <div className="row text-center center-block">
                    <div className="col-xs-6 col-md-4 col-md-offset-4 text-center center-block col-centered">
                        <h3 className="text-center text-uppercase">
                            {name} <small className="text-capitalize">{age}</small> <small>{sex}</small>
                        </h3>
                        <hr />
                        <p className="text-center"><small> ID: {this.props.params.id}</small></p>
                    </div>
                </div>
                <div className="row">
                    <Card>
                        <CardHeader
                            subtitle={this.getLove()}
                        />
                        <CardText>
                            <PhotoGallery userID={this.state.user._id}/>
                        </CardText>
                        <CardActions style={{textAlign: 'center'}}>
                            {this.getLikeOrNot()}
                        </CardActions>
                    </Card>
                </div>
                <br/>
                <div className="row">
                    <Card>
                        <CardText>
                            <h4>A few words</h4>
                            {bio}
                        </CardText>
                    </Card>
                </div>
                <br />
                <div className="row">
                    <div className="">
                        <Card>
                            <CardText>
                                <Tags tags={tags}/>
                                {/*<Tags tags={["coucou", "les", "amis"]}/>*/}
                            </CardText>
                        </Card>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="">
                        <Card>
                            <CardText>
                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn>Height</TableRowColumn>
                                            <TableRowColumn>180 cm</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>Weight</TableRowColumn>
                                            <TableRowColumn>79 kg</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>Eyes</TableRowColumn>
                                            <TableRowColumn>Blue</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>

                            </CardText>
                        </Card>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="">
                        <Card>
                            <CardText>
                                <Table selectable={false}>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableRowColumn>Popularity</TableRowColumn>
                                            <TableRowColumn>{this.state.user.popu || 0}</TableRowColumn>
                                        </TableRow>
                                        <TableRow>
                                            <TableRowColumn>Likes you</TableRowColumn>
                                            <TableRowColumn>{String(this.state.doesLikeVisitor)}</TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardText>
                        </Card>
                    </div>
                </div>
            </div>
        )
    };
}