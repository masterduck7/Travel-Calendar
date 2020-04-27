import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends Component {
  render(){
    return(
      <View style={styles.container}>
        <Text style={{color: '#888', fontSize: 50}}>Travel Calendar</Text>
        <Text style={{ bottom:-50, color: '#888'}}>By LPSoftware</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
