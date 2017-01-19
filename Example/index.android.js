/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image,
  Text
} from 'react-native';

import UserAvatar from 'react-native-user-avatar';

export default class Example extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30}}>Avatar Initials</Text>
        <UserAvatar name="Avishay Bar" size={100} />
        <Text style={{fontSize: 30}}>Avatar Image</Text>
        <UserAvatar name="Avishay Bar" src={"https://dummyimage.com/100x100/000/fff"} size={100} />
      </View>
    );
  }
}

AppRegistry.registerComponent('Example', () => Example);
