import React from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';

const ImageAvatar = (props) => {
  const {
    src,
    source,
    size,
    imageStyle,
    borderRadius,
  } = props;

  const imageDefaultStyle = {
    borderRadius: borderRadius ? borderRadius : (size * 0.5),
    width: size,
    height: size,
  };

  const newProps = {
    style: [imageDefaultStyle, imageStyle],
    source: !!src ? {uri: src} : source,
  };

  return React.createElement(Image, newProps);
};

ImageAvatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  imageStyle: PropTypes.object,
  borderRadius: PropTypes.number,
};

export default ImageAvatar;
