import React from 'react';
import { View, Image, Text } from 'react-native';
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

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

class UserAvatar extends React.PureComponent {
  render() {
    let {
      src,
      name,
      color,
      textColor = '#fff',
      colors = defaultColors,
      size = 32,
      containerStyle,
      imageStyle,
      defaultName,
      borderRadius
    } = this.props;
    if (!name) throw new Error('Avatar requires a name');
    if (typeof size !== 'number') size = parseInt(size);
    let abbr = initials(name);
    if (name.startsWith('+')) {
      abbr = `+${abbr}`;
    }
    if(!abbr) abbr = defaultName;
    if (isNaN(borderRadius)) {
      borderRadius = size * 0.5;
    }
    const imageLocalStyle = {
      borderRadius
    };
    const localStyle = {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
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
        source: { uri: src }
      };
      inner = React.createElement(this.props.component || Image, props);
    } else {
      let background;
      if (color) {
        background = color;
      } else {
        // pick a deterministic color from the list
        let i = sumChars(name) % colors.length;
        background = colors[i];
      }
      colorStyle = { backgroundColor: background };
      const textContainerStyle = {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };
      // TODO if i set this style to height instead of minHeight, react-native black screens, wtf
      const minSizeStyle = {
        minHeight: size,
        minWidth: size,
      };
      inner = (
        <View style={[textContainerStyle, minSizeStyle]}>
          <Text
            style={{
              color: textColor,
            }}
            adjustsFontSizeToFit={true}
            maxFontSizeMultiplier={1}
          >
            {abbr}
          </Text>
        </View>
      );
    }
    return (
      <View style={[localStyle, colorStyle, containerStyle]}>{inner}</View>
    );
  }
}

module.exports = UserAvatar;
