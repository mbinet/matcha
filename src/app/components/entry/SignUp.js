import React from 'react';
import {Step, Stepper, StepButton, StepContent} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontAwesome from 'react-fontawesome';
import Checkbox from 'material-ui/Checkbox'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Request from "superagent";
import { browserHistory } from "react-router";
import sha256 from 'sha256';

export class SignUp extends React.Component {

    state = {
        stepIndex: 0,
        name: "",
        age: "",
        mail: "",
        passwd: "",
        sex: "",
        photo: {
            p1: "",
            p2: "",
            p3: "",
            p4: "",
            p5: "",
        },
        bio: "",
    };

    setDefaultPicture() {
        this.state.photo.p1 = "Photos/400.jpeg";
    }

    handleEnd(state) {
        this.setDefaultPicture();
        this.state.photo.p1 = "400.jpeg";
        console.log(this.state.photo);
        var url = "http://54.93.182.167:3000/api/users/";
        var shaPass = sha256(this.state.passwd);
        Request.post(url)
            .set('Content-Type', 'application/json')
            .send({ name: this.state.name })
            .send({ age: this.state.age })
            .send({ mail: this.state.mail })
            .send({ photo: this.state.photo })
            .send({ passwd: shaPass })
            .send({ sex: this.state.sex })
            .send({ bio: this.state.bio })
            .end((response) => {
                console.log('inserted');
                console.log(response);
                browserHistory.push("/home", "jdec");
            });
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        const {mail} = this.state;
        if (stepIndex < 2) {
            this.setState({stepIndex: stepIndex + 1});
            console.log(this.state.mail);
            console.log(this.state.passwd);
        }
        switch (stepIndex) {
            case 0 : {
                console.log(this.state.mail);
                console.log(this.state.passwd);
                break;
            }
            case 1 : {
                console.log('step 1');
                console.log(this.state.sex);
                break;
            }
            case 2 : {
                console.log(this.state.bio);
                this.handleEnd(this.state);
                break;
            }
            default: {
                this.setState({stepIndex: stepIndex + 1});
            }
        }
    };



    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions(step) {
        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label="Next"
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    _handleTextFieldChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _handleKeyDown(event) {
        if (event.which === 13) {
            this.handleNext();
        }
    }

    handleButtons(type) {
        this.state.sex = type;
        console.log(type);
        this.handleNext();
    }

    render() {
        const styles = {
            button: {
                margin: 12,
            },
            exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                width: '100%',
                opacity: 0,
            },
        };
        const {stepIndex} = this.state;
        return (
            <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
                <Stepper
                    activeStep={stepIndex}
                    linear={false}
                    orientation="vertical"
                >
                    <Step>
                        <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                            Basic infos
                        </StepButton>
                        <StepContent>
                            <TextField
                                hintText="John"
                                floatingLabelText="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this._handleTextFieldChange.bind(this)}
                            />
                            <TextField
                                hintText="18"
                                floatingLabelText="Age"
                                name="age"
                                value={this.state.age}
                                onChange={this._handleTextFieldChange.bind(this)}
                            />
                            <TextField
                                hintText="john@doe.com"
                                floatingLabelText="Email"
                                name="mail"
                                value={this.state.mail}
                                onChange={this._handleTextFieldChange.bind(this)}
                            />
                            <TextField
                                type="password"
                                hintText="••••••••"
                                floatingLabelText="Password"
                                name="passwd"
                                value={this.state.passwd}
                                onChange={this._handleTextFieldChange.bind(this)}
                                onKeyDown={this._handleKeyDown.bind(this)}
                            />
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                            You are
                        </StepButton>
                        <StepContent>
                            <RaisedButton
                                primary ={true}
                                icon={<FontAwesome className='fa fa-mars' name=''/>}
                                //style={{marginLeft: '12px'}}
                                label={'boy'}
                                style={{margin: '12px'}}
                                onTouchTap={this.handleButtons.bind(this, 'boy')}
                            />
                            <RaisedButton
                                secondary ={true}
                                icon={<FontAwesome className='fa fa-mars' name=''/>}
                                //style={{marginLeft: '12px'}}
                                label={'girl'}
                                style={{margin: '12px'}}
                                onTouchTap={this.handleButtons.bind(this, 'girl')}
                            />
                            <RaisedButton
                                default ={true}
                                icon={<FontAwesome className='fa fa-mars' name=''/>}
                                //style={{marginLeft: '12px'}}
                                label={'trans'}
                                style={{margin: '12px'}}
                                onTouchTap={this.handleButtons.bind(this, 'trans')}
                            />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                            A few words
                        </StepButton>
                        <StepContent>
                            <TextField
                                hintText="Hi, I like stamps and cactus..."
                                floatingLabelText="Tell us about you"
                                multiLine={true}
                                rows={2}
                                name="bio"
                                value={this.state.bio}
                                onChange={this._handleTextFieldChange.bind(this)}
                                onKeyDown={this._handleKeyDown.bind(this)}
                            />
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}