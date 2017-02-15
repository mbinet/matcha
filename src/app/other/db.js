import React from "react";
import cookie from 'react-cookie';
import Request from 'superagent';

exports.getNameFromId = function (id, callback) {
    var url = "http://54.93.182.167:3000/api/users/getOne/" + id
    Request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ token : cookie.load('token') })
        .then((response) => {
            callback(response.body.user.name)
        })
}

exports.getPhotoFromId = function (id, callback) {
    var url = "http://54.93.182.167:3000/api/users/getOne/" + id
    Request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ token : cookie.load('token') })
        .then((response) => {
            callback(response.body.user.photo.p1)
        })
}

exports.updateUserToken = function () {
    var user = cookie.load('user')
    var url = "http://54.93.182.167:3000/api/users/getOne/" + user._id
    Request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ token : cookie.load('token') })
        .then((response) => {
            cookie.save('user', response.body.user, { path: '/'});
        })
}