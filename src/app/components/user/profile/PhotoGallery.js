import React from "react";
import Request from "superagent";
import _ from 'lodash';
import Gallery from 'react-grid-gallery';


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
        console.log("Bon user id :", nextProps.userID);
        var url = "http://54.93.182.167:3000/api/users/" + nextProps.userID;
        Request.get(url).then((response) => {
            this.setState({
                user: response.body.user,
            });
        });
    }

    getImgSize(imgSrc) {
        var newImg = new Image();

        newImg.onload = function() {
            var height = newImg.height;
            var width = newImg.width;
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
                    console.log("width: ", newImg.height);
                    img.push(
                        {
                            src: "https://matcha-bucket.s3.amazonaws.com/Photos/" + p,
                            thumbnail: "https://matcha-bucket.s3.amazonaws.com/Photos/" + p,
                            thumbnailWidth: newImg.width,
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