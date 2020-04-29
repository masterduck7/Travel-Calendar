import {CalendarList} from 'react-native-calendars';
import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

export default class CalendarTravel extends Component {

    constructor(props){
      super(props);
      this.state = {
        tripsData : [],
        cleanedTrips: [],
        // Actual Trip to show details
        // Destination, Start date, End date, Airline, Reservation code
        actualTrip: {
          destination: 'DESTINO',
          start_date: '',
          end_date: '',
          airline: '',
          reservationCode: ''
        }
      }
    }

    _retrieveData = async () => {
      try {
        let trips = []
        const value = await AsyncStorage.getItem('@Trips');
        if (value !== null) {
          this.setState({
            tripsData: value
          })
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
        let sTrip = this.findDate(day.dateString, JSON.parse(this.state.tripsData))
        if (sTrip.length !== 0) {
          this.setState({
            actualTrip: {
              destination: sTrip.destination,
              start_date: sTrip.start_date,
              end_date: sTrip.end_date,
              airline: sTrip.airline,
              reservationCode: sTrip.reservationCode
            }
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

    render(){
      const vacation_start = {key:'vacation_start', selected: true, startingDay: true, color: 'red', textColor: 'gray'};
      const vacation_end = {key:'vacation_end', selected: true, endingDay: true, color: 'red', textColor: 'gray'};
      const vacation_one = {key:'vacation_one', selected: true, startingDay: true, color: 'red', textColor: 'gray', endingDay: true};

      return(
        <View>
        <CalendarList
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            firstDay={1}
            onDayPress={(day) => {this.showData(day)}}
            markedDates={{
                '2020-05-22': vacation_start,
                '2020-05-23': vacation_end,
                '2020-05-04': vacation_one
            }}
            markingType={'period'}
            theme={{
              todayTextColor: '#00adf5',
            }}
        />
        <Card 
          title={<Text style={{textAlign:'center'}}>{this.state.actualTrip.destination}</Text>}>
          <Text style={{marginBottom: 10}}>START DATE: {this.state.actualTrip.start_date}</Text>
          <Text style={{marginBottom: 10}}>END DATE: {this.state.actualTrip.end_date}</Text>
          <Text style={{marginBottom: 10}}>AIRLINE: {this.state.actualTrip.airline}</Text>
          <Text style={{marginBottom: 10}}>RESERVATION CODE: {this.state.actualTrip.reservationCode}</Text>
          <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='CHECK RESERVATION' />
        </Card>

        </View>
      );
    }
}  