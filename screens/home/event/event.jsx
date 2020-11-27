import React, {Component} from "react";
import {Container, Text, View, Card} from "native-base";

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

/*
const items = {
      '2020-11-16': [{name: 'item 1 - any js object'}],
      '2020-11-16': [{name: 'item 2 - any js object', height: 80}],
      '2020-11-17': [],
      '2020-11-18': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
};
const markedDates = {
    '2012-05-16': {selected: true, marked: true},
    '2012-05-17': {marked: true},
    '2012-05-18': {disabled: true}
};*/

export class EventScreen extends Component{
    state = {
	selectedDate: '2020-11-16',
	items: {
	    '2020-11-17': [{name: "Jogging", time: "15:00"}],
	    '2020-11-16': [{name: "Swimming", time:"14:00"}],
	}
    }
    render(){
        return(
	    <AgendaItem
		items={this.state.items}
		selected={this.state.selectedDate}
		markedDates={{}}
		markingType={'multi-dot'}
		onDayChanged={(date)=>{
		    this.setState({
			selectedDate: date
		    })
		    console.log("DATE", date);
		}}

		onDayPress={
		    () => console.log("Day pressed")
		}

		theme={{
		    backgroundColor: 'rgba(243,129,129,0.9)',
		    agendaDayTextColor: 'black',
		    agendaDayNumColor: 'black',
		    todayBackgroundColor: 'red',
		    todayTextColor:'#ffffff'
		}}
	    />
        )
    }
}

const ScheduleItem = (item) => (
    <View style={{justifyContent:"center", alignItems:"center"}}>
	<Card style={{width: 200}}>
	    <Text>{item.name}</Text>
	</Card>
    </View>
);

const AgendaItem = (props) => (
    <Agenda
	{...props}
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  // Callback that gets called when items for a certain month should be loaded (month became visible)
 loadItemsForMonth={(month) => {console.log('trigger items loading')}}
 
  // Callback that fires when the calendar is opened or closed
     onCalendarToggled={(calendarOpened) => {
	 console.log(calendarOpened)}}
 
  // Callback that gets called on day press
  onDayPress={(day)=>{console.log('day pressed')}}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2019-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2021-05-30'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // Specify how each item should be rendered in agenda
     renderItem={(item, firstItemInDay) => {return (<ScheduleItem {...item}></ScheduleItem>);}}
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
     renderDay={(day, item) => (<View><Text>{day ? day.day: 'item'}</Text></View>)}
  // Specify how empty date content with no items should be rendered
  renderEmptyDate={() => {return (<View><Text>Nothing for the day</Text></View>);}}
  // Specify how agenda knob should look like
  //renderKnob={() => {return (<View />);}}
  // Specify what should be rendered instead of ActivityIndicator
  renderEmptyData = {() => {return (<View><Text>Nothing on Agenda</Text></View>);}}
  // Specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
  // Hide knob button. Default = false
  hideKnob={false}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
  // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
  disabledByDefault={false}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
  refreshControl={null}
  // Agenda theme
  theme={{
    agendaDayTextColor: 'yellow',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'red',
    agendaKnobColor: 'blue'
  }}
  // Agenda container style
  style={{}}
 />
);

export default EventScreen;
