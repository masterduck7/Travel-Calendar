import {CalendarList} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import React, { Component } from 'react';
import { AsyncStorage, Clipboard, Linking, Modal, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Button, Card } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AdMobBanner } from 'expo-ads-admob';

const testAD = "ca-app-pub-3940256099942544/2934735716"
const officialAD = "ca-app-pub-1681130123322106/7747749733"

LocaleConfig.locales['es'] = {
  monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Juilio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],
  dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
  dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
  today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';

export default class CalendarTravel extends Component {

    constructor(props){
      super(props);
      this.state = {
        tripsData : [],
        formatedTrips: {},
        // Actual Trip to show details
        // Destination, Start date, End date, Airline, Reservation code
        actualTrip: {
          destination: 'DESTINO',
          start_date: '',
          end_date: '',
          startTime: '',
          endTime: '',
          airline: '',
          reservationCode: ''
        },
        actualAirline: '',
        modalDetail: false,
        modalRemove: false,
        modalNonWorkingDay: false
      }
    }

    _retrieveData = async () => {
      try {
        const data = await AsyncStorage.getItem('@Trips');
        if (data) {
          await this.formatData(JSON.parse(data))
        }
      } catch (error) {
        console.log("Error retrieving data")
      }
    };

    _storeData = async (values) => {
      try {
          await AsyncStorage.setItem('@Trips', JSON.stringify(values));
      } catch (error) {
          console.log("Error saving data")
      }
    };

    componentDidMount = async () => {
      this._retrieveData()
    }

    findDate(day, data){
      let selectedTrip = []
      Array.from(data, child => {
        const compare = (child.start_date === day || child.end_date === day )
        if (compare) {
          selectedTrip = {
            destination: child.destination,
            start_date: child.start_date,
            end_date: child.end_date,
            startTime: child.startTime,
            endTime: child.endTime,
            airline: child.airline,
            reservationCode: child.reservationCode
          }
        }
      });
      return selectedTrip
    }

    showData(day){
      const formated = this.state.formatedTrips
      // Check if trip is on data and is valid trip
      // Example: 2 trips on same date is wrong and that is no formated
      if (this.state.tripsData !== [] && formated[day.dateString] !== undefined ) {
        let sTrip = this.findDate(day.dateString, this.state.tripsData)
        if (sTrip.length !== 0) {
          if ('' === sTrip.destination && '' === sTrip.reservationCode && '' === sTrip.end_date && 
          '' === sTrip.airline && '' === sTrip.startTime && '' === sTrip.endTime ) {
            this.setState({
              actualTrip: {
                destination: '',
                start_date: sTrip.start_date,
                end_date: '',
                startTime: '',
                endTime: '',
                airline: '',
                reservationCode: '',
              },
              modalNonWorkingDay: true
            })
          } else {
            let airline = ''
            if (sTrip.airline === "Jetsmart") {
              airline = 'https://www.jetsmart.cl'
            }
            else if (sTrip.airline === "Latam"){
              airline = "https://www.latam.cl"
            }
            else if (sTrip.airline === "Sky Airlines"){
              airline = "https://www.latam.cl"
            }
            else{
              airline = "https://www.google.com/search?q=" + sTrip.airline
            }
            this.setState({
              actualTrip: {
                destination: sTrip.destination,
                start_date: sTrip.start_date,
                end_date: sTrip.end_date,
                startTime: sTrip.startTime,
                endTime: sTrip.endTime,
                airline: sTrip.airline,
                reservationCode: sTrip.reservationCode
              },
              actualAirline: airline,
              modalDetail: !this.state.modalDetail
            })
          }
        }
      }else{
        console.log("NO DATA")
      }
    }

    getAllDaysBetween(startd, endt){
      let dateArray = [];
      let start = moment(startd).add(1, 'days');
      let stop = moment(endt);
      while (start < stop) {
          dateArray.push( moment(start).format('YYYY-MM-DD') )
          start = moment(start).add(1, 'days');
      }
      return dateArray;
    }

    formatData = async (data) => {
      let newData = {}
      let nonWorkingDays = []
      const vacation_start = {startingDay: true, color: '#ED8C72', textColor: 'white'};
      const vacation_end = {endingDay: true, color: '#ED8C72', textColor: 'white'};
      const vacation_between = {color:'#F4EADE', textColor: 'gray'};
      const vacation_one = {startingDay: true, color: '#ED8C72', endingDay: true, textColor: 'white'};
      const non_working_day = {color:'#D0312E', textColor: 'white'};
      const non_working_day_one = {startingDay: true, color: '#D0312E', endingDay: true, textColor: 'white'};
      const non_working_day_between = {color:'#D0312E', textColor: 'white'};
      const non_working_day_start = {startingDay: true, color: '#D0312E', textColor: 'white'};
      const non_working_day_end = {endingDay: true, color: '#D0312E', textColor: 'white'};
      Array.from(data, child => {
        let sd = child.start_date
        let ed = child.end_date
        // Check if one trip on the same day
        if(newData[sd] !== undefined && !nonWorkingDays.includes(sd) ){
          console.log("2 trips on same day. Check trips start date: ", sd , " - End date: " , ed)
        }
        else if(newData[ed] !== undefined && !nonWorkingDays.includes(ed) ){
          console.log("2 trips on same day. Check trips start date: ", sd , " - End date: " , ed)
        }
        // Add non working days
        else if('' === child.destination && '' === child.reservationCode && '' === ed && 
          '' === child.airline && '' === child.startTime && '' === child.endTime ){
            newData[sd] = non_working_day;
            nonWorkingDays.push(sd)
        }
        // Check one day vacation
        else if (sd === ed) {
          // Check non working days
          if (!nonWorkingDays.includes(sd) && !nonWorkingDays.includes(ed)) {
            newData[sd] = vacation_one;
          }else{
            delete newData[sd]
            newData[sd] = non_working_day_one
          }
        // Check longer vacation
        }else{
          // Check non working days
          // Check start date
          if (!nonWorkingDays.includes(sd)) {
            newData[sd] = vacation_start;
          }else{
            delete newData[sd]
            newData[sd] = non_working_day_start
          }
          // Check days between
          let daysBetween = this.getAllDaysBetween(sd,ed)
          for (let i = 0; i < daysBetween.length; i++) {
            if (!nonWorkingDays.includes(daysBetween[i])) {
              newData[daysBetween[i]] = vacation_between;  
            }else{
              delete newData[daysBetween[i]]
              newData[daysBetween[i]] = non_working_day_between
            }
          }
          // Check end date
          if (!nonWorkingDays.includes(ed)) {
            newData[ed] = vacation_end;
          }else{
            delete newData[ed]
            newData[ed] = non_working_day_end
          }
        }
      })
      this.setState({
        formatedTrips: newData,
        tripsData: data
      })
    }

    removeActualTrip(){
      const data = this.state.tripsData
      const actual = this.state.actualTrip
      let newData = []
      Array.from(data, child => {
        if (actual.destination === child.destination && actual.reservationCode === child.reservationCode && 
          actual.start_date === child.start_date && actual.end_date === child.end_date && 
          actual.airline === child.airline && actual.startTime === child.startTime && actual.endTime === child.endTime ) {
          console.log("Viaje encontrado y a eliminar. " , child.start_date , " - " , child.destination)
        }else{
          newData.push(child)
        }
      })
      this.formatData(newData)
      this._storeData(newData)
      ToastAndroid.show("Viaje eliminado", ToastAndroid.SHORT);
      this.setState({ modalDetail: false, modalRemove: false })
    }

    removeNonWorkingDay(){
      const data = this.state.tripsData
      const actual = this.state.actualTrip
      let newData = []
      Array.from(data, child => {
        if (actual.destination === child.destination && actual.reservationCode === child.reservationCode && 
          actual.start_date === child.start_date && actual.end_date === child.end_date && 
          actual.airline === child.airline && actual.startTime === child.startTime && actual.endTime === child.endTime ) {
          console.log("Día no laboral encontrado y a eliminar. " , child.start_date)
        }else{
          newData.push(child)
        }
      })
      this.formatData(newData)
      this._storeData(newData)
      ToastAndroid.show("Día no laboral eliminado", ToastAndroid.SHORT);
      this.setState({ modalNonWorkingDay: false })
    }

    bannerError = () => {
      console.log('Banner ad not loading')
    }
    bannerAdReceived = () => {
      console.log('Banner ad received')
    }

    render(){
      return(
        <View style={{flex: 1}}>
          <View style={{flex: 1}} >
          {/* Modal Remove Trip */}
          <Modal
          visible={this.state.modalRemove}
          transparent={true}
          animationType = {"slide"}
          onRequestClose={() => this.setState({ modalRemove: false })}>
          <View style = {styles.modal}>  
            <Card containerStyle={{width: wp("90%"), borderRadius: wp("7%"), borderWidth: 1 }}
                title={<Text style={{textAlign:'center', paddingBottom: hp("2%"), fontSize: wp("5%")}}>¿Desea eliminar el viaje seleccionado?</Text>}>
                <Text style={{marginBottom: hp("1%")}}>DESTINO: {this.state.actualTrip.destination}</Text>
                <Text style={{marginBottom: hp("1%")}}>INICIO: {moment(this.state.actualTrip.start_date).format("DD/MM/YY")} , {this.state.actualTrip.startTime}</Text>
                <Text style={{marginBottom: hp("1%")}}>TERMINO: {moment(this.state.actualTrip.end_date).format("DD/MM/YY")} , {this.state.actualTrip.endTime}</Text>
                <ScrollView horizontal={false}>
                  <View style={styles.buttonContainer}>
                  <Button title="SI" buttonStyle={{ ...styles.buttonConfirm, backgroundColor:'#ED8C72', borderColor: '#ED8C72' }} 
                  onPress = {() => {this.removeActualTrip()}}/>
                  <Button title="NO" buttonStyle={{ ...styles.buttonConfirm }} onPress = {() => {  
                    this.setState({ modalRemove: false })}}/>
                  </View>
                </ScrollView>
              </Card>
          </View>
          </Modal>
          {/* Modal Details Non Working Day */}
          <Modal
          visible={this.state.modalNonWorkingDay}
          transparent={true}
          animationType = {"slide"}
          onRequestClose={() => this.setState({ modalNonWorkingDay: false })}>
          <View style = {styles.modal}>  
              <Card containerStyle={{width: wp("90%"), borderRadius: wp("7%"), borderWidth: 1 }}
                title={<Text style={{textAlign:'center', paddingBottom: hp("2%"), fontSize: wp("5%")}}>Día no laboral !!!</Text>}>
                <Text style={{ fontSize: wp("5%"), textAlign:'center', marginBottom: hp("1%")}}>{moment(this.state.actualTrip.start_date).format("DD/MM/YY")}</Text>
                <ScrollView horizontal={false}>
                  <View style={styles.buttonContainer}>
                  <Button title="ELIMINAR" buttonStyle={{ ...styles.buttonConfirm, backgroundColor:'#ED8C72', borderColor: '#ED8C72' }} 
                  onPress = {() => {this.removeNonWorkingDay()}}/>
                  <Button title="CANCELAR" buttonStyle={styles.buttonConfirm} onPress = {() => {  
                    this.setState({ modalNonWorkingDay: false })}}/>
                  </View>
                </ScrollView>
              </Card>
          </View>
          </Modal>
          {/* Modal Details Trip */}
          <Modal            
              animationType = {"slide"}  
              transparent = {true}  
              visible = {this.state.modalDetail} 
              onRequestClose={() => this.setState({ modalDetail: false })} 
          >  
            <View style = {styles.modal}>  
              <Card containerStyle={{width: wp("90%"), borderRadius: wp("5%"), borderWidth: 1 }}
                title={<Text style={{textAlign:'center', paddingBottom: hp("2%"), fontSize: wp("5%")}}>{this.state.actualTrip.destination}</Text>}>
                <Text style={{marginBottom: hp("1%")}}>INICIO: {moment(this.state.actualTrip.start_date).format("DD/MM/YY")} , {this.state.actualTrip.startTime}</Text>
                <Text style={{marginBottom: hp("1%")}}>TERMINO: {moment(this.state.actualTrip.end_date).format("DD/MM/YY")} , {this.state.actualTrip.endTime}</Text>
                <Text style={{marginBottom: hp("1%")}}>AEROLÍNEA: {this.state.actualTrip.airline}</Text>
                <ScrollView horizontal={false}>
                <View  style={styles.textButtonContainer}>
                <Text style={{marginBottom: hp("1%")}}>RESERVA: {this.state.actualTrip.reservationCode}</Text>
                <Ionicons name="md-copy" size={wp("6%")} color="gray" style={{marginLeft: wp("2%")}} 
                onPress={() => {
                  Clipboard.setString(this.state.actualTrip.reservationCode)
                  ToastAndroid.show("Código de reserva copiado", ToastAndroid.SHORT);
                }}/>
                </View>
                </ScrollView>
                <Button
                  onPress={() => Linking.openURL(this.state.actualAirline)}
                  buttonStyle={{backgroundColor:'#2988BC', borderColor: '#2988BC', borderRadius: wp("5%"), borderWidth: 1}}
                  title='IR A RESERVA' />
                <ScrollView horizontal={false}>
                <View style={styles.buttonContainer}>
                <Button title="ELIMINAR" buttonStyle= {{...styles.buttonConfirm, backgroundColor:'#ED8C72', borderColor: '#ED8C72' }} 
                onPress = {() => this.setState({modalRemove: true, modalDetail: false}) }/>
                <Button title="CERRAR" buttonStyle={styles.buttonConfirm} onPress = {() => {  
                  this.setState({ modalDetail:!this.state.modalDetail})}}/>
                </View>
                </ScrollView>
              </Card>
            </View>  
          </Modal>
          <CalendarList
              horizontal={true}
              pagingEnabled={true}
              firstDay={1}
              onDayPress={(day) => {this.showData(day)}}
              markedDates={this.state.formatedTrips}
              markingType={'period'}
              style={{
                height: hp("100%")
              }}
              theme={{
                'stylesheet.day.period': {
                  base: {
                    overflow: 'hidden',
                    height: 34,
                    alignItems: 'center',
                    width: 38,
                  }
                },
                todayTextColor: '#2988BC',
                textMonthFontWeight: 'bold',
              }}
          />
          </View>
          <View>
            <AdMobBanner style={styles.bannerAd}
              bannerSize="fullBanner"
              adUnitID={officialAD}
              onDidFailToReceiveAdWithError={this.bannerError}
              onAdViewDidReceiveAd = {this.bannerAdReceived} />
            </View>
        </View>
      );
    }
}  

const styles = StyleSheet.create({
  modal: {  
    justifyContent: 'center',
    alignItems: 'center', 
    borderColor: '#fff',    
    marginTop: hp("50%"),
    width: wp('95%'),
    margin: wp("2%")
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: hp("1%")
  },
  textButtonContainer:{
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginBottom: hp("1%")
  },
  buttonConfirm:{
    backgroundColor:'#2F496E',
    borderColor: '#2F496E',
    borderRadius: wp("5%"),
    borderWidth: 1,
    width: wp("30%"),
    left: wp("1%"),
    height: '75%',
    alignSelf: 'center'
  },
  bannerAd: {
    position: "absolute",
    width: wp("100%"),
    top: hp("-7%")
  }
});