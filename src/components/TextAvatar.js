import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {abbr} from '../helpers';

const TextAvatar = (props) => {
  const {
    name,
    size,
    textColor,
    style = {},
  } = props;

  const textContainerStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -(size / 20),
    height: size,
    width: size,
  };

  return (
    <View style={textContainerStyle}>
      {!!name && <Text
        style={{
          color: textColor,
          fontSize: size / 2.5,
          ...style,
        }}
        adjustsFontSizeToFit={true}
      >
        {abbr(name)}
      </Text>}
    </View>
  );
};

TextAvatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  textColor: PropTypes.string,
  style: PropTypes.object,
};

export default TextAvatar;
