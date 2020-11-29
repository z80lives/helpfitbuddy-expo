import React from "react";

import * as Location from 'expo-location';
import MapView from 'react-native-maps';


import { Root, Container, Content, Text, Toast,View, Input, Item, Form, Button, Spinner } from "native-base";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

import styles from "./style";

import { modalStyleIOS } from "react-native";

import { Actions } from "react-native-router-flux";

export class AddGymScreen extends React.Component {
    map = React.createRef();
    constructor() {
    super();
    this.state = {
	dateText: "Enter open Time",
	isVisible: false,
	chosenDate: "",
	currentSelection: "open",
	openTimeText: "",
	closeTimeText: "",
	name: "",
	longitude: null,
	latitude: null,
	location: null
    };
  }

    updateLocation = async () => {
	let { status } = await Location.requestPermissionsAsync();
	if (status !== 'granted') {
            console.error('Permission to access location was denied');
	}
	
	let location = await Location.getCurrentPositionAsync({});
	this.setState({location});
	this.jumpToLocation();
	console.log("location", location.coords);
    }

    makeToast(msg) {
	Toast.show({
	    text: msg,
	    position: "bottom",
	    duration: 3000,
	});
    }

    jumpToLocation(){
	const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.location.coords;
	this.map.animateToRegion({
	    latitude,
	    longitude,
	    latitudeDelta: 0.0922,
	    longitudeDelta: 0.0421
	});
	console.log(this.map)
	this.setState({latitude: latitude.toString(), longitude: longitude.toString()});
    }

    componentDidMount(){
	this.updateLocation();	
    }

    
    componentWillUnmount() {
	//this._ismounted = false;
    	Toast.toastInstance = null;
    }

    handleCreate = () => {
	const {name, openTimeText, closeTimeText,longitude, latitude} = this.state;
	this.props.gymServices.addGym(
	    name,
	    openTimeText,
	    closeTimeText,
	    longitude,
	    latitude
	).then( r => {
	    this.makeToast(r.message)
	    //Actions.home();
	    this.props.onCreate();
	}).catch( (error) => {
	    this.makeToast(error);
	});
	//Actions.home()
    }

    handlePicker = (datetime) => {
	console.log("datetime", datetime.toLocaleTimeString());
 /*    const formatDate = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(datetime);      */
	const formatDate = datetime.toLocaleTimeString();
	const isVisible = false;

	if(this.state.currentSelection == "open"){
	    this.setState({
		openTimeText: formatDate,
		isVisible
	    });
	}else{
	    this.setState({
		closeTimeText: formatDate,
		isVisible: false
	    });
	}
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
	  <>
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 35, marginBottom: 50 }}>CREATE GYM</Text>
            </View>
            <View>
              <Form>
                <Item regular style={styles.button}>
                    <Input placeholder="Name of Gym"
			   value={this.state.name}
			   onChangeText={(name)=>this.setState({name})}
		    />
                </Item>

                <Text>{this.state.chosenDate}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={ () => { this.setState({isVisible: true, currentSelection: "open"})} }
                >
                    <Text style={styles.text}> {this.state.openTimeText.length==0?"Select open time":this.state.openTimeText} </Text>
                </TouchableOpacity>

                <Text>{this.state.chosenDate}</Text>

                <TouchableOpacity
                  style={styles.button}                    
		    onPress={ () => { this.setState({isVisible: true, currentSelection: "close"})} }

                >
                    <Text style={styles.text}> {this.state.closeTimeText.length==0?"Enter close time":this.state.closeTimeText} </Text>
                </TouchableOpacity>

                <Item regular style={(styles.button, { marginTop: 15 })}>
                    <Input placeholder="Longitude"
			   value={this.state.latitude}
			   
		    />
                </Item>
		  <Item regular >
		      <Input placeholder="Latitude"
 			     value={this.state.longitude}
		      />
		  </Item>
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
	      
	      <View>
		  <MapView
		      ref={map => {this.map = map}} 
		      style={{
			  width: "100%",
			  height: 200
		      }}
		      showUserLocation={true}
		  >
		      {this.state.location &&
		       <MapView.Marker
			 coordinate={this.state.location.coords}
			 title="Me"
			 description="Current Location"
		       />
			   }

		  </MapView>
	      </View>

          <View>
            <Button full warning onPress={this.handleCreate}>
              <Text style={{ color: "black" }}> Create </Text>
            </Button>
          </View>
	  </>
    );
  }
}

export default AddGymScreen;
