import React from "react";
import {Container, Text,Tabs, Tab, Thumbnail,
	ListItem, List, Left, Body, Right, Button,
	View
       } from "native-base";
import { Actions } from "react-native-router-flux";

import FriendList from "../../friendlist.jsx";

var guy1 = require ('../../../res/guy1.jpeg');

const ChatPerson = ({img, name, msg}) => (
    <ListItem key={1} thumbnail button={true} onPress={()=>Actions.chatwindow()}>
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
    render(){
        return(
            <Container>
                  <List>
                   <ChatPerson 
                    name={"Ibrahim"}
                    img={guy1}
                    msg={"Hello, would you like to join me for a jog?"}
                   />
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
