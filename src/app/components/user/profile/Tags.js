import React from "react";
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import update from 'react-addons-update';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import _ from 'lodash';
import cookie from 'react-cookie';


/**
 * Here you display tags and delete them
 */

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        // flexWrap: 'wrap',
    },
};

function handleTouchTap() {
    alert('You clicked the Chip.');
}


export class Tags extends React.Component {

    constructor () {
        super();
        this.state = {
            tagsTable: [],
            tags: []
        }
    }

    handleRequestDelete(event) {
        this.state.tags.splice(this.state.tags.indexOf(event), 1);

        let user = cookie.load('user');

        // if the you delete the last tag, then the table is empty.
        // as an empty table is not sent to the api we have to send an instruction anyway
        if(this.state.tags.length == 0)
            this.state.tags[0] = "delete them all";
        var that = this;
        var url = "http://54.93.182.167:3000/api/users/updateOne/" + user._id;
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .send({ name: user.name })
            .send({ tags: this.state.tags })
            .then((response) => {
                // reloads parent component (ProfileUpdate)
                that.props.reload();
            })
    }

    componentWillReceiveProps(nextProps) {
        var that = this;

        // reset the table because props are often sent (in order to avoid key problems)
        that.state.tagsTable = [];
        if (typeof nextProps.tags != 'object') {
            that.state.tags[0] = nextProps.tags
            if (nextProps.isDeletable == true) {
                that.state.tagsTable.push(
                    <Chip onTouchTap={handleTouchTap}
                          style={styles.chip}
                          key={nextProps.tags + Math.random()}
                          onRequestDelete={() => that.handleRequestDelete(nextProps.tags)}
                    >
                        {nextProps.tags}
                    </Chip>
                )
            }
            else {
                that.state.tagsTable.push(
                    <Chip onTouchTap={handleTouchTap}
                          style={styles.chip}
                          key={nextProps.tags + Math.random()}
                    >
                        {nextProps.tags}
                    </Chip>
                )
            }
        }
        else {
            that.state.tags = nextProps.tags
            _.forEach(nextProps.tags, function(p) {
                if (nextProps.isDeletable == true) {
                    that.state.tagsTable.push(
                        <Chip onTouchTap={handleTouchTap}
                              style={styles.chip}
                              key={p + Math.random()}
                              onRequestDelete={() => that.handleRequestDelete(p)}
                        >
                            {p}
                        </Chip>
                    )
                }
                else {
                    that.state.tagsTable.push(
                        <Chip onTouchTap={handleTouchTap}
                              style={styles.chip}
                              key={p + Math.random()}
                        >
                            {p}
                        </Chip>
                    )
                }
            })
        }
    }


    render() {
        return (
            <div style={styles.wrapper}>
                {this.state.tagsTable}
            </div>
        )
    }
}