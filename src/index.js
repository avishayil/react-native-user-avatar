import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import {
  TextAvatar,
  ImageAvatar,
  CustomAvatar,
} from './components/'; ;
import {
  fetchImage,
  getContainerStyle,
  generateBackgroundStyle,
  generateBackgroundColor,
} from './helpers';

const UserAvatar = (props) => {
  let {
    name,
    src,
    bgColor,
    bgColors,
    textColor,
    size,
    imageStyle,
    style,
    borderRadius,
    component,
    noUpperCase,
    textStyle,
  } = props;

  // Validations
  if (typeof (size) === 'string') {
    console.warn('size prop should be a number');
    size = parseInt(size);
  }

  const [inner, setInner] = useState(
      <TextAvatar
        textColor={textColor}
        size={size}
        name={name}
        noUpperCase={noUpperCase}
        textStyle={textStyle}
      />);

  useEffect(() => {
    if (component) {
      setInner(<CustomAvatar size={size} component={component} />);
    } else if (src) {
      const controller = new (AbortController || window.AbortController)();
      fetchImage(src, {signal: controller.signal}).then((isImage) => {
        if (isImage) {
          setInner(
              <ImageAvatar src={src} size={size} imageStyle={imageStyle} />,
          );
        }
      });
      return () => controller.abort();
    } else {
      setInner(<TextAvatar textColor={textColor} size={size} name={name} />);
    }
  }, [textColor, size, name, component, imageStyle, src]);

  return (
    <View style={[
      generateBackgroundStyle(name, bgColor, bgColors),
      getContainerStyle(size, src, borderRadius),
      style]}
    >
      {inner}
    </View>
  );
};

UserAvatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  bgColor: PropTypes.string,
  bgColors: PropTypes.array,
  textColor: PropTypes.string,
  size: PropTypes.number,
  imageStyle: PropTypes.object,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  borderRadius: PropTypes.number,
  component: PropTypes.any,
  noUpperCase: PropTypes.bool,
  textStyle: PropTypes.object,
};

UserAvatar.defaultProps = {
  size: 32,
  textColor: '#fff',
  name: 'John Doe',
  bgColors: [ // from https://flatuicolors.com/
    '#2ecc71', // emerald
    '#3498db', // peter river
    '#8e44ad', // wisteria
    '#e67e22', // carrot
    '#e74c3c', // alizarin
    '#1abc9c', // turquoise
    '#2c3e50', // midnight blue
  ],
  textStyle: {},
};

export {generateBackgroundColor};

export default UserAvatar;
