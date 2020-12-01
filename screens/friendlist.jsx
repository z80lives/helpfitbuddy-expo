import React from "react";
import {Container, Text,Tabs, Tab, Thumbnail,
	ListItem, List, Left, Body, Right, Button,
	View
       } from "native-base";
import { Actions } from "react-native-router-flux";

import {FriendServices} from "../services/friends.jsx"

var guy1 = require ('../res/blank.png');

class FriendList extends React.Component{
    friendServices = new FriendServices();
    state = {
	friends: null
    }
    loadFriends(){
	this.friendServices.getFriendList().then(r => {
	    this.setState({friends: r.friends});
	}).catch(console.error);
    }
    componentDidMount(){
	this.loadFriends();
    }

    clickView=(data)=>{
	Actions.viewMember({data});
    }
    
    render(){
	if(this.state.friends==null){
	    return (<View></View>);
	}else{
	return (
	<Container>
	    <List>
		{this.state.friends.map(user => 
		    <FriendListItem
			{...user}
			onPress={()=>this.clickView(user)}
		    />
		)}
	    </List>
	</Container>
	);
	}
    }
}

export default FriendList;

const FriendListItem = ({img, name, age, country, onPress}) => (
    <ListItem thumbnail>
        <Left>
            <Thumbnail square source={img==null?guy1:img} />
        </Left>
        <Body>
            <Text>{name}</Text>
            <Text note numberOfLines={1}>{age}, {country} .</Text>
        </Body>
        <Right>
            <Button onPress={onPress} transparent>
                <Text>View</Text>
            </Button>
        </Right>
    </ListItem>
);

