import React from "react";
import {Card, Text, Container, Icon, Button} from "native-base";
import {Image, StyleSheet} from "react-native";

export const MemberCard = ({name, age, distance, imageSrc}) => (
    <Container>  	
	<Card style={styles.cardStyle}>
	    <Image
		style={{height: 200, marginLeft: 20, marginTop: 15, width: 150}}
		source={imageSrc}	   
	    />
	    <Button rounded style={styles.floatingLikeButton}><Icon name="like2" type="AntDesign"></Icon></Button>
	    <Text>{name}, {age}</Text>
	    <Text style={styles.locationStyle}><Icon style={styles.locationStyle} name="location-pin" type="Entypo" />{distance} km</Text>
	</Card>

    </Container>
)

const styles = StyleSheet.create({
    cardStyle: {
	width: 200,
	height: 250 // this one for fixing the gap
    },
    locationStyle: {
	color: "red",
	fontSize: 18
    },
    floatingLikeButton: {
	position: "absolute",
	bottom: 20,
	right: 10
    }
});
