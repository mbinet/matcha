import React from "react";
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
// import {MyChip} from "./user/MyChip"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import {orange500, blue500} from 'material-ui/styles/colors';
import update from 'react-addons-update';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import Dropzone from 'react-dropzone'

export class ProfileDelete extends React.Component {


    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users/" + this.props.params.id;
        Request.delete(url).then((response) => {
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