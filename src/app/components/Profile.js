import React from "react";
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
import {MyChip} from "./user/MyChip"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
                name: "",
                age: "",
                mail: "",
                bio: ""
            }
        };
    }

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users/" + this.props.params.id;
        console.log(url);
        Request.get(url).then((response) => {
            this.setState({
                user: response.body.user
            })
        });
    }

    getLove() {
        var maps = <FontAwesome className='fa fa-map-marker' name='' alt='mars' title='mars'/>;
        var text = "Paris | interested in";
        var mars = <FontAwesome className='fa fa-mars' name='' alt='mars' title='men'/>;
        var venus = <FontAwesome className='fa fa-venus' name='' alt='venus' title='women'/>;
        var trans = <FontAwesome className='fa fa-transgender' name='' alt='transgender' title='trans'/>;
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
        var bio = this.state.user.bio;
        var style = {color: 'red'};
        var like = <FontAwesome className="fa fa-heartbeat" name="" style={{color: 'red'}}/>;
        var mail = <FontAwesome className="fa fa-envelope-o" name="" style={{color: 'red'}}/>;
        var icon = <FontAwesome className='fa fa-mars' name=''/>;
        var text = <div>From Paris | interested in <FontAwesome className='fa fa-mars' name=''/></div>;
        var icontext = [text, icon];
        console.log(typeof icon);
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
                        <CardMedia>
                            <img src="http://placekitten.com/800/250" alt=""/>
                        </CardMedia>
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
                                <MyChip/>
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