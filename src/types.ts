import type { ReactNode } from 'react';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface UserAvatarProps {
  /** Name used to generate the fallback initials and the deterministic background color. */
  name?: string;
  /** Remote image URL. When it resolves to a valid image the avatar shows the image. */
  src?: string;
  /** Force a specific background color (overrides the deterministic pick from `bgColors`). */
  bgColor?: string;
  /** Palette the deterministic background color is picked from. */
  bgColors?: string[];
  /** Color of the initials text. */
  textColor?: string;
  /** Extra style applied to the initials text. */
  textStyle?: StyleProp<TextStyle>;
  /** Avatar width/height in points. */
  size?: number;
  /** Extra style applied to the image. */
  imageStyle?: StyleProp<ImageStyle>;
  /** Extra style applied to the outer container. */
  style?: StyleProp<ViewStyle>;
  /** Border radius of the avatar. Defaults to a circle (`size / 2`). */
  borderRadius?: number;
  /** Render a custom element instead of initials/image. */
  component?: ReactNode;
  /** Keep the initials in their original case instead of upper-casing them. */
  noUpperCase?: boolean;
  /**
   * Skip the `image/*` content-type check on the fetched `src`. Useful for hosts
   * (e.g. S3 URLs without a file extension) that omit the `content-type` header.
   */
  ignoreContentType?: boolean;
}

/** Default background palette (from https://flatuicolors.com/). */
export const DEFAULT_BG_COLORS: string[] = [
  '#2ecc71', // emerald
  '#3498db', // peter river
  '#8e44ad', // wisteria
  '#e67e22', // carrot
  '#e74c3c', // alizarin
  '#1abc9c', // turquoise
  '#2c3e50', // midnight blue
];
