import { ImageStyle, StyleProp, ViewStyle } from 'react-native'

export type UserAvatarPropsType = {
  name: string
  src: string
  bgColor: string
  bgColors: string[]
  textColor: string
  size: number
  imageStyle: ImageStyle
  style?: StyleProp<ViewStyle>
  borderRadius: number
  component: Object
}