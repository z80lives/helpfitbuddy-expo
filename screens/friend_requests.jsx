import React, {Component} from 'react';
import { Container, Header, Button,
	 View, Card,
	 Content, List, ListItem, Thumbnail,
	 Text, Tab, Tabs, Fab, Icon,
	 Left, Body, Right,Row
       } from 'native-base';

import {Dimensions} from 'react-native';

import {FriendServices} from "../services/friends.jsx";

const FriendRequestItem = (props) => (
    <ListItem thumbnail>
	<Left>
	    <Thumbnail square source={{ uri: props.image }} />
	</Left>
	<Body>
	    <Text>{props.name}</Text>
	    <Text note numberOfLines={1}>{props.age}, {props.country}</Text>
	</Body>
	<Right>
	    <Row>
		<Button transparent onPress={props.acceptRequest}>
		    <Text>Accept</Text>
		</Button>
		<Button transparent onPress={props.rejectRequest}>
		    <Text>Reject</Text>
		</Button>
		</Row>
	</Right>
    </ListItem>

);

export class FriendRequestView extends Component{
    friendServices=new FriendServices();
    state={
	isLoaded:false,
	requests: []
    }

    getFriendRequests = () => {
	this.friendServices.getFriendRequests().then(r => {
	    this.setState({
		requests: r.friend_requests,
		isLoaded: true
	    });
	}).catch(error => console.error(error));
    }
    
    componentDidMount(){
	this.getFriendRequests()
    }

    handleAcceptRequest = (_id) => {
	console.log("Accept request");
	this.friendServices.acceptFriendRequest(_id)
	    .then( r=> {
		this.getFriendRequests();
	    }).catch(error=>console.error(error));
		
    }

    handleRejectRequest = () => {
	console.log("Reject request");
	
    }
    
    render(){
	if(!this.state.isLoaded){
	    return(<View></View>);
	}else
	return (
	    <View>
		<Header>
		    <Text style={{color: "#fefefe", alignItems: "center", marginTop:10}}>Friend Requests</Text>
		</Header>
		<List>{
			this.state.requests.map( user => 
			    (<FriendRequestItem
				 acceptRequest={()=>this.handleAcceptRequest(user._id) }
				 rejectRequest={()=>this.handleRejectRequest(user._id) }
				{...user}
			     />))
		}		    
		</List>
	    </View>
	);
    }
};

export default FriendRequestView;
