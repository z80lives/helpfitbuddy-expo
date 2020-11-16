import React from "react";
import {Card, Text, Container, Icon, Button} from "native-base";
import {Image, StyleSheet} from "react-native";

export const MemberCard = ({name, age, distance, imageSrc}) => (
    <Container>  	
	<Card style={styles.cardStyle}>
	    <Image style={styles.imageStyle} source={imageSrc}/>
	    <Button style={styles.floatingLikeButton}><Icon name="like" type="SimpleLineIcons" ></Icon></Button>
	    <Text style={styles.designText}>{name}, {age}</Text>
	    <Text style={styles.locationStyle}><Icon style={styles.locationStyle} name="location-pin" type="Entypo" />{distance} km</Text>
	</Card>

    </Container>
)

const styles = StyleSheet.create({
    cardStyle: {
	width: 200,
	height: 290, // this one for fixing the gap


    },
    locationStyle: {
	paddingTop:12,
	left: 15,
	color: "red",
	fontSize: 18,

    },
    floatingLikeButton: {
    justifyContent: 'center',
	position: "absolute",
	bottom: 45,
	right: 8,
	height: 55,
    width: 55,  //The Width must be the same as the height
    borderRadius: 110, //Then Make the Border Radius twice the size of width or Height   

	},
	designText:{
	left: 15,
	},
	imageStyle: {
		height: 200, 
		marginLeft:15,
		marginTop: 15, 
		width: 170, 
		marginBottom: 10, 
		borderWidth: 2, 
		borderColor: '#D3D3D3'
	}
});
