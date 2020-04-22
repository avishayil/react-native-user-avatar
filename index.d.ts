import React from 'react'
import { ViewStyle, ImageStyle, StyleProp } from 'react-native'
type UserAvatarPropsType = {
  src?: string
  name: string
  color?: string
  textColor?: string
  colors?: string[]
  size?: number
  containerStyle?: ViewStyle
  imageStyle?: ImageStyle
  defaultName?: string
  borderRadius?: number
  style?: StyleProp
}

export default class UserAvatar extends React.PureComponent<UserAvatarPropsType, any> {
  static defaultProps: {}
  constructor()
  componentDidMount(): void
  componentWillMount(): void
  render(): JSX.Element
}
