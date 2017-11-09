import chai, { expect } from 'chai';
import { search, searchAlbums, searchArtists, searchPlaylists, searchTracks } from '../src/search';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke test', () => {
    it('shoud exist the search method', () => {
      expect(search).to.exist;
    });

    it('shoud exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('shoud exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('shoud exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('shoud exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('incubus', 'artist');

        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist')

        const albums = search('incubus', 'album');

        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=album')
      });

      context('passing more than type', () => {
        const artistsAndAlbums = search('incubus', ['artist', 'album']);

        expect(stubedFetch).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist,album')
      });
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ artist: 'name' });
      const albums = search('incubus', 'album');
      expect(albums.resolveValue).to.be.eql({ artist: 'name' });
    });
  });

  describe('Search Artist', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const artists2 = searchArtists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

      const albums2 = searchAlbums('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

      const tracks2 = searchTracks('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Incubus');

      expect(stubedFetch).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Incubus');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

      const playlists2 = searchPlaylists('Muse');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')
    });
  });
});
