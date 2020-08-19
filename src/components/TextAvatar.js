import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {abbr} from '../helpers';

const TextAvatar = (props) => {
  const {
    name,
    size,
    textColor,
    noUpperCase,
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
      <Text
        style={{
          color: textColor,
          fontSize: size / 2.5,
        }}
        adjustsFontSizeToFit={true}
      >
        {abbr(name, noUpperCase)}
      </Text>
    </View>
  );
};

TextAvatar.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  textColor: PropTypes.string,
  noUpperCase: PropTypes.bool,
};

export default TextAvatar;
