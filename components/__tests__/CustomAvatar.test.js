/* eslint max-len: 0 */

import 'react-native';
import {Image} from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {CustomAvatar} from '../';

it('should render <CustomAvatar /> with local image reference', () => {
  const tree = renderer.create(<CustomAvatar component={<Image source={require('./images/rn_logo.png')} style={{ width: 50, height: 50}} />} size={50} />).toJSON();
  expect(tree).toMatchSnapshot();
});
