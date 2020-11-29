import React from "react";

import { Container, View, Text,
	 H1,
	 H2,
	 H3,
	 H4,
	 Card,
	 Item,
	 Button
       } from 'native-base';

import { StyleSheet, Image } from "react-native";

import { connect } from "react-redux";

import { Col, Row, Grid } from "react-native-easy-grid";

import MapView from 'react-native-maps';

import {
  LineChart,
    BarChart,
    StackedBarChart
} from "react-native-chart-kit";

const ldata = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Visitors"] // optional
};

const bdata = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
	data: [40, 45, 28, 80, 99, 33],
	strokeWidth: 1,
	color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 	
    }
  ]
};

const chartConfig = {
      backgroundColor: "#fefefe",
      backgroundGradientFrom: "#fefef0",
      backgroundGradientTo: "#fffefe",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      },
    label: {}
};

const barChartConfig= {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16,
	paddingRight: 0
    },
};

import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get("window").width;


export class ViewGymScreen  extends React.Component {
    state={
	initialRegion:{
	    latitude: 3.20623,
	    longitude: 101.58084,
	    latitudeDelta: 0.0922,
	    longitudeDelta: 0.0421
	},
	gymPosition: null
    }
    componentDidMount(){
	if(this.props.gym){
	const {latitude, longitude} = this.props.gym.location;
	this.setState({
	    gymPosition: {
		latitude: parseFloat(latitude),		
		longitude: parseFloat(longitude)
	    }
	});
	}
    }
    render(){
	if(!this.props.gym){
	    return (<View></View>);
	}else
	return(
	    <Container>
		<Grid>
		    
		{/** GYM NAME **/}
		<Row style={{backgroundColor: "purple"}}  size={1}>
		    <View style={{alignItems: "center", justifyContent: "center", paddingLeft: 20}}>
			<H1 style={styles.gymHeadingText}>{this.props.gym.name}</H1>
			<H3 style={styles.gymHeadingText}>Open time: {this.props.gym.openTime}</H3>
			<H3 style={styles.gymHeadingText}>Close time: {this.props.gym.closeTime}</H3>
			<View>
			<Button>
			    <Text>Create Event</Text>
			</Button>
			</View>
		    </View>
		</Row>


		    <Row size={4} >
			<Grid>
			    <Row>
				<Card style={{flex: 1}}>
				    <Text>Map</Text>
				    <MapView				
					style={{
					    width: "100%",
					    height: 220,
					}}
					showUserLocation={true}
					initialRegion={this.state.initialRegion}
				    >
					{this.state.gymPosition &&
					<MapView.Marker					    
					    coordinate={this.state.gymPosition}
					    title={this.props.gym.name}
					/>
					}
				    </MapView>

				</Card>
			    </Row>
			    <Row>
				<Card style={{height:220}}>
				    <Text>Customer Statistics</Text>
				    <LineChart
					data={ldata}
					width={screenWidth}
					height={220}
					chartConfig={chartConfig}
				    />
				</Card>
			    </Row>
			    <Row>
				<Card style={{flex:1}}>
				    <Text>Activity Statistics</Text>
				    <LineChart
					data={bdata}
					width={screenWidth}
					height={220}
					chartConfig={chartConfig}
				    />
				</Card>
			    </Row>
			</Grid>
		</Row>
	    </Grid>
	    </Container>
	);
    }
}

const styles = StyleSheet.create({
    gymHeadingText: {
	color: "#f0e0f0"
    }
});

export default ViewGymScreen;
