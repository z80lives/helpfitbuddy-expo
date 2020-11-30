import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text,
	 View, Card
       } from 'native-base';

import {Image, Alert} from 'react-native';

import {MemberScreen} from "./member/member.jsx";
import {ActivityScreen} from "./activities/activites.jsx";
import {EventScreen} from './event/event.jsx';
import ChatScreen from './chat/chat.jsx'
import ProfileScreen from './profile/profile.jsx'
import { connect } from 'react-redux';

import {Actions, ActionConst} from "react-native-router-flux";
//import {ActivityScreen} from "./activities/activites.jsx";
//import ActivityScreen from "/activites/activites.jsx";
import {GymUserService} from "../../services/gymuser.js";
//import {AuthService} from "../../services/auth.js";

import ActivitiesListScreen from "../activitiesList/activitiesList";


import {auth} from "../../redux/actions/auth";
//used by photo picker component
//import PhotoUpload from 'react-native-photo-upload';
import * as ImagePicker from 'expo-image-picker';
import ImgToBase64 from 'react-native-image-base64';

class BodyContent extends React.Component{
    render(){
	if(this.props.currentPage==0)
	    return <MemberScreen/>;
	else if(this.props.currentPage==1)	 //when you click activity button   
	    return <ActivityScreen/>;
	else if(this.props.currentPage==2)
	    return <EventScreen />
	else if(this.props.currentPage==3)
	    return <ChatScreen />
	else if(this.props.currentPage==4)
	    return <ProfileScreen/>
	else
	    return <Text>Not implemented yet</Text>;
    }
}

class PhotoPicker extends Component{
    gymServices=new GymUserService();
    state = {
	selectedImage: require("../../res/blank.png"),
	imgb64: null
    }
     openImagePickerAsync = async () => {
	 let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
	 
	 if (permissionResult.granted === false) {
	     Alert("Permission to access camera roll is required!");
	return;
    }

	 let pickerResult = await ImagePicker.launchImageLibraryAsync({
	     base64: true,
	     allowsEditing: false,
	     aspect: [4, 3]
	 });
	 console.log(pickerResult);
	 const imgbase64 = pickerResult? `data:image/jpg;base64,${pickerResult.base64}`:null;

	 this.setState({selectedImage: {uri: pickerResult.uri},
			imgb64: imgbase64
		    });	 
     }

    handleSave = () => {
	this.gymServices.setProfilePicture(this.state.imgb64)
	    .then(response => {
		this.props.onSave(this.state.imgb64);
	    }).catch(msg => {
		console.error(msg);
	    });	 
    }
    
    render(){
	return (
	    <View style={{
		      justifyContent:'center',
		      flex: 1,
		      alignItems: 'center'
			 }}>
		<Card style={{padding: 15}}>
		<Image
			source={this.state.selectedImage}
		    width={50}
		    height={50}
		    style={{width:200, height:200, resizeMode: 'stretch'}}
		/>
		    <View style={{justifyContent: 'center', alignItems:'center',
				  margin: 5}}>
			<Button style={{left: 30}}
			onPress={this.openImagePickerAsync} width={"100%"} >
			    <Text>Pick a photo</Text>
			</Button>

		    </View>
		    <View style={{justifyContent: 'center', alignItems:'center',
				  margin: 5}}>		    
			<Button style={{left: 55}}
			onPress={this.handleSave} width={"100%"}>
			    <Text>Save</Text>
			</Button>
		    </View>
		    </Card>
	    </View>
	);
    }
}

class HomeScreen extends Component {
    state={
	currentPage: 0,
	showActivityList: false,
	showPictureSet: false
    }

    gymUserServices = new GymUserService();

    clickNav = (num) => {
	this.setState({currentPage: num})
    }

    authRedirect = () => {
	if(!this.props.isAuthenticated){
            Actions.login({"type": ActionConst.RESET});
	}
    }

    fetchActivities = ()=>{
	if(this.props.user.activities.length == 0){	   
	    this.setState({showActivityList: true});
	}
    }

    checkProfilePicture = () => {
	if(!this.props.user.image){
	    console.log("no profile picture saved");
	    this.gymUserServices.getProfilePicture()
		.then(response => {
		    if(response.image == null){
			console.log("No profile picture set");
			this.setState({showPictureSet: true});
		    }else{
			this.props.setProfilePictureAction(response.image);
		    }
		});
	}
    }

    componentDidMount(){
	this.fetchActivities();
	this.checkProfilePicture();
	this.authRedirect();
    }
    
    componentDidUpdate(){
	this.authRedirect();
    }

    handlePhotoUpdate = (img) => {
	//console.log("Image saved", img);
	console.log(this.props);
	this.props.setProfilePictureAction(img);
	this.setState({showPictureSet: false});
    }
    
    render() {
	if(this.state.showActivityList){
	    return(<ActivitiesListScreen
		       onExit={()=>{this.setState({showActivityList: false})}}
		   />);
	}else if(this.state.showPictureSet){
	    return(<PhotoPicker
		       onSave={this.handlePhotoUpdate}
		   />);
	}else
	return (
	    <Container>
		<Content>
		    <BodyContent currentPage={this.state.currentPage}/>
		</Content>
		<Footer>
		    <FooterTab>
			<Button vertical onPress={()=>this.clickNav(0)} active={this.state.currentPage==0}>
			    <Icon active={this.state.currentPage==0} name="computer" type="MaterialIcons" />
			    <Text>Home</Text>
			</Button>
			<Button vertical onPress={()=>this.clickNav(1)} active={this.state.currentPage==1}>
			    <Icon name="map" active={this.state.currentPage==1} type="FontAwesome" />
			    <Text>Map</Text>
			</Button>
			<Button vertical onPress={()=>this.clickNav(2)} active={this.state.currentPage==2}>
			    <Icon active={this.state.currentPage==2} name="event" type="MaterialIcons" />
			    <Text>Events</Text>
			</Button>
			<Button vertical onPress={()=>this.clickNav(3)} active={this.state.currentPage==3}>
			    <Icon active={this.state.currentPage==3} name="chat" type="MaterialIcons" />
			    <Text>Friends</Text>
			</Button>
			<Button vertical onPress={()=>this.clickNav(4)} active={this.state.currentPage==4}>
			    <Icon active={this.state.currentPage==4} name="person" type="MaterialIcons"/>
			    <Text>Profile</Text>
			</Button>
		    </FooterTab>
		</Footer>
	    </Container>
	);
    }
}


const mapStateToProps = ({authReducer}) => ({
    isAuthenticated: authReducer.isAuthenticated,
    isLoading: authReducer.isLoading,
    user: authReducer.user
});

export default connect(mapStateToProps, {...auth})(HomeScreen);
