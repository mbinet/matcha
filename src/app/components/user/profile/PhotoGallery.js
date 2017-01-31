import React from "react";
import Request from "superagent";
import _ from 'lodash';
import Gallery from 'react-grid-gallery';
import cookie from 'react-cookie';


export default class photoGallery extends React.Component {

    constructor() {
        super();
        this.state = {
            user: {
                _id: "",
                name: "",
                age: "",
                mail: "",
                photo: {},
                bio: ""
            }
        };
    }

    componentWillReceiveProps(nextProps) {
        var url = "http://54.93.182.167:3000/api/users/getOne/" + nextProps.userID;
        Request.post(url)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ token : cookie.load('token') })
            .then((response) => {
            this.setState({
                user: response.body.user,
            });
        });
    }

    getImgSize(imgSrc) {
        var newImg = new Image();

        newImg.onload = function() {
            var height = newImg.height;
            var width = newImg.width || 0;
        };

        newImg.src = imgSrc;
        return(newImg);
    }

    render() {

        var img = [];
        if(this.state.user.photo.p1 != "") {
            _.forEach(this.state.user.photo, function (p) {
                if (p != "") {
                    var newImg = this.getImgSize("https://matcha-bucket.s3.amazonaws.com/Photos/" + p);
                    img.push(
                        {
                            src: "https://matcha-bucket.s3.amazonaws.com/Photos/" + p,
                            thumbnail: "https://matcha-bucket.s3.amazonaws.com/Photos/" + p,
                            thumbnailWidth: newImg.width || 0,
                            thumbnailHeight: newImg.height,
                            caption: this.state.user.name
                        }
                    );
                }
            }.bind(this));
        }

        return (
            <div style={{overflow: 'hidden'}}>
                <Gallery images={img} backdropClosesModal={true} enableImageSelection={false}/>
            </div>
        )
    }
}