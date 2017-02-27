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
            },
            finalIMG: [],
            renderFull: false
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
            }, function() {
                this.goImg()
            });
        });
    }

    getImgSize(imgSrc, callback) {
        var newImg = new Image();

        newImg.onload = function() {
            this.setState({
                height: newImg.height,
                width: newImg.width

            })
            // var height = newImg.height;
            // var width = newImg.width;
        };

        newImg.src = imgSrc;
        callback(newImg);
    }

    goImg() {
        if(this.state.user.photo.p1 != "") {
            var that = this
            var i = 1
            var final = []
            _.forEach(this.state.user.photo, function (p) {
                if (p != "") {
                    var src = "https://matcha-bucket.s3.amazonaws.com/Photos/" + p
                    var newImg = new Image()
                    newImg.onload = function () {
                        final.push({
                            src: "https://matcha-bucket.s3.amazonaws.com/Photos/" + p,
                            thumbnail: "https://matcha-bucket.s3.amazonaws.com/Photos/" + p,
                            thumbnailWidth: newImg.width,
                            thumbnailHeight: newImg.height,
                            caption: that.state.user.name
                        })
                        that.updateFinal(final)
                    }
                    newImg.src = src
                }
                if (i == 5) {
                    setTimeout(function () {
                        that.setState({
                            renderFull: true
                        })

                    }, 200)
                }
                i++
            })
        }
    }
    updateFinal(final) {
        this.setState({
            finalIMG: final
        })
    }


    render() {
        if (this.state.renderFull == false) {
            return (
                <div></div>
            )
        }
        else {
            return (
                <div style={{overflow: 'hidden'}}>
                    <Gallery images={this.state.finalIMG} backdropClosesModal={true} enableImageSelection={false}/>
                </div>
            )
        }
    }
}