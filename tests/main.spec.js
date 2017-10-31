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
      const fetchStub = sinon.stub(global, 'fetch');
      const artists = search();

      expect(fetchStub).to.have.been.calledOnce;

      fetchStub.restore();
    });

    it('should receive the correct url to fetch', () => {
      const fetchStub = sinon.stub(global, 'fetch');
      const artists = search('incubus', 'artist');

      expect(fetchStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist')

      const albums = search('incubus', 'album')

      expect(fetchStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=incubus&type=album')
    });
  });
});
