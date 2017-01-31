import React from "react";
import {Card, CardActions, CardTitle, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import update from 'react-addons-update';
import Request from 'superagent';
import sha256 from 'sha256';
import cookie from 'react-cookie';
import { browserHistory } from "react-router";
import {Link} from "react-router";
import FontAwesome from 'react-fontawesome';


export default class UserCard extends React.Component {

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

    render() {
        var user = this.props.user;
        var sex = this.getSex(this.props.user.sex);
        var mapsIcon = <FontAwesome className='fa fa-map-marker' name='' alt='mars' title='mars'/>
        var nameSexe = <div>{user.name} {sex}</div>
        var subtitle = (
            <div>
                {mapsIcon} {user.city}
            </div>
        )
        return (
            <div>
                <Card style={{maxWidth: 300}}>
                    <Link to={'/profile/' + user._id}>
                        <CardHeader
                            title={nameSexe}
                            subtitle={subtitle}
                            //avatar={'https://matcha-bucket.s3.amazonaws.com/Photos/' + user.photo.p1}
                        />
                        <CardMedia
                            //style={{height: 50}}
                            //mediaStyle={{height: 50}}
                        >
                            <img
                                src={'https://matcha-bucket.s3.amazonaws.com/Photos/' + user.photo.p1}
                                //style={{height: '50px !important'}}
                                //height="100"
                            />
                        </CardMedia>
                        {/*<CardText>*/}
                            {/*Bonjour {sex}*/}
                        {/*</CardText>*/}
                    </Link>
                </Card>
            </div>
        );
    }
}