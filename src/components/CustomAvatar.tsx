import React from 'react';
import { View } from 'react-native';
import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

export interface CustomAvatarProps {
  size: number;
  component?: ReactNode;
}

const CustomAvatar = ({ size, component }: CustomAvatarProps) => {
  const containerStyle: ViewStyle = {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -(size / 20),
    height: size,
    width: size,
  };

  return <View style={containerStyle}>{component}</View>;
};

export default CustomAvatar;
