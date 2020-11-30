import React from "react";

import {Container, Text, Spinner, View} from "native-base";

import {ViewProfileScreen} from "../profile/ViewProfile/viewProfile";
import {GymUserService} from "../../../services/gymuser";
import {FriendServices} from "../../../services/friends";

export class ViewMember extends React.Component{
    gymUserServices = new GymUserService();
    friendServices = new FriendServices();    
    state={
	loading: true,
	data: null,
	extra: null
    }
    componentDidMount(){
	this.loadUser();
    }

    sendFriendRequest = ()=>{
	const otherPersonId = this.state.data._id;
	
	this.friendServices.sendFriendRequest(otherPersonId)
	    .then(r => {	    
		console.log(r.message);
		this.loadUser();
	    }).catch(error => {
		console.error(error);
	    });
    }

    loadUser = () => {
	
	this.gymUserServices.getGymUser(this.props.data._id).then( r => {
	    this.setState({loading: false, data: r.userData, extra: r.extra});
	}).catch( error => {
	    console.error("Unable to retrieve user");
	});
    }
    
    render(){
	if(this.state.loading){
	    return (
		<View><Spinner/></View>
	    );
	}else{
	return(
	    <ViewProfileScreen	
		user={this.state.data}
		{...this.state.extra}
		friendMode={true}
		sendFriendRequest={this.sendFriendRequest}
	    />
	    
	);
	}
    }
};

export default ViewMember;
