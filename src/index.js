import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {
  TextAvatar,
  ImageAvatar,
  CustomAvatar,
} from './components/'; ;
import {
  fetchImage,
  getContainerStyle,
  generateBackgroundStyle,
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
  } = props;

  // Validations
  if (typeof (size) === 'string') {
    console.warn('size prop should be a number');
    size = parseInt(size);
  }

  const [inner, setInner] = useState(
      <TextAvatar textColor={textColor} size={size} name={name} />,
  );

  useEffect(() => {
    if (component) setInner(<CustomAvatar size={size} component={component} />);
    if (src) {
      fetchImage(src).then((isImage) => {
        if (isImage) {
          setInner(
              <ImageAvatar src={src} size={size} imageStyle={imageStyle} />,
          );
        }
      });
    }
  }, []);

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
  borderRadius: PropTypes.number,
  component: PropTypes.any,
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
};

export default UserAvatar;
