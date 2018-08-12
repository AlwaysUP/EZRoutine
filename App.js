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
  Text,
  View,
  Image
} from 'react-native';
import NewWorkout from './components/NewWorkout';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

// export default class App extends React.Component {
//   onPressStart = () => {
//     alert("We can Start!");
//   }
//   onPressAdd = () => {
//     alert("We can Add!");
//   }
//   onPressEdit = () => {
//     alert("We can Edit!");
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.mainMenu}>
//           EZRoutine: Think less, do more!
//         </Text>
//         <TouchableHighlight onPress = {this.onPressStart}>
//           <Image style = {{ height: 150, width: 200 }} source = {require('./assets/images/start.png')} />
//         </TouchableHighlight>
//         <TouchableHighlight onPress = { () => {
//           this.props.navigate('NewWorkout')
//         }}>
//           <Image style = {{ height: 150, width: 200 }} source = {require('./assets/images/add.png')} />
//         </TouchableHighlight>
//         <TouchableHighlight onPress = {this.onPressEdit}>
//           <Image style = {{ height: 150, width: 200 }} source = {require('./assets/images/edit.png')} />
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

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
