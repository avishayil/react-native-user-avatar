import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import UserAvatar from 'react-native-user-avatar';

export default function App() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <StatusBar style="auto" />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>React Native User Avatar</Text>
          <Text style={styles.sectionDescription}>
            Some of the UserAvatar component variations
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Initials</Text>
          <UserAvatar name="Avishay Bar" size={100} />

          <Text style={styles.label}>Custom text style</Text>
          <UserAvatar
            name="Jane Doe"
            size={100}
            bgColor="#34495e"
            textStyle={{ fontStyle: 'italic', fontWeight: 'bold' }}
          />

          <Text style={styles.label}>Remote image</Text>
          <UserAvatar
            name="Avishay Bar"
            src="https://dummyimage.com/100x100/000/fff"
            size={100}
          />

          <Text style={styles.label}>Custom component</Text>
          <UserAvatar
            name="Avishay Bar"
            size={100}
            component={
              <Image
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                style={styles.customComponent}
              />
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  body: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 40,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  label: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
  },
  customComponent: {
    width: 50,
    height: 50,
  },
});
