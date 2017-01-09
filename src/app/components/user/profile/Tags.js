import React from "react";
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import update from 'react-addons-update';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';


const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

function handleTouchTap() {
    alert('You clicked the Chip.');
}

export class Tags extends React.Component {

    render() {
        return (
            <div style={styles.wrapper}>
                <Chip
                    onTouchTap={handleTouchTap}
                    style={styles.chip}
                >
                    <Avatar src="http://placekitten.com/50/50" />
                    #Geek
                </Chip>
                <Chip
                    onTouchTap={handleTouchTap}
                    style={styles.chip}
                >
                    <Avatar src="http://placekitten.com/50/55" />
                    #Bio
                </Chip>
                <Chip
                    onTouchTap={handleTouchTap}
                    style={styles.chip}
                >
                    <Avatar src="http://placekitten.com/50/55" />
                    #Bio
                </Chip>
                <Chip
                    onTouchTap={handleTouchTap}
                    style={styles.chip}
                >
                    <Avatar src="http://placekitten.com/40/40" />
                    #Tatoo
                </Chip>
            </div>
        )
    }
}