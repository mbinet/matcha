import React from "react";
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

export class MyChip extends React.Component {
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
                    <Avatar src="http://placekitten.com/40/40" />
                    #Tatoo
                </Chip>
            </div>
        )
    };
}

/* this component should take an userID
* sends all the chips related to this user, all wrapped
 */
