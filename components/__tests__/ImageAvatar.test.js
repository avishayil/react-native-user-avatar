/* eslint max-len: 0 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {ImageAvatar} from '../';

it('should render <ImageAvatar /> with src, size and imageStyle', () => {
  const tree = renderer.create(<ImageAvatar src="https://dummyimage.com/100x100/000/fff" size={100} imageStyle={{borderRadius: 50, width: 100, height: 100}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render <ImageAvatar /> with src and size', () => {
  const tree = renderer.create(<ImageAvatar src="https://dummyimage.com/100x100/000/fff" size={100} borderRadius={50} />).toJSON();
  expect(tree).toMatchSnapshot();
});
