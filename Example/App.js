import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import UserAvatar from 'react-native-user-avatar';

export default function App() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>User Avatar</Text>
          <Text style={styles.sectionDescription}>These are some of the UserAvatar component implementations</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{fontSize: 30}}>Avatar Initials</Text>
          <UserAvatar name="Avishay Bar" size={100} />
          <Text style={{fontSize: 30}}>Avatar Image</Text>
          <UserAvatar name="Avishay Bar" src={"https://dummyimage.com/100x100/000/fff"} size={100} />
          <Text style={{fontSize: 30}}>Avatar Custom Component</Text>
          <UserAvatar name="Avishay Bar" component={<Image source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} style={{ width: 50, height: 50}} />}  size={100} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  body: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 40
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: "center"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: "#000000",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: "#000000",
    textAlign: "center"
  },
});