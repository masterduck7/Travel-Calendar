import React, { Component } from 'react';
import { AsyncStorage, Image, Modal, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { Button, Card } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons'; 
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
            <Card containerStyle={{width: wp("90%"), borderRadius: wp("5%"), borderWidth: 1 }}
              title={<Text style={{textAlign:'center', paddingBottom: hp("1%"), fontSize: wp("5%")}}>¿Desea borrar todos los viajes ingresados?</Text>}>
                <Image source={CancelledFlight} resizeMethod="resize" resizeMode="contain" alignSelf="center" style={{width: wp("30%"), height: hp("15%")}} /> 
                <Text></Text>
              <ScrollView horizontal={false}>
                <View style={styles.buttonContainer}>
                <Button title="SI" buttonStyle={{ backgroundColor:'#ED8C72', borderColor: '#ED8C72', borderRadius: wp("5%"), borderWidth: 1, width: wp("30%"), height: '75%', alignSelf: 'center' }} 
                onPress = {() => {
                  this._clearData()
                  ToastAndroid.show("Viajes eliminados", ToastAndroid.SHORT);
                  this.setState({modalRemove:false})
                }}/>
                <Button title="NO" buttonStyle={{ backgroundColor:'#2F496E', borderColor: '#2F496E', borderRadius: wp("5%"), borderWidth: 1, width: wp("30%"), left: wp("1%") , height: '75%', alignSelf: 'center' }} onPress = {() => {  
                  this.setState({ modalRemove: false })}}/>
                </View>
              </ScrollView>
            </Card>
        </View>
        </Modal>

        <Text style={{color: '#888', fontSize: wp("10%"), top: hp("10%") }}>Travel Calendar</Text>
        <Image source={Travel} resizeMethod="resize" resizeMode="stretch" style={{top: hp("15%")}} /> 
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Calendar')}
          style={styles.button}>
          <Text style={styles.text}>Calendario</Text>
        </TouchableOpacity>
        <View style={styles.textButtonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddTrip')}
            style={{...styles.button, height: 50, top: hp("3%"), backgroundColor: '#2988BC' }}>
            <View style={{flex: 1, flexDirection: 'row', marginRight: wp("2%")}}>
              <FontAwesome name="calendar-plus-o" size={wp("7%")} color="black" />
              <Text style={{...styles.text, left: wp("1%"), color: 'black'}}>Viaje</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddNoWorkDay')}
            style={{...styles.button, left: wp("2%"), height: 50, top: hp("3%"), backgroundColor: '#2988BC' }}>
            <View style={{flex: 1, flexDirection: 'row', marginRight: wp("2%")}}>
              <FontAwesome name="calendar-plus-o" size={wp("7%")} color="black" />
              <Text style={{...styles.text, left: wp("1%"), color: 'black'}}>Festivo</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.setState({modalRemove:true})}
          style={{...styles.button, top: hp("-19%"), backgroundColor: '#2F496E' }}>
          <Text style={styles.text}>Borrar datos</Text>
        </TouchableOpacity>
        <Text style={{ top: hp("-5%"), color: '#888'}}>BY LPSoftware</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EADE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    backgroundColor: '#006C84',
    padding: hp("1%"),
    alignContent: "center",
    top: hp("20%"),
    borderRadius: hp("1%")
  },
  text: {
    fontSize: wp("5%"),
    color: '#fff'
  },
  modal: {  
    justifyContent: 'center',
    alignItems: 'center', 
    borderColor: '#fff',    
    marginTop: hp("55%"),
    width: wp('95%'),
    margin: wp("2%")
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textButtonContainer:{
    flex: 1,
    flexDirection: 'row',
    marginTop: hp("23%")
  }
});
