'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlbumTracks = exports.getAlbums = exports.getAlbum = undefined;

var _config = require('./config');

var _utils = require('./utils');

var getAlbum = function getAlbum(id) {
  return fetch(_config.API_URL + '/albums/' + id).then(_utils.toJSON);
};

var getAlbums = function getAlbums(ids) {
  return fetch(_config.API_URL + '/albums/?ids=' + ids).then(_utils.toJSON);
};

var getAlbumTracks = function getAlbumTracks(album) {
  return fetch(_config.API_URL + '/albums/' + album + '/tracks').then(_utils.toJSON);
};

exports.getAlbum = getAlbum;
exports.getAlbums = getAlbums;
exports.getAlbumTracks = getAlbumTracks;