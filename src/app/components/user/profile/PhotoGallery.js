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
                var newImg = this.getImgSize("https://matcha-bucket.s3.amazonaws.com/" + p);
                console.log("width: ", newImg.height);
                img.push(
                    {
                        src: "https://matcha-bucket.s3.amazonaws.com/" + p,
                        thumbnail: "https://matcha-bucket.s3.amazonaws.com/" + p,
                        // isSelected: true,
                        thumbnailWidth: newImg.height,
                        thumbnailHeight: newImg.width,
                        caption: this.state.user.name
                    }

                    // {/*<img src={"https://matcha-bucket.s3.amazonaws.com/" + p} alt=""*/}
                    //           {/*style={{maxWidth: '100%', maxHeight: '100%'}}/>*/}
                );
            }.bind(this));
        }

        return (
            <div>
                Ahahahahah cuco
                <Gallery images={img} backdropClosesModal={true} enableImageSelection={false}/>
                {this.props.userID}
            </div>
        )
    }
}