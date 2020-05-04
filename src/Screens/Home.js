import React, { Component } from 'react';
import { AsyncStorage, Image, Modal, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Button, Card } from 'react-native-elements'
import Travel from '../../assets/Travel.png';
import CancelledFlight from '../../assets/CancelledFlight.png';

export default class Home extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      modalRemove: false
    }
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

        <Modal
        visible={this.state.modalRemove}
        transparent={true}
        animationType = {"slide"}
        onRequestClose={() => this.setState({ modalRemove: false })}>
        <View style = {styles.modal}>  
            <Card containerStyle={{width: '93%', borderRadius:20, borderWidth: 1 }}
              title={<Text style={{textAlign:'center', paddingBottom: 15, fontSize: 20}}>¿Desea borrar todos los viajes ingresados?</Text>}>
                <Image source={CancelledFlight} resizeMethod="resize" resizeMode="contain" alignSelf="center" style={{width:140, height:140}} /> 
                <Text></Text>
              <ScrollView horizontal={false}>
                <View style={styles.buttonContainer}>
                <Button title="SI" buttonStyle={{ backgroundColor:'#ED8C72', borderColor: '#ED8C72', borderRadius:15, borderWidth: 1, width: '80%', height: '75%', alignSelf: 'center' }} 
                onPress = {() => {
                  this._clearData()
                  ToastAndroid.show("Viajes eliminados", ToastAndroid.SHORT);
                  this.setState({modalRemove:false})
                }}/>
                <Button title="NO" buttonStyle={{ backgroundColor:'#2F496E', borderColor: '#2F496E', borderRadius:15, borderWidth: 1, width: '80%', height: '75%', alignSelf: 'center' }} onPress = {() => {  
                  this.setState({ modalRemove: false })}}/>
                </View>
              </ScrollView>
            </Card>
        </View>
        </Modal>

        <Text style={{color: '#888', fontSize: 50, top: 20 }}>Travel Calendar</Text>
        <Image source={Travel} resizeMethod="resize" resizeMode="stretch" style={{top: 20}} /> 
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Calendar')}
          style={styles.button}>
          <Text style={styles.text}>Calendario</Text>
        </TouchableOpacity>
        <View style={styles.textButtonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddTrip')}
            style={{...styles.button, left: -2, height: 50, top: -50, backgroundColor: '#2988BC' }}>
            <Text style={styles.text}>Añadir Viaje</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNoWorkDay')}
            style={{...styles.button, left: 5, height: 50, top: -50, backgroundColor: '#2988BC' }}>
            <Text style={styles.text}>Añadir Día no laboral</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.setState({modalRemove:true})}
          style={{...styles.button, top: -120, backgroundColor: '#2F496E' }}>
          <Text style={styles.text}>Borrar datos</Text>
        </TouchableOpacity>
        <Text style={{ top: -50, color: '#888'}}>BY LPSoftware</Text>
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
    backgroundColor: '#006C84',
    padding: 10,
    top: 80,
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    color: '#fff'
  },
  modal: {  
    justifyContent: 'center',
    alignItems: 'center', 
    borderColor: '#fff',    
    marginTop: 450,
    marginBottom: 200,
    width: '95%',
    paddingBottom: 15,
    marginLeft: 10
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    top: 10
  },
  textButtonContainer:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 180
  }
});
