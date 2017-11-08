/**
 * TODO: getAlbum() getAlbumTracks
 */

import chai, { expect } from 'chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
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
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
    const album = getAlbum();
    expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(stubedFetch).to.have.been.
        calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');
        
        const otherAlbum = getAlbum('0sNOF9WDwhWunNAHPD3Bal')
        expect(stubedFetch).to.have.been.
          calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bal');
      });

      it('should return the correct data from promise', () => {
        promise.resolves({ album: 'name' });
        const album = getAlbum('0sNOF9WDwhWunNAHPD3Baj');
        expect(album.resolveValue).to.be.eql({ album: 'name' });
      });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
    const album = getAlbums();
    expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
      expect(stubedFetch).to.have.been.
        calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4');
        
        const otherAlbums = getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4', '6UXCm6bOO4gFlDQZV5yL37'])
        expect(stubedFetch).to.have.been.
          calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4,6UXCm6bOO4gFlDQZV5yL37');
      });

      it('should return the correct data from promise', () => {
        promise.resolves({ album: 'name' });
        const albums = getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
        expect(albums.resolveValue).to.be.eql({ album: 'name' });
      });
  });

  describe('getAlbumTracks', () => {
    it('shold call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('shold call fetch with the correct URL', () => {
      const tracks = getAlbumTracks('6akEvsycLGftJxYudPjmqK');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks');

      const othersTracks = getAlbumTracks('6akEvsycLGftJxYudPjmql');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmql/tracks');
    });

    it('should return the correct data from promise', () => {
      promise.resolves({ track: 'one track' });
      const tracks = getAlbumTracks('6akEvsycLGftJxYudPjmql')
      expect(tracks.resolveValue).to.be.eql({ track: 'one track' });
    });
  });
});
