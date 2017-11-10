import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch')

describe('SpotifyWrapper Library', () => {
  it('should create an instance of SpotifyWrapper', () => {
    let spotify = new SpotifyWrapper({});

    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    let spotify = new SpotifyWrapper({
      apiURL: 'https://new.api.here'
    })

    expect(spotify.apiURL).to.be.deep.equal('https://new.api.here')
  });

  it('should use the default apiURL if not provided', () => {
    let spotify = new SpotifyWrapper({})

    expect(spotify.apiURL).to.be.deep.equal('https://api.spotify.com/v1')
  });

  it('should receive token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: 'e078cb80a315c1545d5396567810bf94dc360f30bfdaae14ca6aad6cf9fe768d'
    });

    expect(spotify.token).to.be.deep.equal('e078cb80a315c1545d5396567810bf94dc360f30bfdaae14ca6aad6cf9fe768d');
  });

  it('should receive another token as an option', () => {
    let spotify = new SpotifyWrapper({
      token: '9d9280b03dd43a776628d19beebf0e7795d71ee52c7a68e08da76ef32f761482'
    });

    expect(spotify.token).to.be.deep.equal('9d9280b03dd43a776628d19beebf0e7795d71ee52c7a68e08da76ef32f761482')
  });

  describe('request method', () => {
    let stubedFetch;
    let promise;

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      let spotify = new SpotifyWrapper({});

      expect(spotify.request).to.exist;
    });

    it('should call fetch when request', () => {
      let spotify = new SpotifyWrapper({})

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the right url passed', () => {
      let spotify = new SpotifyWrapper({})

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url');
    });

    it('should call fetch with the right url passed', () => {
      let spotify = new SpotifyWrapper({
        token: '9d9280b03dd43a776628d19beebf0e7795d71ee52c7a68e08da76ef32f761482'
      })

      const headers = {
        headers: {
          Authorization: 'Bearer 9d9280b03dd43a776628d19beebf0e7795d71ee52c7a68e08da76ef32f761482'
        }
      }

      spotify.request('url');
      expect(stubedFetch).to.have.been.calledWith('url', headers);
    });
  });
});
