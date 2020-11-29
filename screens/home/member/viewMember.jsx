import React from "react";

import {Container, Text, Spinner, View} from "native-base";

import {ViewProfileScreen} from "../profile/ViewProfile/viewProfile";
import {GymUserService} from "../../../services/gymuser.js";

export class ViewMember extends React.Component{
    gymUserServices = new GymUserService();
    state={
	loading: true,
	data: null,
	extra: null
    }
    componentDidMount(){
	this.loadUser();
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
	    />
	    
	);
	}
    }
};

export default ViewMember;
