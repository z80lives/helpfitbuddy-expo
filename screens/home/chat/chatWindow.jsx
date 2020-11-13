import React, {Component} from "react";
import {Container, Text} from "native-base";

const ChatDataSample = [
    {
	type: "to",
	msg: "Hello"
    }
];

export class ChatWindow extends Component{
    render(){
        return(
            <Container>
                <Text>Chat window Screen here</Text>
            </Container>
        )
    }
}

export default ChatWindow;
