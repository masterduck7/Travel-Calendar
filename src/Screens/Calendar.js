import {CalendarList} from 'react-native-calendars';
import React, { Component } from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'

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
        }
      }
    }

    _retrieveData = async () => {
      try {
        const data = await AsyncStorage.getItem('@Trips');      
        this.formatData(JSON.parse(data))
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

    formatData(data){
      let newData = {}
      const vacation_start = {startingDay: true, color: 'red', textColor: 'gray'};
      const vacation_end = {endingDay: true, color: 'red', textColor: 'gray'};
      const vacation_one = {startingDay: true, color: 'green', endingDay: true, textColor: 'gray'};
      Array.from(data, child => {
        let sd = child.start_date
        let ed = child.end_date
        if (sd === ed) {
          newData[sd] = vacation_one;
        }else{
          newData[sd] = vacation_start;
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
            // Enable horizontal scrolling, default = false
            horizontal={true}
            // Enable paging on horizontal, default = false
            pagingEnabled={true}
            firstDay={1}
            onDayPress={(day) => {this.showData(day)}}
            markedDates={this.state.formatedTrips}
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