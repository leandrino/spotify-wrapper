import chai, { expect } from 'chai';
import SpotifyWrapper from '../src/index';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let stubedFetch;
  let promise;
  let spotify;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token:'9d9280b03dd43a776628d19beebf0e7795d71ee52c7a68e08da76ef32f761482'
    });
    stubedFetch = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke test', () => {
    it('shoud exist the searchAlbums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('shoud exist the searchArtists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('shoud exist the searchTracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('shoud exist the searchPlaylists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('Search Artist', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const artists2 = spotify.search.artists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

      const albums2 = spotify.search.albums('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

      const tracks2 = spotify.search.tracks('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlists = spotify.search.playlists('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const playlists = spotify.search.playlists('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

      const playlists2 = spotify.search.playlists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')
    });
  });
});
