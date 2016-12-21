import React from "react";
import Request from "superagent";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
import {MyChip} from "../MyChip"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import update from 'react-addons-update';
import Gallery from 'react-grid-gallery';


export class photoGallery extends React.Component {


    render() {
        const IMAGES =
            [{
                src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 174,
                isSelected: true,
                caption: "After Rain (Jeshu John - designerspics.com)"
            },
                {
                    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
                    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
                    thumbnailWidth: 320,
                    thumbnailHeight: 212,
                    tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
                    caption: "Boats (Jeshu John - designerspics.com)"
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 320,
                    thumbnailHeight: 212
                }]
        return (
            <Gallery images={IMAGES}/>
        )
    }
}