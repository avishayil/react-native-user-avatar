import { ImageStyle, StyleProp, ViewStyle, TextStyle } from 'react-native'

export type UserAvatarPropsType = {
  name: string
  src: string
  bgColor: string
  bgColors: string[]
  textColor: string
  size: number
  imageStyle: ImageStyle
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  borderRadius: number
  component: Object
}