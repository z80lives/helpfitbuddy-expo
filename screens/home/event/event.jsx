import React, { Component } from "react";
import { Container, Content,Text, View, Card, Icon, Fab } from "native-base";

import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";

import {EventServices} from "../../../services/events";

import styles from "./styles";

export class EventScreen extends Component {
    eventServices = new EventServices();
  state = {
      selectedDate: (new Date()).toISOString().split('T')[0],
      items: null
    /*items: {
      "2020-11-17": [{ name: "Jogging", time: "15:00" }],
      "2020-11-16": [{ name: "Swimming", time: "14:00" }],
    },*/
  };

    formatDate = (dateObj) => {
	return dateObj.toISOString().split('T')[0]
    }

    componentDidMount(){	
	this.loadEvents();
    }

    getListDate =(startDate, endDate) => {
	//borrowed from https://stackoverflow.com/a/42546321
	var listDate = [];
	var dateMove = new Date(startDate);
	var strDate = startDate;

	while (strDate < endDate){
	    var strDate = dateMove.toISOString().slice(0,10);
	    listDate.push(strDate);
	    dateMove.setDate(dateMove.getDate()+1);
	};
	return listDate;
    }
    
    loadEvents = () => {
	const list_date= this.getListDate("2020-11-01", "2020-12-30");
	this.eventServices.getEvents().then( r => {
	    console.log("Loading events", r.events);
	    
	    const selectedDate =
		  r.events.length!=0?
		  Object.keys(r.events)[0]
		  :this.state.selectedDate;
	    var generatedMap = {};

	    
	    const received_dates = Object.keys(r.events);

	    
	    list_date.forEach(key_date => {
		//console.log("date", key_date)
		const el = received_dates.includes(key_date)?
		      r.events[key_date]:
		      [];
		generatedMap[key_date]=el;		
	    });
	    //console.log(generatedMap);	    
	    
	    this.setState({items: generatedMap, selectedDate: "2020-11-20"});
	    //this.setState({items:items})	    
	});
    }
    
  render() {
    return (
        <Container style={{height: Dimensions.get('window').height-80}}>
	    <AgendaItem
        items={this.state.items}
        selected={this.state.selectedDate}
        markedDates={{}}
        markingType={"multi-dot"}
        onDayChanged={(date) => {
          this.setState({
            selectedDate: date,
          });
          console.log("DATE", date);
		}}
		onRefresh={this.loadEvents}
        onDayPress={() => console.log("Day pressed")}
        theme={{
          backgroundColor: "rgba(243,129,129,0.9)",
          agendaDayTextColor: "black",
          agendaDayNumColor: "black",
          todayBackgroundColor: "red",
          todayTextColor: "#ffffff",
        }}
      />

    <Fab
            style={{ backgroundColor: '#5067FF',
                    top: 0
            }}
            position="bottomRight"
        onPress={() => {Actions.addEvent({onSave: ()=> {
	    Actions.home({currentPage: 2})
	}})} }>	
        <Icon name="share" />
          </Fab>
          
      </Container>
    );
  }
}

const ScheduleItem = (item) => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <Card
      style={
	    item.selfCreated?
		{...styles.scheduleCardStyle,
		 backgroundColor: "#84b1ba"}
	    :{...styles.scheduleCardStyle}
	    }
    >
      <Text style={{ marginLeft: 15, marginTop: 7, color: "blue" }}>
        {item.name}
      </Text>
      <Text style={{ marginLeft: 15, marginTop: 7, color: "blue" }}>
        <Icon
          style={{ fontSize: 15, flix: 1, fontSize: 16, color: "#800080" }}
          name="location-pin"
          type="Entypo"
        />	  
          {item.gym.name}
      </Text>
	<Text style={{ marginLeft: 30, marginTop: 7, color: "blue" }}>Status:
	</Text>

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
    loadItemsForMonth={(month) => {
      console.log("trigger items loading");
    }}
    // Callback that fires when the calendar is opened or closed
    onCalendarToggled={(calendarOpened) => {
      console.log(calendarOpened);
    }}
    // Callback that gets called on day press
    onDayPress={(day) => {
      console.log("day pressed");
    }}
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    minDate={"2019-05-10"}
    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    maxDate={"2021-05-30"}
    // Max amount of months allowed to scroll to the past. Default = 50
    pastScrollRange={50}
    // Max amount of months allowed to scroll to the future. Default = 50
    futureScrollRange={50}
    // Specify how each item should be rendered in agenda
    renderItem={(item, firstItemInDay) => {
      return <ScheduleItem {...item}></ScheduleItem>;
    }}
   
    // Specify how each date should be rendered. day can be undefined if the item is not first in that day.

   renderDay={(day, item) => {
       if(typeof day === 'undefined'){
	   return<View></View>
       }else
       return(
	   <View>
	       
	       <Text style={{ marginLeft: 20, marginTop: 20 }}>{day.day!=null?day.day+"/"+day.month:day}</Text>
	       <Text style={{ marginLeft: 20, marginTop: 20 }}> {item&&item.time}</Text>
	   </View>
       );
       
   }}
   /*renderDay={(day, item) => (
      <View>
          <Text style={{ marginLeft: 20, marginTop: 20 }}>OK</Text>
      </View>
    )}*/
   
    // Specify how empty date content with no items should be rendered
    renderEmptyDate={() => {
      return (
          <View style={styles.emptyCardStyle}>
          <Text>Not item on schedule</Text>
        </View>
      );
    }}
    // Specify how agenda knob should look like
    //renderKnob={() => {return (<View />);}}
    // Specify what should be rendered instead of ActivityIndicator
    renderEmptyData={() => {
      return (
        <View>
          <Text>Nothing on Agenda</Text>
        </View>
      );
    }}
    // Specify your item comparison function for increased performance
    rowHasChanged={(r1, r2) => {
      return r1._id !== r2._id;
      
    }}
    // Hide knob button. Default = false
   hideKnob={false}
   
    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
   disabledByDefault={false}
   
    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
   onRefresh={props.onRefresh}
    // Set this true while waiting for new data from a refresh
    refreshing={false}
    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
    refreshControl={null}
    // Agenda theme
    theme={{
      agendaDayTextColor: "yellow",
      agendaDayNumColor: "green",
      agendaTodayColor: "red",
      agendaKnobColor: "blue",
    }}

    
    // Agenda container style
    style={{}}
    
    
  />

  
);


export default EventScreen;
