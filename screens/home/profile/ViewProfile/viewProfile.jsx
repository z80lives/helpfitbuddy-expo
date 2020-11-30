import React from "react";
import { Container,  Text, View, Icon, Card, H4 , Button} from "native-base";
import { Image, StyleSheet } from "react-native";

import { connect } from "react-redux";

import { Col, Row, Grid } from "react-native-easy-grid";

export class ViewProfileScreen extends React.Component {
  componentDidMount() {
    console.log("User data :", this.props.user);
  }
  render() {
    return (
	<Container>
            <Grid >
		<Row size={3}>
		    <View style={{flex:1}}>
			<Image
			    source={{ uri: this.props.user.image }}
			    style={styles.imageStyle}
			/>
		    </View>
		</Row>
		
		<Row  size={1}>
		    <View>
		    <Text style={styles.textStyle}>{this.props.user.name}, 27</Text>
		    <View style={{ flex:1}} >
			<Text>
			    <Icon
				style={{ fontSize: 15, color: "#800080" }}
				name="world-o"
				type="Fontisto"
			    />
			    {this.props.user.country}
			</Text>
			
			<Text>
			    <Icon
				style={{ fontSize: 15, color: "#800080" }}
				name="wallet-travel"
				type="MaterialCommunityIcons"
			    />
			    {this.props.user.occupation}
			</Text>
		    </View>
		    </View>
		</Row>
	    
		<Row size={1}>
		    
		    <View>
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
			    About Me
			</Text>
			<Text
			    style={{
				color: "gray",
			    }}
			>
			    {this.props.user.bio}
			</Text>			
		    </View>
		</Row>		

		<Row size={1.7}>

		    {!this.props.friendMode&&
		    <Card style={{flex:1}}>
			<Text>You have no friends</Text>
		    </Card>
		    }
		    
		    {this.props.friendMode && !this.props.notFriend &&
		     <Card style={{flex:1}}>
			 <Button disabled={this.props.friendRequestExists}
				 onPress={this.props.sendFriendRequest}
			 >
			     
			 <Text>{this.props.friendRequestExists?
			      "Friend Request Pending"
			      :"Send Friend Request"}</Text>
		     </Button>
		     </Card>
		    }
		     
		</Row>
		
            </Grid>
	</Container>
    );
  }
}

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
    left: 10,
  },
  textStyle1: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    left: 10,
  },
});
