import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CustomAvatar, ImageAvatar, TextAvatar } from './components';
import {
  fetchImage,
  generateBackgroundColor,
  generateBackgroundStyle,
  getContainerStyle,
} from './helpers';
import { DEFAULT_BG_COLORS } from './types';
import type { UserAvatarProps } from './types';

const UserAvatar = ({
  name = 'John Doe',
  src,
  bgColor,
  bgColors = DEFAULT_BG_COLORS,
  textColor = '#fff',
  textStyle,
  size = 32,
  imageStyle,
  style,
  borderRadius,
  component,
  noUpperCase = false,
  ignoreContentType = false,
}: UserAvatarProps) => {
  let avatarSize = size;
  if (typeof avatarSize === 'string') {
    console.warn('react-native-user-avatar: size prop should be a number');
    avatarSize = parseInt(avatarSize, 10);
  }

  // Whether the remote `src` has resolved to a usable image. Reset whenever the
  // inputs that affect resolution change, so a new `src` never shows a stale image.
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (!src || component) {
      setIsImage(false);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    fetchImage(src, { signal: controller.signal }, ignoreContentType).then(
      (resolved) => {
        if (isMounted) {
          setIsImage(resolved);
        }
      }
    );

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [src, component, ignoreContentType]);

  let inner: React.ReactNode;
  if (component) {
    inner = <CustomAvatar size={avatarSize} component={component} />;
  } else if (src && isImage) {
    inner = (
      <ImageAvatar
        src={src}
        size={avatarSize}
        imageStyle={imageStyle}
        borderRadius={borderRadius}
      />
    );
  } else {
    // Initials fallback — always receives every text-related prop. (#117)
    inner = (
      <TextAvatar
        name={name}
        size={avatarSize}
        textColor={textColor}
        noUpperCase={noUpperCase}
        textStyle={textStyle}
      />
    );
  }

  return (
    <View
      style={[
        generateBackgroundStyle(name, bgColor, bgColors),
        getContainerStyle(avatarSize, src, borderRadius),
        style,
      ]}
    >
      {inner}
    </View>
  );
};

export { generateBackgroundColor };
export type { UserAvatarProps };
export { DEFAULT_BG_COLORS };

export default UserAvatar;
