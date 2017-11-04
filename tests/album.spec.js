/**
 * TODO: getAlbum() getAlbumTracks
 */

 import { expect } from 'chai';
 import { getAlbum, getAlbumTracks } from '../src/album';

 describe('Album', () => {
   describe('smoke test', () => {
     it('should have getAlbum method', () => {
       expect(getAlbum).to.exist;
     });

     it('should have getAlbumTracks method', () => {
       expect(getAlbumTracks).to.exist;
     });
   });
 });
