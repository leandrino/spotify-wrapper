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
  describe('smoke test', () => {
    it('shoud exist the search method', () => {5
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
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();

    });
    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {

      context('passing one type', () => {
        const artists = search('incubus', 'artist');

        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist')

        const albums = search('incubus', 'album')

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
      console.log(promise.thenable.resolveValue)
      console.log(artists)
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });
});
