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

export class ProfileUpdate extends React.Component {

    constructor() {
        super();
        // this.setState({saveDisabled: 'true'});
        this.state = {
            user: {
                name: "",
                age: "",
                mail: "",
                photo: "",
                bio: ""
            },
            saveDisabled: true,
            activeSnack: false,
            msgSnack: ""
        };
    }

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users/" + this.props.params.id;
        Request.get(url).then((response) => {
            this.setState({
                user: response.body.user,
                saveDisabled: true,
                activeSnack: false
            })
        });
    }

    handleEnd() {
        var url = "http://54.93.182.167:3000/api/users/" + this.props.params.id;
        Request.put(url)
            .set('Content-Type', 'application/json')
            .send({ name: this.state.user.name })
            .send({ age: this.state.user.age })
            .send({ mail: this.state.user.mail })
            .send({ photo: this.state.user.photo })
            .send({ bio: this.state.user.bio })
            .end((response) => {
                console.log('modified');
                this.setState({
                    activeSnack: true,
                    msgSnack: "Profile updated",
                    saveDisabled: true
                });
                // browserHistory.push("/home", "jdec");
            });
    }

    _handleTextFieldChange(e) {
        this.setState({
            user: update(this.state.user, {[e.target.name]: {$set: e.target.value}}),
            saveDisabled: false,
            // don't know why but if not set to false, imgSnack comes everytime.
            activeSnack: false
        });
    }

    // _onDrop(files) {
    //     var file = files[0];
    //
    //     Request.get()
    // }

    handleFinishedUpload(res) {
        console.log(res.filename);
        this.setState({
            activeSnack: true,
            msgSnack: "Image uploaded",
            saveDisabled: false,
            user: update(this.state.user, {photo: {$set: res.filename}})
        });
    }
    render() {
        var icon = <FontAwesome className='fa fa-mars' name=''/>;
        var text = <div>From Paris | interested in <FontAwesome className='fa fa-mars' name=''/></div>;
        const uploaderStyle = {
            height: 200,
            border: 'dashed 2px #999',
            borderRadius: 5,
            position: 'relative',
            cursor: 'pointer',
        }

        const uploaderProps = {
            uploaderStyle,
            maxFileSize: 1024 * 1024 * 50,
            server: 'http://54.93.182.167:3000',
            s3Url: 'https://matcha-bucket.s3.amazonaws.com',
            signingUrlQueryParams: {uploadType: 'avatar'},
            headers: {'Access-Control-Allow-Origin': '*'}
        }
        const styles = {
            errorStyle: {
                textAlign: "left",
            },
            underlineStyle: {
                borderColor: orange500,
            },
            floatingLabelStyle: {
                color: orange500,
            },
            floatingLabelFocusStyle: {
                color: blue500,
            },
        };
        return (
            <div>
                <div className="row">

                    <Card>
                        <CardTitle title="Update your Profile" />
                        <div className="text-center">
                            <CardText>
                                <DropzoneS3Uploader
                                    onFinish={this.handleFinishedUpload.bind(this)}
                                    onProgress={this.jrigole}
                                    onError={this.errorfunction}
                                    accept="image/*"
                                    className="col-centered"
                                    {...uploaderProps}
                                />
                                <TextField
                                    floatingLabelText="Name"
                                    name="name"
                                    value={this.state.user.name}
                                    onChange={this._handleTextFieldChange.bind(this)}
                                />
                                <br />
                                <TextField
                                    floatingLabelText="Age"
                                    name="age"
                                    value={this.state.user.age}
                                    onChange={this._handleTextFieldChange.bind(this)}
                                />
                                <br />
                                <TextField
                                    floatingLabelText="Mail"
                                    name="mail"
                                    value={this.state.user.mail}
                                    onChange={this._handleTextFieldChange.bind(this)}
                                />
                                <br/>
                                <TextField
                                    hintText="Hi, I like stamps and cactus..."
                                    floatingLabelText="Tell us about you"
                                    multiLine={true}
                                    rows={2}
                                    name="bio"
                                    value={this.state.user.bio}
                                    onChange={this._handleTextFieldChange.bind(this)}
                                    style={{textAlign: "left"}} // so the FloatingLabelText doesn't stay centered
                                />
                            </CardText>
                        </div>

                        <CardActions style={{textAlign: 'center'}}>
                            <RaisedButton
                                label="Cancel"
                                onTouchTap={() => this.componentWillMount()} // gets data from server again
                            />
                            <RaisedButton
                                label="Save"
                                primary={true}
                                disabled={this.state.saveDisabled}
                                id="mdrlol"
                                onTouchTap={() => this.handleEnd()}
                            />
                        </CardActions>
                    </Card>
                </div>
                <Snackbar
                    open={this.state.activeSnack}
                    message={this.state.msgSnack}
                    autoHideDuration={4000}
                    className="text-center"
                />
            </div>
        )
    };
}
