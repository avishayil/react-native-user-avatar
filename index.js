import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import initials from 'initials';

 function abbr(name) {
  let abbr = initials(name);
  if (name.startsWith('+')) {
    abbr = `+${abbr}`;
  }
  if (!abbr) abbr = name;
  return abbr;
}

function sumChars(str) {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

export default class UserAvatar extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string,
    src: PropTypes.string,
    color: PropTypes.string,
    colors: PropTypes.array,
    textColor: PropTypes.string,
    size: PropTypes.number,
    imageStyle: PropTypes.object,
    style: PropTypes.object,
    borderRadius: PropTypes.number,
    component: PropTypes.any,
  };

  static defaultProps = {
    size: 32,
    textColor: '#fff',
    name: 'John Doe',
    colors: [ // from https://flatuicolors.com/
      '#2ecc71', // emerald
      '#3498db', // peter river
      '#8e44ad', // wisteria
      '#e67e22', // carrot
      '#e74c3c', // alizarin
      '#1abc9c', // turquoise
      '#2c3e50', // midnight blue
    ],
  }

  state = {
    inner: this.renderTextElement(),
  };

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    const {
      src,
      component,
    } = this.props;
    if (component) {
      this.setState({
        inner: component,
      });
    }
    if (src) {
      this.isSrcAvailable().then((isImage) => {
        if (isImage) {
          this.setState({
            inner: this.renderImageSrcElement(),
          });
        } else {
          this.setState({
            inner: this.renderTextElement(),
          });
        }
      }).catch(() => {
        this.setState({
          inner: this.renderTextElement(),
        });
      });
    }
  }

  async isSrcAvailable() {
    const {
      src,
    } = this.props;

    try {
      const fetchCall = await fetch(src);
      if (fetchCall._bodyBlob._data.type.startsWith('image/')) {
        return true;
      }
    } catch (err) {
      console.warn('Error fetching the online image source, falling back to initials');
      return false;
    }
  }

  renderTextElement() {
    const {
      textColor,
      size,
      name
    } = this.props;

    return (
      <View style={[this.getTextContainerStyle()]}>
        <Text
          style={{
            color: textColor,
            fontSize: size / 2.5,
          }}
          adjustsFontSizeToFit={true}
        >
          {abbr(name)}
        </Text>
      </View>
    );
  }

  renderImageSrcElement() {
    const {
      src,
      size,
      imageStyle,
      borderRadius = size * 0.5,
    } = this.props;

    const imageDefaultStyle = {
      borderRadius,
      width: size,
      height: size,
    };

    const props = {
      style: [imageDefaultStyle, imageStyle],
      source: { uri: src },
    };

    return React.createElement(Image, props);
  }

  getBackgrond() {
    const {
      name,
      color,
      colors,
    } = this.props;

    let background;
    if (color) {
      background = color;
    } else {
      // Pick a deterministic color from the list
      const i = sumChars(name) % colors.length;
      background = colors[i];
    }
    return { backgroundColor: background };
  }

  getContainerStyle() {
    const {
      size,
      borderRadius = size * 0.5,
    } = this.props;

    return {
      borderRadius,
      borderWidth: 1,
      borderColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  getTextContainerStyle() {
    const {
      size,
    } = this.props;

    return {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -(size / 20),
      height: size,
      width: size,
    };
  };

  render() {
    const {
      size,
      style,
    } = this.props;

    // Validations
    if (typeof (size) !== 'number') throw new Error('size prop should be a number');

    return (
      <View style={[this.getContainerStyle(), this.getBackgrond(), style]}>
        {this.state.inner}
      </View>
    );
  }
}
