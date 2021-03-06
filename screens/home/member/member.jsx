import React from "react";
import {Container, Text, Spinner, View} from "native-base";
import {StyleSheet} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";


import {MemberCard} from "./membercard.jsx";
var guy1 = require ('../../../res/guy1.jpeg');

import {GymUserService} from "../../../services/gymuser.js";
import { ScrollView } from "react-native-gesture-handler";

import { Actions } from "react-native-router-flux";
/*
const testData = [
    {_id: "1", name:"Hothaifa", age: "22", distance: "6", imageSrc: guy1},
    {_id: "2", name:"Ibrahim", age: "30", distance: "16", imageSrc: guy1},
    {_id: "3", name:"Hothaifa", age: "32", distance: "35", imageSrc: guy1}
 ];*/

const sortGridItems = (td) => {
    const x =  td.map( (a,i) => ({key:i, el: a }));
    const result = [];
    for(var i=0; i<x.length; i+=2){	
	if( (i+1) < x.length)
   	    result.push([x[i].el, x[i+1].el]);  
	else
	    result.push([x[i].el])  
    }
    return result
}

export class MemberScreen extends React.Component{
    gymUserServices = new GymUserService();
    _ismounted = true;
    state={
	personData: [],
	loadComplete: false,
	isEmpty: false 
    }
    
    constructor(props){
	super(props);	
    }

    componentDidMount() {    
      this._ismounted = true;
    }

    componentWillUnmount() {
	this._ismounted = false;    
    }

    loadNeighbors = () => {
	this.gymUserServices.getNeighbors().then(response => {
	    if(this._ismounted)
		this.setState({loadComplete: true});
	    if(response.data.length == 0){
		console.log("No neighbours");
		if(this._ismounted)
		    this.setState({isEmpty: true});
	    }else{
		const sortedData = sortGridItems(response.data);
		if(this._ismounted)
		    this.setState({personData: sortedData, isEmpty: false});
	    }
	}).catch(err => console.error(err) )
    }

    handleViewProfile = (data) => {
	Actions.viewMember({data});
    }

    componentDidMount(){
	this.loadNeighbors();
    }
    
    render(){
	if(!this.state.loadComplete){
	    return(
		<Container>
		     <Spinner color='blue' />
		</Container>
	    );
	}if(this.state.isEmpty){
	    return(
		<Container style={{alignContent: "center", justifyContent: 'center', flex: 1}}>
			<View style={{alignContent: "center", justifyContent: 'center', flex: 1}}>
				<Text style={{marginLeft: 100}}>No neighbours nearby </Text>
			</View>			
		</Container>
	    );
	}else
	return(
	    <Container style={{flex:1}}>
			
		<Grid style={{flex:1}} size={1}>
			<ScrollView>
		    {
			this.state.personData.map( (row, rowIndex) =>
			    <Row style={styles.rowStyles} key={"cardRow_"+rowIndex}>
				{row.map( (data, colIndex) =>
				    <Col style={styles.colStyle} key={"cardCol_"+colIndex} >
					<MemberCard
					    {...data} key={data._id}
					    onPress={()=> {this.handleViewProfile(data)} }
					/>
				    </Col>				 
				)}
			    </Row>
			    
			)
		    }
			</ScrollView>
		</Grid>
	    </Container>
	);
    }
}

const styles = StyleSheet.create({
	colStyles: {
		backgroundColor: '#635DB7',
		height: 200,
		},
	rowStyles: {
		height: 270,
		marginTop:30
		}
});

export default MemberScreen;
