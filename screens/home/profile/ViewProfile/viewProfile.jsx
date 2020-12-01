import React from "react";
import { Container,  Content, Text, View, Icon, Card, H4 , Button, ToggleButton,
	 Spinner
       } from "native-base";
import { ImageBackground, StyleSheet } from "react-native";

import { connect } from "react-redux";

import { Col, Row, Grid } from "react-native-easy-grid";

import {Dimensions} from 'react-native';

import {EventServices} from "../../../../services/events.jsx";

export class ViewProfileScreen extends React.Component {
    eventServices = new EventServices();
    
    state={
	friendEvents:null
    }
    
    loadFriendEvents(){
	console.log("user", this.props.user._id);
	this.eventServices.getUserEvents(this.props.user._id)
	    .then(r => {
		console.log(r);
	    }).catch(console.error);
    }
    
    componentDidMount(){
	this.loadFriendEvents();
      //console.log("User data :", Object.keys(this.props));
      
    }
        
  render() {
    return (
	<Container>
	    <Content>
		<Grid height={Dimensions.get('window').height}>
		<Row size={3}>
		    <View style={{flex:1}}>			
			<ImageBackground
			    source={{ uri: this.props.user.image }}
			    style={styles.imageStyle}
			>
			    <FriendRequestButton
				friendMode={this.props.friendMode}
				isfriend={this.props.isfriend}
				friendRequestExists={this.props.friendRequestExists}
				sendFriendRequest={this.props.sendFriendRequest}
				style={{
				    position: "absolute",
				    right: 0,
				    bottom: 0

					}}
			    />
			</ImageBackground>

		    </View>
		</Row>
		
		<Row  size={1}>
		    
		    <Card style={{flex:1, overflow:"hidden"}}>
			<Text style={styles.textStyle}>{this.props.user.name}, 27</Text>
			<View style={{ flex:1, marginLeft: 20}} >
			    
			    <Text style={{fontSize: 15}}>
			    <Icon
				style={{ fontSize: 15, color: "#800080" }}
				name="world-o"
				type="Fontisto"
			    />
				{" "+this.props.user.country}
			</Text>
			
			    <Text style={{fontSize: 15}}>
			    <Icon
				style={{ fontSize: 15, color: "#800080" }}
				name="wallet-travel"
				type="MaterialCommunityIcons"
			    />
			    {" "+this.props.user.occupation}
			</Text>
			</View>
		    </Card>
		</Row>
	    
		<Row size={1}>
		    
		    <Card style={{flex: 1, overflow: "hidden"}}>
			<Text
			    style={{
				fontWeight: "bold",
				fontSize: 18,
			    }}
			>
			    <Icon
				style={{ fontSize: 15, color: "#800080" }}
				name="person"
				type="Fontisto"
			    />
			    {"  "}About Me
			</Text>
			<Text
			    style={{
				color: "gray",
				padding: 10
			    }}
			>
			    {this.props.user.bio}
			</Text>			
		    </Card>
		</Row>		

		</Grid>

		{!this.props.friendMode&&
		<View style={{minHeight: 100}}>
		    <Text>Friends</Text>
		
		     <Card style={{flex:1}}>
			 <Text>You have no friends</Text>
		     </Card>
		</View>
		}
	    
		<View style={{minHeight: 100, maxHeight: "50%"}}>
		    <Text>Interests</Text>
		    <Card style={{
			      flex:1,
			      flexDirection:'row',
				  flexWrap: 'wrap',
			      justifyContent: 'center',
			      alignItems: 'center'
			     
				  ,}}>
		{this.props.user.activities.map( interest => (
		    <InterestButton
			key={interest}
			label={interest}
		    />
		))}
			</Card>
	    </View>

		{this.props.isfriend &&
		<View style={{minHeight: 100}}>
		    <Card style={{flex:1}}>
			<Text>Events</Text>

			{this.state.friendEvents?<Text>Friend events</Text>:<View><Spinner/></View>}
		    </Card>
		</View>
		}
	    </Content>

	</Container>
    );
  }
}

const FriendEventCard = (props) => (
    <View><Text>Friend Event Card Here </Text></View>
)

const InterestButton = ({key, label}) => 
    <View
	style={{
	    margin:5,
	    justifyContent: 'center',
	    alignItems: 'center'
	}}
	key={key}
    >
	<Button
	    key={"tb"+key}
	    disabled
	>
	    <Text>{label}</Text>
	</Button>
	    
    </View>
;

const FriendRequestButton = ({friendMode, isfriend, friendRequestExists, sendFriendRequest, style}) => (
    <View style={style}>{friendMode && !isfriend &&	
       <Button disabled={friendRequestExists}
	       onPress={sendFriendRequest}
       ><Text>{friendRequestExists?
		  "Friend Request Pending"
		  :"Send Friend Request"}</Text>
       </Button>       
      }</View>);

const mapStateToProps = ({ authReducer }) => ({
  user: authReducer.user,
});

export default connect(mapStateToProps, {})(ViewProfileScreen);

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: "gray",
    resizeMode: "stretch",
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
	marginTop: 20,
	marginBottom: 10,
    left: 10,
  },
  textStyle1: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    left: 10,
  },
});
