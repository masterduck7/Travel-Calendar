import {Calendar} from 'react-native-calendars';
import React, { Component } from 'react';

export default class CalendarTravel extends Component {
    render(){
      return(
        <Calendar
            markedDates={{
                '2020-05-20': {textColor: 'green'},
                '2020-05-22': {startingDay: true, color: 'green'},
                '2020-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                '2020-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
            }}
            markingType={'period'}
        />
      );
    }
}  