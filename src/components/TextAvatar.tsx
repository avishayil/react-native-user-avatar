import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { abbr } from '../helpers';

export interface TextAvatarProps {
  name: string;
  size: number;
  textColor?: string;
  noUpperCase?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const TextAvatar = ({
  name,
  size,
  textColor = '#fff',
  noUpperCase,
  textStyle,
}: TextAvatarProps) => {
  const containerStyle: ViewStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -(size / 20),
    height: size,
    width: size,
  };

  return (
    <View style={containerStyle}>
      {!!name && (
        <Text
          style={[{ color: textColor, fontSize: size / 2.5 }, textStyle]}
          adjustsFontSizeToFit
        >
          {abbr(name, noUpperCase)}
        </Text>
      )}
    </View>
  );
};

export default TextAvatar;
