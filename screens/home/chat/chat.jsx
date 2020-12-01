import React from "react";
import {Container, Text,Tabs, Tab, Thumbnail,
	ListItem, List, Left, Body, Right, Button,
	View
       } from "native-base";
import { Actions } from "react-native-router-flux";

import FriendList from "../../friendlist.jsx";

import {FriendServices} from "../../../services/friends.jsx"
var guy1 = require ('../../../res/blank.png');

const conversations = [];

const ChatPerson = ({img, name, msg, _id}) => (
    <ListItem key={1} thumbnail button={true} onPress={()=>Actions.chatwindow({other_user_id: _id})}>
    <Left>
        <Thumbnail square source={img} />
    </Left>
    <Body>
        <Text>{name}</Text>
        <Text note numberOfLines={1}>{msg}</Text>
    </Body>
    <Right>
        <Button  transparent>
        <Text>Reply</Text>
        </Button>
    </Right>
    </ListItem>
);


export class ChatScreen extends React.Component{
    friendServices = new FriendServices();
    loadFriends(){
	this.friendServices.getFriendList().then(r => {
	    this.setState({friends: r.friends});
	}).catch(console.error);
    }
    componentDidMount(){
	this.loadFriends();
    }
    state={
	friends: null
    }
    render(){
        return(
            <Container>
                <List>
		    {this.state.friends &&
		     this.state.friends.map( user => 
			<ChatPerson 
			    name={user.name}
			    img={guy1}
			    msg={""}
			    _id={user._id}
			/>
		    )
		    }
                </List>
            </Container>
        )
    }
}


export class FriendView extends React.Component{
    render(){
	return(
	    <Container>
		<Tabs>
		    <Tab heading="Chat">
			<ChatScreen />
		    </Tab>
		    <Tab heading="Friends">
			<FriendList />
		    </Tab>
		</Tabs>
	    </Container>
	)
    }
}

export default FriendView;
