/* eslint max-len: 0 */

import {
  abbr,
  sumChars,
  fetchImage,
  generateBackgroundStyle,
  getContainerStyle,
} from '../helpers';

beforeEach(function() {
  global.fetch = jest.fn().mockImplementation(() => {
    mockResponseObject = {
      '_bodyBlob': {
        '_data': {
        },
      },
      '_bodyInit': {
        '_data': {
        },
      },
      'headers': {
        'map': {
          'cache-control': 'public, max-age=7776000',
          'connection': 'keep-alive',
          'content-length': '271',
          'content-type': 'image/png',
          'date': 'Wed, 22 Apr 2020 12:57:32 GMT',
          'expires': 'Tue, 21 Jul 2020 12:57:32 +0000',
          'last-modified': 'Wed, 22 Apr 2020 12:57:32 GMT',
          'server': 'nginx',
          'x-powered-by': 'EasyEngine 3.7.4',
          'x-srcache-fetch-status': 'MISS',
          'x-srcache-store-status': 'STORE',
        },
      },
      'ok': true,
      'status': 200,
      'url': 'https://dummyimage.com/100x100/000/fff',
    };

    const p = new Promise((resolve, reject) => {
      resolve(
          mockResponseObject,
      );
    });
    return p;
  });
});

describe('test abbr function normally', () => {
  it('should return my initials', () => {
    expect(abbr('Avishay Bar')).toMatchSnapshot();
  });
});

describe('test abbr function when name starts with +', () => {
  it('should return my initials', () => {
    expect(abbr('+Avishay Bar')).toMatchSnapshot();
  });
});

describe('test abbr function when name is invalid', () => {
  it('should return my initials', () => {
    expect(abbr('!@# #!$#')).toMatchSnapshot();
  });
});

describe('test sumChars function', () => {
  it('should return the same sum', () => {
    expect(sumChars('Avishay Bar')).toMatchSnapshot();
  });
});

describe('test fetchImage funciton on a valid image', () => {
  it('calls the image url and return data', async () => {
    fetchImage('https://dummyimage.com/100x100/000/fff').then((res) => {
      expect(res).toBe(true);
    });
  });
});

describe('test generateBackgroundStyle function', () => {
  it('should return the same sum', () => {
    expect(generateBackgroundStyle('Avishay Bar', null, ['#2ecc71', '#3498db', '#8e44ad', '#e67e22', '#e74c3c', '#1abc9c', '#2c3e50'])).toMatchSnapshot();
  });
});

describe('test generateBackgroundStyle function', () => {
  it('should return the same sum', () => {
    expect(generateBackgroundStyle('Avishay Bar', '#2ecc71', ['#2ecc71', '#3498db', '#8e44ad', '#e67e22', '#e74c3c', '#1abc9c', '#2c3e50'])).toMatchSnapshot();
  });
});

describe('test getContainerStyle function', () => {
  it('should return the same sum', () => {
    expect(getContainerStyle(32, 'https://dummyimage.com/100x100/000/fff', 64)).toMatchSnapshot();
  });
});
