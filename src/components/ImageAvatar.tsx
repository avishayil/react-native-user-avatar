import React from 'react';
import { Image } from 'react-native';
import type { ImageStyle, StyleProp } from 'react-native';

export interface ImageAvatarProps {
  src: string;
  size: number;
  imageStyle?: StyleProp<ImageStyle>;
  borderRadius?: number;
}

const ImageAvatar = ({ src, size, imageStyle, borderRadius }: ImageAvatarProps) => {
  const defaultStyle: ImageStyle = {
    borderRadius: borderRadius ? borderRadius : size * 0.5,
    width: size,
    height: size,
  };

  return <Image style={[defaultStyle, imageStyle]} source={{ uri: src }} />;
};

export default ImageAvatar;
