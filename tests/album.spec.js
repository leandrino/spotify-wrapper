import chai, { expect } from 'chai';
import SpotifyWrapper from '../src/index';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;
  let spotify;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token:'Bearer 9d9280b03dd43a776628d19beebf0e7795d71ee52c7a68e08da76ef32f761482'
    });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke test', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
    const album = spotify.album.getAlbum();
    expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Baj');
      expect(stubedFetch).to.have.been.
        calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Baj');

        const otherAlbum = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Bal')
        expect(stubedFetch).to.have.been.
          calledWith('https://api.spotify.com/v1/albums/0sNOF9WDwhWunNAHPD3Bal');
      });

      it('should return the correct data from promise', () => {
        promise.resolves({ album: 'name' });
        const album = spotify.album.getAlbum('0sNOF9WDwhWunNAHPD3Baj');
        expect(album.resolveValue).to.be.eql({ album: 'name' });
      });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
    const album = spotify.album.getAlbums();
    expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
      expect(stubedFetch).to.have.been.
        calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4');

        const otherAlbums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4', '6UXCm6bOO4gFlDQZV5yL37'])
        expect(stubedFetch).to.have.been.
          calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,6JWc4iAiJ9FjyK0B59ABb4,6UXCm6bOO4gFlDQZV5yL37');
      });

      it('should return the correct data from promise', () => {
        promise.resolves({ album: 'name' });
        const albums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '6JWc4iAiJ9FjyK0B59ABb4']);
        expect(albums.resolveValue).to.be.eql({ album: 'name' });
      });
  });

  describe('getAlbumTracks', () => {
    it('shold call fetch method', () => {
      const tracks = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('shold call fetch with the correct URL', () => {
      const tracks = spotify.album.getTracks('6akEvsycLGftJxYudPjmqK');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK/tracks');

      const othersTracks = spotify.album.getTracks('6akEvsycLGftJxYudPjmql');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmql/tracks');
    });

    it('should return the correct data from promise', () => {
      promise.resolves({ track: 'one track' });
      const tracks = spotify.album.getTracks('6akEvsycLGftJxYudPjmql')
      expect(tracks.resolveValue).to.be.eql({ track: 'one track' });
    });
  });
});
