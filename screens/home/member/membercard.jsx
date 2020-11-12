import React from "react";
import {Card, Text, Container, Icon, Button} from "native-base";
import {Image, StyleSheet} from "react-native";

export const MemberCard = ({name, age, distance, imageSrc}) => (
    <Container>  	
	<Card style={styles.cardStyle}>
	    <Image
		style={{height: 200, width: 100}}
		source={imageSrc}	   
	    />
	    <Button style={styles.floatingLikeButton}><Icon name="like" type="SimpleLineIcons"></Icon></Button>
	    <Text>{name}, {age}</Text>
	    <Text style={styles.locationStyle}><Icon style={styles.locationStyle} name="location-pin" type="Entypo" />{distance} km</Text>
	</Card>

    </Container>
)

const styles = StyleSheet.create({
    cardStyle: {
	width: 200,
	height: 250
    },
    locationStyle: {
	color: "red",
	fontSize: 18
    },
    floatingLikeButton: {
	position: "absolute",
	bottom: 10,
	right: 10
    }
});
