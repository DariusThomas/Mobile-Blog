import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

import AppContainer from "./src/AppContainer"

interface props{}
interface state{}

export default class App extends React.Component<props,state> {
  render() {
    return (
      <AppContainer />
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      // </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
