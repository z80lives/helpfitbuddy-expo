import React from "react";
import {Container, Text, Header,
	Body,
	Card, CardItem,
	Button,
	Icon,
	View,
	Toast,
	Root
       } from "native-base";

import { Col, Row, Grid } from "react-native-easy-grid";

import {GymUserService} from "../../services/gymuser.js";
import {auth} from "../../redux/actions/auth";

import {connect} from 'react-redux';

const fitnessItems = [
    {"name": "Boxing", "icon": {"type": "MaterialCommunityIcons", "name": "boxing-glove"}},
    {"name": "Yoga", "icon": {"type": "MaterialCommunityIcons", "name": "human"}},
    {"name": "Fitness", "icon": {"type": "MaterialIcons", "name": "fitness-center"}},
    {"name": "Walking", "icon": {"type": "MaterialCommunityIcons", "name": "walk"}}
    ,
    {"name": "Dancing", "icon": {"type": "Ionicons	", "name": "ios-walk"}},
    {"name": "Zumba", "icon": {"type": "Feather", "name": "activity"}},
    {"name": "Gymnastics", "icon": {"type": "MaterialCommunityIcons", "name": "boxing-glove"}},
    {"name": "Running", "icon": {"type": "FontAwesome5", "name": "running"}}
];

const ballSports = [
    {"name": "Handball", "icon": {"type": "MaterialCommunityIcons", "name": "handball"}},
    {"name": "Basketball", "icon": {"type": "MaterialCommunityIcons", "name": "basketball"}},
    {"name": "Football", "icon": {"type": "FontAwesome", "name": "soccer-ball-o"}},
    {"name": "Golfing", "icon": {"type": "MaterialIcons", "name": "golf-course"}},
    {"name": "Volleyball", "icon": {"type": "FontAwesome5", "name": "volleyball-ball"}},
    {"name": "Rugby", "icon": {"type": "FontAwesome5", "name": "football-ball"}},
    
];

class ToggleButton extends React.Component{
    state={isDown:false};    
    inActiveStyle(){
	if(!this.state.isDown){
	    return {
		backgroundColor: "grey",
		width:160,
		justifyContent: 'center'
	    }
	}else{
	    return {
	    }
	}
    }
    
    handleClick=(name)=>{
	if(this.props.onToggle){
	    this.props.onToggle(this.props.label, this.state.isDown);
	}
	this.setState({isDown: !this.state.isDown});
    }
    
    render(){
	const props = this.props;
	return(
	    <Button
		style={{width:160,
			justifyContent: 'center',
			...this.inActiveStyle()
		       }		       
		      }
		primary={this.state.isDown}
		onPress={this.handleClick}
	    >
		
		<Icon name={props.name} type={props.type}/>
		<Text>
		    {props.label}
		</Text>
	    </Button>
	);
    }
}

export class ActivitiesListScreen extends React.Component{
    state={
	activityList: this.props.user.activities,
	errorMsg: null
    }

    gymUserServices = new GymUserService();

    toggleActivity = (activity, toggleState) =>{
	var action = "add"
	//const activityList = [...this.state.activityList];
	const activityList = [];
	if(toggleState){
	    action = "remove";
	}
	
	const newActivityList =
	      action == "add"? [activity, ...this.state.activityList]:
	      activityList.filter(el => el != activity);

	console.log("a list", newActivityList);
	this.setState({activityList: newActivityList});
	//console.log(action+" activity", activity, toggleState);
    }

    displayErrorMsg = (errorMsg) => {
	this.setState({errorMsg: errorMsg});
	setTimeout(
	    ()=>{this.setState({errorMsg: null})},
	    1000*6
	);
    }
    
    handleSave = () => {
	const activities = this.state.activityList;
	if(activities.length == 0){
	    console.log();
	    const errorMsg = "Please select atleast one activity";
	    this.displayErrorMsg(errorMsg);
	}else{
	    this.gymUserServices.setActivities(activities).then( (response) =>{
		this.props.setActivitiesAction(activities);
		this.props.onExit();
	    }).catch( msg => {
		this.displayErrorMsg(msg);
	    });		
	}
    }
    
    render(){
        return(
	    <Root>
            <Container>
		<Card>
		    <Card>
		    <CardItem header>
			<Text style={{fontWeight: "bold"}}>Fitness and Wellness</Text>
		    </CardItem>
		    
		    <CardItem >
			<Grid style={{flexDirection:'row',
				      flex: 1,
				      flexWrap: 'wrap',
				      justifyContent: 'center',
				      alignItems: 'center'
				     }}
			>
			    {fitnessItems.map( (item, k) =>
				<View
				    style={{
					margin:5,
					justifyContent: 'center',
					alignItems: 'center',}}
				    key={k}
				>
				    <ToggleButton
					label={item.name}
					{...item.icon}
					onToggle={this.toggleActivity}
				    />
				</View>				
			)}
			</Grid>
		    </CardItem>
		    </Card>
		    
		    <Card>

		<CardItem header>
		    <Text style={{fontWeight: "bold"}}>Ball Sports</Text>
		</CardItem>
		    
		    <CardItem >
			<Grid style={{flexDirection:'row',
				      flex: 1,
				      flexWrap: 'wrap',
				      justifyContent: 'center',
				      alignItems: 'center'
				     }}
			>
			    {ballSports.map( (item, k) =>
				<View
					style={{
					margin:5,
					justifyContent: 'center',
					alignItems: 'center',}}
				    key={k}
				>
				     <ToggleButton
					label={item.name}
					 {...item.icon}
					 onToggle={this.toggleActivity}
				    />				    
				</View>
			    )}
			</Grid>
		    </CardItem>
		    </Card>
		    
		    <CardItem footer style={{justifyContent:"center"}}>
			<Button
			    onPress={this.handleSave}
			    style={{width: "80%", justifyContent: "center"}}>
			<Text>Save</Text>
			</Button>			
		    </CardItem>
		</Card>

		{this.state.errorMsg!=null?
		 <View style={{
			   justifyContent: "center",
			   alignItems:"center",
			   backgroundColor: "grey",
			   color:"white",
			   padding: 10
		       }}>
		     <Text style={{color: "white"}}>
			{this.state.errorMsg}
		    </Text>
		</View>:<></>}
		
            </Container>
	    </Root>
        )
    }
}

const mapStateToProps = ({authReducer}) => ({
    isAuthenticated: authReducer.isAuthenticated,
    user: authReducer.user,
    token: authReducer.token
});

export default connect(mapStateToProps, {...auth})(ActivitiesListScreen);
