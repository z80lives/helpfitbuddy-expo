import React from "react";
import {Container, Text, Grid, Col, Row} from "native-base";
import {StyleSheet} from "react-native";


import {MemberCard} from "./membercard.jsx";
var guy1 = require ('../../../res/guy1.jpeg');

import {GymUserService} from "../../../services/gymuser.js";

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
    state={
	personData: [],
	loadComplete: false,
	isEmpty: false 
    }
    
    constructor(props){
	super(props);	
    }

    loadNeighbors = () => {
	this.gymUserServices.getNeighbors().then(response => {
	    this.setState({loadComplete: true});
	    if(response.data.length == 0){
		console.log("No neighbours");
		this.setState({isEmpty: true});
	    }else{
		const sortedData = sortGridItems(response.data);	    
		this.setState({personData: sortedData});
		this.setState({isEmpty: false});
	    }
	})
    }

    componentDidMount(){
	this.loadNeighbors();
    }
    
    render(){
	if(!this.state.loadComplete){
	    return(
		<Container>
		    <Text>Loading</Text>
		</Container>
	    );
	}if(this.state.isEmpty){
	    return(
		<Container>
		    <Text>No neighbours nearby </Text>
		</Container>
	    );
	}else
	return(
	    <Container>
		<Grid>
		    {
			this.state.personData.map( (row, rowIndex) =>
			    <Row style={styles.rowStyles} key={"cardRow_"+rowIndex}>
				{row.map( (data, colIndex) =>
				    <Col style={styles.colStyle} key={"cardCol_"+colIndex} >
					<MemberCard {...data} key={data._id} />
				    </Col>				 
				)}
			    </Row>
			    
			)
		    }
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
