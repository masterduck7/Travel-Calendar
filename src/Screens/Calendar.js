import {CalendarList} from 'react-native-calendars';
import React, { Component } from 'react';
import { AsyncStorage, View, Text, Linking  } from 'react-native';
import { Card, Button } from 'react-native-elements'
import moment from 'moment';

export default class CalendarTravel extends Component {

    constructor(props){
      super(props);
      this.state = {
        tripsData : [],
        formatedTrips: [],
        // Actual Trip to show details
        // Destination, Start date, End date, Airline, Reservation code
        actualTrip: {
          destination: 'DESTINO',
          start_date: '',
          end_date: '',
          airline: '',
          reservationCode: ''
        },
        actualAirline: ''
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

    componentDidMount = async () => {
      this._retrieveData()
    }

    findDate(day, data){
      let selectedTrip = []
      Array.from(data, child => {
        const compare = (child.start_date === day )
        if (compare) {
          selectedTrip = {
            destination: child.destination,
            start_date: child.start_date,
            end_date: child.end_date,
            airline: child.airline,
            reservationCode: child.reservationCode
          }
        }
      });
      return selectedTrip
    }

    showData(day){
      if (this.state.tripsData !== []) {
        let sTrip = this.findDate(day.dateString, this.state.tripsData)
        if (sTrip.length !== 0) {
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
              airline: sTrip.airline,
              reservationCode: sTrip.reservationCode
            },
            actualAirline: airline
          })
        }else{
          this.setState({
            actualTrip: {
              destination: 'DESTINO',
              start_date: '',
              end_date: '',
              airline: '',
              reservationCode: ''
            }
          }) 
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
      const vacation_start = {startingDay: true, color: '#FD2F40', textColor: 'white'};
      const vacation_end = {endingDay: true, color: '#FD2F40', textColor: 'white'};
      const vacation_between = {color:'#969696', textColor: 'white'};
      const vacation_one = {startingDay: true, color: '#FD2F40', endingDay: true, textColor: 'white'};
      Array.from(data, child => {
        let sd = child.start_date
        let ed = child.end_date
        if (sd === ed) {
          newData[sd] = vacation_one;
        }else{
          newData[sd] = vacation_start;
          let daysBetween = this.getAllDaysBetween(sd,ed)
          for (let i = 0; i < daysBetween.length; i++) {
            newData[daysBetween[i]] = vacation_between;
          }
          newData[ed] = vacation_end;
        }
      })
      this.setState({
        formatedTrips: newData,
        tripsData: data
      })
    }

    render(){
      return(
        <View>
        <CalendarList
            horizontal={true}
            pagingEnabled={true}
            firstDay={1}
            onDayPress={(day) => {this.showData(day)}}
            markedDates={this.state.formatedTrips}
            markingType={'period'}
            theme={{
              'stylesheet.day.period': {
                base: {
                  overflow: 'hidden',
                  height: 34,
                  alignItems: 'center',
                  width: 38,
                }
              }
            }}
        />
        <Card 
          title={<Text style={{textAlign:'center', paddingBottom: 15, fontSize: 20}}>{this.state.actualTrip.destination}</Text>}>
          <Text style={{marginBottom: 10}}>INICIO: {this.state.actualTrip.start_date}</Text>
          <Text style={{marginBottom: 10}}>TERMINO: {this.state.actualTrip.end_date}</Text>
          <Text style={{marginBottom: 10}}>AEROLINEA: {this.state.actualTrip.airline}</Text>
          <Text style={{marginBottom: 10}}>RESERVA: {this.state.actualTrip.reservationCode}</Text>
          <Button
            onPress={() => Linking.openURL(this.state.actualAirline)}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='CHECK RESERVATION' />
        </Card>

        </View>
      );
    }
}  