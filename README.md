# React Native User Avatar

[![npm version](https://img.shields.io/npm/v/react-native-user-avatar.svg?style=flat-square)](https://www.npmjs.com/package/react-native-user-avatar)
[![npm downloads](https://img.shields.io/npm/dm/react-native-user-avatar.svg?style=flat-square)](https://www.npmjs.com/package/react-native-user-avatar)
[![Build Status](https://travis-ci.org/avishayil/react-native-user-avatar.svg?branch=master)](https://travis-ci.org/avishayil/react-native-user-avatar)

A bare-bones user avatar display with support for falling back to using the user's initials on a colored background as the avatar.
Based on the great library for React: https://github.com/wbinnssmith/react-user-avatar, and ported to React Native.

![](http://i.imgur.com/LJjK9cl.png)

## Installation

`npm install --save @sigmayun/react-native-user-avatar` or `yarn add @sigmayun/react-native-user-avatar`

## Usage

```jsx
import UserAvatar from '@sigmayun/react-native-user-avatar';


<UserAvatar size="100" name="Avishay Bar" />
<UserAvatar size="100" name="Avishay Bar" src="https://dummyimage.com/100x100/000/fff" />
<UserAvatar size="50" name="John Doe" colors={['#ccc', '#fafafa', '#ccaabb']}/>
<UserAvatar size="50" name="John Doe" />
<UserAvatar size="50" name="Jane Doe" color="#000" />
<AvatarView uri={require('./avatar.png')} name="Aaron" size={50} />
```

## User-defined Image-Component

It is also possible to use another Image-Component than the built-in `<Image>`.

```jsx
<UserAvatar size="50" name="John Doe" component={CachedImage} />
```

The fallback avatar's color may be set by passing in the `color` prop, or you can customize the range of colors
used by passing in an array of `colors`. The component uses a simple calculation to consistently use the same
color for the same user's name every time.

## Credits

[@wbinnssmith](https://github.com/wbinnssmith/) for creating [https://github.com/wbinnssmith/react-user-avatar](react-user-avatar)

## License

MIT
