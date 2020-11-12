import React from "react";
import {Container, Text, Grid, Col, Row} from "native-base";
import {StyleSheet} from "react-native";


import {MemberCard} from "./membercard.jsx";
var guy1 = require ('../../../res/guy1.jpeg');

const testData = [
    {name:"Hothaifa", age: "22", distance: "6", imageSrc: guy1},
    {name:"Ibrahim", age: "30", distance: "16", imageSrc: guy1},
    {name:"Hothaifa", age: "32", distance: "35", imageSrc: guy1}
];

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
    state={
	personData: []
    }
    
    constructor(props){
	super(props);	
    }

    componentDidMount(){
	const sortedData  = sortGridItems(testData);
	this.setState({personData: sortedData});
    }
    
    render(){
	return(
	    <Container>
		<Grid>
		    {
			this.state.personData.map( row =>
			    <Row style={styles.rowStyles}>
				{row.map(data =>
				    <Col style={styles.colStyle} >
					<MemberCard {...data} />
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
	height: 200
    },
    rowStyles: {
	height: 270
    }
});

export default MemberScreen;
