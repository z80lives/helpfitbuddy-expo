import React from "react";
import {
  Container,
  Text,
  View,
  Input,
  Item,
  Form,
  Button,
  Picker,
  Content,
  Icon,
    DatePicker,
    Toast
} from "native-base";

import {makeToast} from "../../../utils/notifications";


import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, modalStyleIOS } from "react-native";

import { GymUserService } from "../../../services/gymuser";
import { EventServices } from "../../../services/events";

import { Actions } from "react-native-router-flux";

import Intl from 'react-native-intl';

export class AddEventScreen extends React.Component {
    gymService = new GymUserService();
    eventServices = new EventServices();


    dateFormat = (dateObj) => {
	try{
	    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(dateObj);
	    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(dateObj);
	    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(dateObj);
	    return `${ye}-${mo}-${da}`;
	}catch(ex){
	    return dateObj.toLocaleString();
	}
    }
    
  state = {
      dateText: "Enter the Time",
      gymList: [],
      currentGymIndex: 0,
      isVisible: false,
      chosenDate: "",
      errorMessage: null,
      name: "",
      time: null,
      date: null,
      gym: null,
      type: null
  };

    updateGymList(){
	this.gymService.getGymList().then( r => {
	    this.setState({gymList: r.data});
	}).catch(console.error);
    }

    componentDidMount() {
	this.updateGymList();
    }

    handleSave = () => {
	const {name, time, date, gym, type} = this.state;
	console.log("Sending data", this.state);
	
	this.eventServices.createEvent(name, date, time, gym, type).then(r => {
	    console.log("Response",r)
	    this.setState({errorMessage: null});
	    if(this.props.onSave != null){
		this.props.onSave();
	    }else{
		Actions.home()
	    }
	}).catch((error) => {
	    this.setState({errorMessage: "Unable to create event"});
	});

    }

    handlePicker = (datetime) => {
	var formatDate = (new Date(datetime)).toLocaleTimeString();
	formatDate = formatDate.slice(0, 5) + formatDate.slice(8);	
	
	try{
	    formatDate = new Intl.DateTimeFormat("en-GB", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	    }).format(datetime);
	}catch(error){
	    console.log("Cannot convert time string: Falling back to locale time string");
	}
	this.setState({
	    dateText: formatDate,
	    time: formatDate,
	    isVisible: false,
	});
    };

  hidePicker = (datetime) => {
    this.setState({
      isVisible: false,
    });
  };

  showPicker = () => {
    this.setState({
      isVisible: true,
    });
  };

    
  render() {
    return (
      <Container>
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 35, marginBottom: 50 }}>ADD EVENT</Text>
            </View>
            <View>
              <Form>
                <Item regular style={(styles.button, {})}>
                    <Input placeholder="Event Name" placeholderTextColor="gray" value={this.state.name} onChangeText={name=>this.setState({name})} />
                </Item>

                <Text>{this.state.chosenDate}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.showPicker}
                ><View><Text style={styles.text}>{this.state.dateText}</Text></View>
                </TouchableOpacity>

                <View
                  style={{
                    width: 400,
                    height: 50,
                    borderWidth: 1,
                    marginTop: 10,
                    borderColor: "#D3D3D3",
                  }}
                >
                  <Item>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date(1900, 1, 1)}
                      maximumDate={new Date(2030, 12, 25)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Enter the Date"
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{
                        color: "gray",
                        marginTop: 5,
                        fontSize: 18,
                      }}
			onDateChange={(newDate) => {

			    const formatDate = this.dateFormat(newDate);
                            this.setState({ date: formatDate });
                      }}
                      disabled={false}
                    />
                  </Item>
                </View>

                <Form
                  style={{
                    width: 400,
                    height: 50,
                    borderWidth: 1,
                    marginTop: 10,
                    borderColor: "#D3D3D3",
                  }}
                >
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select Gym"
                    placeholderStyle={{ color: "gray" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                      selectedValue={this.state.gym}
		      value={this.state.gym}
		      onValueChange={(val) => {
			  this.setState({gym: val });
		      }}
                  >
		      <Picker.Item label={"Please select a gym"} value={null}/>		      
		      {this.state.gymList.map( gym => 
			  <Picker.Item label={gym.name} key={gym._id} value={gym._id} /> )}
		      
                  </Picker>
		   
                </Form>
              </Form>
              <Form
                style={{
                  width: 400,
                  height: 50,
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: "#D3D3D3",
                }}
              >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select Activity"
                  placeholderStyle={{ color: "gray" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.type}
                  onValueChange={(val) => this.setState({ type: val })}
                >
		    <Picker.Item label="Please select activity type " value={null} />
                  <Picker.Item label="Running " value="running" />
                  <Picker.Item label="MMA" value="mma" />
                </Picker>
              </Form>
            </View>

            <DateTimePickerModal
              style={{ modalStyleIOS }}
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={"time"}
            />
          </View>
	    
	    <View style={{alignItems:"center"}}>
		<Text style={{color:"red"}}>{this.state.errorMessage}</Text>
	    </View>
          <View>
              <Button full warning onPress={this.handleSave}>
              <Text style={{ color: "black" }}> Done </Text>
            </Button>
          </View>
      </Container>
    );
  }
}

export default AddEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 400,
    height: 50,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "gray",
    left: 10,
    alignSelf: "flex-start",
    textAlign: "center",
  },
});
