import {CalendarList} from 'react-native-calendars';
import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';

export default class CalendarTravel extends Component {

    constructor(props){
      super(props);
      this.state = {
        tripsData : []
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

    cleanData(){
      let data = this.state.tripsData
      let trips = []
      data.forEach(trip => {
        trips.push(JSON.parse(trip))
      });
      this.setState({
        tripsData: trips
      })
    }

    componentDidMount = async () => {
      this._retrieveData()
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
            onDayPress={(day) => {console.log('selected day', day)}}
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
        

        </View>
      );
    }
}  