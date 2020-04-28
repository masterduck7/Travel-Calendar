import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Home extends Component {
  componentDidMount(){
    //this._clearData();
  }

  _clearData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {
        console.log("Error clearing data")
    }
  };

  render(){
    return(
      <View style={styles.container}>
        <Text style={{color: '#888', fontSize: 50, top: -100 }}>Travel Calendar</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Calendar')}
          style={styles.button}>
          <Text style={styles.text}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddTrip')}
          style={{...styles.button, top: 90 }}>
          <Text style={styles.text}>Añadir Viaje</Text>
        </TouchableOpacity>
        <Text style={{ bottom:-200, color: '#888'}}>By LPSoftware</Text>
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
  button:{
    backgroundColor: '#d1625a',
    padding: 10,
    top:40,
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    color: '#fff'
  }
});
