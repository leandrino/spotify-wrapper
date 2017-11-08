'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlaylists = exports.searchTracks = exports.searchArtists = exports.searchAlbums = exports.search = undefined;

var _config = require('./config');

var _utils = require('./utils');

var search = function search(query, type) {
  fetch(_config.API_URL + '/search?q=' + query + '&type=' + type).then(_utils.toJSON);
};
var searchAlbums = function searchAlbums(query) {
  search(query, 'album');
};
var searchArtists = function searchArtists(query) {
  search(query, 'artist');
};
var searchTracks = function searchTracks(query) {
  search(query, 'track');
};
var searchPlaylists = function searchPlaylists(query) {
  search(query, 'playlist');
};

exports.search = search;
exports.searchAlbums = searchAlbums;
exports.searchArtists = searchArtists;
exports.searchTracks = searchTracks;
exports.searchPlaylists = searchPlaylists;