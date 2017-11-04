import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();

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

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('incubus', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist')

        const albums = search('incubus', 'album');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=album')
      });

      context('passing more than type', () => {
        const artistsAndAlbums = search('incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist,album')
      });
    });

    it('should return the JSON Data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('Search Artist', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
    });
  });

  describe('Search Albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album')
    });
  });

  describe('Search Tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track')

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track')
    });
  });

  describe('Search Playlists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Incubus');

      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist')

      const playlists2 = searchPlaylists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist')
    });
  });
});
