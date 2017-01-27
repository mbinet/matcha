import React from "react";
import Request from "superagent";
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import {Tags} from "./Tags"
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import PhotoGallery from './PhotoGallery';
import cookie from 'react-cookie';

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
                tags: []
            }
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
                console.log(this.state.user)
        });
    }

    getLove() {
        var maps = <FontAwesome className='fa fa-map-marker' name='' alt='mars' title='mars'/>;
        var text = "Paris | interested in";
        if(this.state.user.loves.b == 'true')
            var mars = <FontAwesome className='fa fa-mars' name='' alt='mars' title='men' style={{color: 'rgb(0, 188, 212)'}}/>;
        if(this.state.user.loves.g == 'true')
            var venus = <FontAwesome className='fa fa-venus' name='' alt='venus' title='women' style={{color: 'pink'}}/>;
        if(this.state.user.loves.t == 'true')
            var trans = <FontAwesome className='fa fa-transgender' name='' alt='transgender' title='trans' style={{color: 'purple'}}/>;
        var res = <div>{maps} {text} {mars} {venus} {trans}</div>;
        return res;
    }

    getSex(sex) {
        var res;
        switch (sex) {
            case "boy":
                res = <FontAwesome className='fa fa-mars' name='' alt='mars' title='men'/>
                break;
            case "girl":
                res = <FontAwesome className='fa fa-venus' name='' alt='venus' title='women'/>
                break;
            case "trans":
                res = <FontAwesome className='fa fa-transgender' name='' alt='transgender' title='trans'/>
                break;
        }
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
        var text = <div>From Paris | interested in <FontAwesome className='fa fa-mars' name=''/></div>;
        var icontext = [text, icon];
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
                            <FlatButton label={like} />
                            <FlatButton label={<FontAwesome className="fa fa-envelope-o" name="" style={{color: 'red'}}/>} />
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
                                <Table>
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
            </div>
        )
    };
}