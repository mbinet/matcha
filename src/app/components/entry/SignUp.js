
    import React from 'react';
    import {
    Step,
    Stepper,
    StepButton,
    StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


// export class SignUp extends React.Component {
//
//     render() {
//         return (
//             <div>
//                 <h3>SIGNUP</h3>
//             </div>
//         );
//     }
// }
export class SignUp extends React.Component {


    state = {
        stepIndex: 0,
        mail: "",
        passwd: "",
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        const {mail} = this.state;
        if (stepIndex < 2) {
            this.setState({stepIndex: stepIndex + 1});
            console.log(this.state.mail);
            console.log(this.state.passwd);
        }
        else {
            console.log(mail);
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
            console.log('TAMERE');
        }
        console.log(event.which);
    }

    render() {
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
                            Create an ad group
                        </StepButton>
                        <StepContent>
                            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                            Create an ad
                        </StepButton>
                        <StepContent>
                            <p>
                                Try out different ad text to see what brings in the most customers,
                                and learn how to enhance your ads using features like ad extensions.
                                If you run into any problems with your ads, find out how to tell if
                                they're running and how to resolve approval issues.
                            </p>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    }
}