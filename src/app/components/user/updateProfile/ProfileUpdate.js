import React from "react";
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import _ from 'lodash';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import update from 'react-addons-update';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'
import UpdateTags from './UpdateTags';

export class ProfileUpdate extends React.Component {

    constructor() {
        super();
        // this.setState({saveDisabled: 'true'});
        this.state = {
            user: {
                name: "",
                age: "",
                mail: "",
                photo: {
                    p1: "",
                    p2: "",
                    p3: "",
                    p4: "",
                    p5: "",
                },
                bio: ""
            },
            saveDisabled: true,
            activeSnack: false,
            msgSnack: "",
            photoIndex: 0,
        };
    }

    componentWillMount() {
        var url = "http://54.93.182.167:3000/api/users/" + this.props.params.id;
        Request.get(url).then((response) => {
            this.setState({
                user: response.body.user,
                saveDisabled: true,
                activeSnack: false
            });

            console.log(this.state.user)
            // this.setState({
            //     user: update(this.state.user, {photo: {$set: "https://matcha-bucket.s3.amazonaws.com/" + this.state.user.photo}})
            // });
        });
    }

    enableSaving() {
        this.setState({
            saveDisabled: false
        })
    }

    handleEnd() {
        this.refs.autocomplete.submitForm()
        this.refs.autocomplete.componentWillMount();
        // setTimeout(function() {
        //
        // }, 300)

        var url = "http://54.93.182.167:3000/api/users/" + this.props.params.id;
        Request.put(url)
            .set('Content-Type', 'application/json')
            .send({ name: this.state.user.name })
            .send({ age: this.state.user.age })
            .send({ mail: this.state.user.mail })
            .send({ photo: this.state.user.photo })
            .send({ bio: this.state.user.bio })
            .end((response) => {
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

    handleFinishedUpload(res) {
        var filename = res.filename.replace("Photos/", "");
        this.setState({
            activeSnack: true,
            msgSnack: "Image uploaded",
            saveDisabled: false,
            user: update(this.state.user, {photo: {[this.state.photoIndex]: {$set: filename}}})
        });

    }

    handleDeletePicture(e) {
        var previousPhoto = this.state.user.photo[e];
        console.log(previousPhoto);

        // deletes url in the state and saves current user state to db.
        this.setState({
            user: update(this.state.user, {photo: {[e]: {$set: ""}}}),
            saveDisabled: false
        }, this.handleEnd);

        // deletes the photo from s3
        var url = "http://54.93.182.167:3000/api/photo/" + previousPhoto;
        Request.delete(url)
            .set('Content-Type', 'application/json')
    }

    render() {
        const uploaderProps = {
            maxFileSize: 1024 * 1024 * 50,
            server: 'http://54.93.182.167:3000',
            s3Url: 'https://matcha-bucket.s3.amazonaws.com',
            signingUrlQueryParams: {uploadType: 'avatar'},
            headers: {'Access-Control-Allow-Origin': '*'}
        };

        const styles = {
            dropzoneStyle: {
                width: '200px', height: '200px',
                margin: '10px',
                padding: '5px',
                border: '2px dashed rgb(153, 153, 153)', borderRadius: '5px',
                cursor: 'pointer',
                display: 'inline-block',
                position: 'relative'
            }
        };

        // displays the current pic.
        var img = [];
        _.forEach(this.state.user.photo, function (p) {
            if(p != "") {
                img.push(<img src={"https://matcha-bucket.s3.amazonaws.com/Photos/" + p} alt="" style={{maxWidth: '100%', maxHeight: '100%', position: 'relative'}}/>);
            }
            else {
                img.push(<img src={""} alt="" style={{maxWidth: '100%', maxHeight: '100%', position: 'relative'}}/>);
            }
        });

        return (
            <div>
                <div className="row">
                    <Card>
                        <CardTitle title="Update your Profile" />
                        <div className="text-center">
                            <CardText>
                                <div className="col-sm-6 row" style={{display: 'block'}}>
                                    <div className="col-xs-6 col-sm-6">
                                        <DropzoneS3Uploader
                                            onFinish={this.handleFinishedUpload.bind(this)}
                                            onDrop={() => this.setState({photoIndex: 'p1'})}
                                            accept="image/*"
                                            {...uploaderProps}
                                            className={"col-xs-6"}
                                            style={styles.dropzoneStyle}
                                        >
                                            {img[0]}
                                        </DropzoneS3Uploader>
                                        <div className="col-xs-6 col-centered" style={{display: 'inline-block'}}>
                                            <RaisedButton label="Delete" secondary={true} onTouchTap={() => this.handleDeletePicture('p1')}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-6">
                                        <DropzoneS3Uploader
                                            onFinish={this.handleFinishedUpload.bind(this)}
                                            onDrop={() => this.setState({photoIndex: 'p2'})}
                                            accept="image/*"
                                            {...uploaderProps}
                                            className={"col-xs-6"}
                                            style={styles.dropzoneStyle}
                                        >
                                            {img[1]}
                                        </DropzoneS3Uploader>
                                        <div className="col-xs-6 col-centered" style={{display: 'inline-block'}}>
                                            <RaisedButton label="Delete" secondary={true} onTouchTap={() => this.handleDeletePicture('p2')}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <DropzoneS3Uploader
                                            onFinish={this.handleFinishedUpload.bind(this)}
                                            onDrop={() => this.setState({photoIndex: 'p3'})}
                                            accept="image/*"
                                            {...uploaderProps}
                                            className={"col-xs-6"}
                                            style={styles.dropzoneStyle}
                                        >
                                            {img[2]}
                                        </DropzoneS3Uploader>
                                        <div className="col-xs-6 col-centered" style={{display: 'inline-block'}}>
                                            <RaisedButton label="Delete" secondary={true} onTouchTap={() => this.handleDeletePicture('p3')}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <DropzoneS3Uploader
                                            onFinish={this.handleFinishedUpload.bind(this)}
                                            onDrop={() => this.setState({photoIndex: 'p4'})}
                                            accept="image/*"
                                            {...uploaderProps}
                                            className={"col-xs-6"}
                                            style={styles.dropzoneStyle}
                                        >
                                            {img[3]}
                                        </DropzoneS3Uploader>
                                        <div className="col-xs-6 col-centered" style={{display: 'inline-block'}}>
                                            <RaisedButton label="Delete" secondary={true} onTouchTap={() => this.handleDeletePicture('p4')}/>
                                        </div>
                                    </div>
                                    <div className="col-xs-6">
                                        <DropzoneS3Uploader
                                            onFinish={this.handleFinishedUpload.bind(this)}
                                            onDrop={() => this.setState({photoIndex: 'p5'})}
                                            accept="image/*"
                                            {...uploaderProps}
                                            className={"col-xs-6"}
                                            style={styles.dropzoneStyle}
                                        >
                                            {img[4]}
                                        </DropzoneS3Uploader>
                                        <div className="col-xs-6 col-centered" style={{display: 'inline-block'}}>
                                            <RaisedButton label="Delete" secondary={true} onTouchTap={() => this.handleDeletePicture('p5')}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <br />
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
                                    <br />
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
                                    <br />
                                    <UpdateTags func={this.enableSaving.bind(this)} ref="autocomplete"/>
                                    <br/>
                                </div>
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