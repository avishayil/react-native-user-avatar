import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text} from 'react-native';
import initials from 'initials';

// from https://flatuicolors.com/
const defaultColors = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];

/**
 * Helper function to calculate the number of characters
 * @constructor
 * @param {string} str - The string we want to ab.
 */
function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

/**
 * Main Class
 * @constructor
 */
class UserAvatar extends React.PureComponent {
  /**
   * Render function
   * @constructor
   */
  render() {
    let {
      src,
      name,
      color,
      textColor = '#fff',
      colors = defaultColors,
      size = 32,
      imageStyle,
      defaultName,
      borderRadius,
      style,
    } = this.props;
    if (!name) throw new Error('Avatar requires a name');
    if (typeof size !== 'number') size = parseInt(size);
    let abbr = initials(name);
    if (name.startsWith('+')) {
      abbr = `+${abbr}`;
    }
    if (!abbr) abbr = defaultName;
    if (isNaN(borderRadius)) {
      borderRadius = size * 0.5;
    }
    const imageLocalStyle = {
      borderRadius,
    };
    const localStyle = {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    };
    const containerStyle = {
      height: size,
      width: size,
    };
    let colorStyle = {};
    let inner;
    if (src) {
      const sizeStyle = {
        width: size,
        height: size,
      };
      const props = {
        style: [imageLocalStyle, sizeStyle, imageStyle],
        source: {uri: src},
      };
      inner = React.createElement(this.props.component || Image, props);
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // Pick a deterministic color from the list
        const i = sumChars(name) % colors.length;
        background = colors[i];
      }
      colorStyle = {backgroundColor: background};
      const textContainerStyle = {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -(size / 20),
      };
      const sizeStyle = {
        height: size,
        width: size,
      };
      inner = (
        <View style={[textContainerStyle, sizeStyle]}>
          <Text
            style={{
              color: textColor,
              fontSize: size / 2.5,
            }}
            adjustsFontSizeToFit={true}
          >
            {abbr}
          </Text>
        </View>
      );
    }
    return (
      <View style={[localStyle, colorStyle, containerStyle, style]}>
        {inner}
      </View>
    );
  }
}

UserAvatar.propTypes = {
  src: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  colors: PropTypes.array,
  textColor: PropTypes.string,
  size: PropTypes.number,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  style: PropTypes.object,
  defaultName: PropTypes.string,
  borderRadius: PropTypes.number,
  component: PropTypes.any,
};

module.exports = UserAvatar;
