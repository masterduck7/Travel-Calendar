import React, { Component } from 'react';
import { Image, AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Travel from '../../assets/Travel.png';

export default class Home extends Component {
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
        <Image source={Travel} resizeMethod="resize" resizeMode="stretch" style={{top: -80}} /> 
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Calendar')}
          style={styles.button}>
          <Text style={styles.text}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AddTrip')}
          style={{...styles.button, top: 0, backgroundColor: '#2988BC' }}>
          <Text style={styles.text}>Añadir Viaje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this._clearData()}
          style={{...styles.button, top: 30, backgroundColor: '#2F496E' }}>
          <Text style={styles.text}>Borrar datos</Text>
        </TouchableOpacity>
        <Text style={{ bottom:-100, color: '#888'}}>BY LPSoftware</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EADE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor: '#ED8C72',
    padding: 10,
    top:-30,
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    color: '#fff'
  }
});