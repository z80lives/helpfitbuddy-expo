import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

import {MemberScreen} from "./member/member.jsx";
import {ActivityScreen} from "./activities/activites.jsx";
import {EventScreen} from './event/event.jsx';
import {ChatScreen} from './chat/chat.jsx'
import ProfileScreen from './profile/profile.jsx'
import { connect } from 'react-redux';

import {Actions, ActionConst} from "react-native-router-flux";
//import {ActivityScreen} from "./activities/activites.jsx";
//import ActivityScreen from "/activites/activites.jsx";
import {GymUserService} from "../../services/gymuser.js";

import ActivitiesListScreen from "../activitiesList/activitiesList";

//import PhotoUpload from 'react-native-photo-upload';

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

class HomeScreen extends Component {
    state={
	currentPage: 0,
	showActivityList: false,
	showPictureSet: false
    }

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

    componentDidMount(){
	this.fetchActivities();
	this.authRedirect();
    }
    
    componentDidUpdate(){
	this.authRedirect();
    }
    
    render() {
	if(this.state.showActivityList){
	    return(<ActivitiesListScreen
		       onExit={()=>{this.setState({showActivityList: false})}}
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
			    <Text>Chat</Text>
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

export default connect(mapStateToProps, null)(HomeScreen);
