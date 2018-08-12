/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
  Image
} from 'react-native';

export default class Main extends React.Component {
  render() {
    const { navigation } = this.props; 
    return (
      <View style={styles.container}>
        <Text style={styles.mainMenu}>
          EZRoutine: Think less, do more!
        </Text>
        <TouchableHighlight onPress = { () => {
          navigation.navigate('Workout');
        }}>
          <Image style = {{ height: 150, width: 200 }} source = {require('./../assets/images/start.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress = { () => {
          navigation.navigate('NewRoutine') }}>
          <Image style = {{ height: 150, width: 200 }} source = {require('./../assets/images/add.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress = { () => {
          AsyncStorage.clear();
          alert("all memory has been wiped!");
        }}>
          <Image style = {{ height: 80, width: 80 }} source = {require('./../assets/images/trash.png')} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainMenu: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    fontFamily: 'Roboto',
  }
});
