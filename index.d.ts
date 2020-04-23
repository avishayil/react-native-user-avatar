import React from 'react'
import { ImageStyle, StyleProp } from 'react-native'
type UserAvatarPropsType = {
  name: string
  src: string
  bgColor: string
  bgColors: string[]
  textColor: string
  size: number
  imageStyle: ImageStyle
  style: StyleProp
  borderRadius: number
  component: Object
}

export default class UserAvatar extends React.PureComponent<UserAvatarPropsType, any> {
  static defaultProps: {}
  constructor()
  componentDidMount(): void
  componentWillMount(): void
  render(): JSX.Element
}
