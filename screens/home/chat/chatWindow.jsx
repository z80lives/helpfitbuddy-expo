import React, {Component} from "react";
import {Container, Text, View,
	Card,
	Button,
	Input,
	ScrollView,
	Content,
	Item
       } from "native-base";

import { StyleSheet } from "react-native";
import {MessagingServices} from "../../../services/messaging.jsx"

/*const ChatDataSample = [
    {
	type: "to",
	msg: "Hello"
    }
    ];*/
import { Dimensions } from "react-native";

export class ChatWindow extends Component{
    messagingServices = new MessagingServices();
    state = {
	thread: null,
	message: "",
	timer:null
    };

    
    componentDidMount(){

    }
   
    componentDidMount() {
	this.loadThread();
	let timer = setInterval(this.refresh, 1000*3);
	this.setState({timer});
    }

    componentWillUnmount() {
	clearInterval(this.state.timer);
    }


    refresh = async () => {
	console.log("Refreshing feed");
	await this.loadThread();
    }
    
    loadThread(){
	this.messagingServices.getMessageThread(
	    this.props.other_user_id
	).then(r => {
	    this.setState({thread: r.data.messages})
	}).catch(console.error);	
    }

    handleSend= ()=>{
	if(this.state.message.length == 0)
	    return;
	this.messagingServices.sendMessage(
	    this.props.other_user_id,
	    this.state.message
	).then( r => {
	    this.setState({"message": ""});
	    this.loadThread();
	}).catch(console.error);
    }

    _handleKeyDown= (e) => {
	if (e.key === 'Enter') {
	    this.handleSend();
	}
    }
    
    
    render(){
	if(this.state.thread==null)return (<View></View>);
        return(
            <Container>
		<View style={{height: "90%", backgroundColor:"#cecece"}}>
		{this.state.thread.map(msg => (
		    <Card style={
			      this.props.other_user_id == msg.sender?
				  styles.senderCardStyle :
				  styles.receiverCardStyle
			  }>
			<Text>{msg.message}</Text>
		    </Card>
		))
		}
		</View>
		
		<Item
                    regular
		>
		    <Input
			placeholder="message"
			value={this.state.message}
			onChangeText={(val) => {
			    this.setState({ message: val });
			}}
			onKeyDown={this._handleKeyDown}
                    />

		    <Button
			onPress={this.handleSend}
			style={{alignSelf: "flex-end"}}><Text>Send</Text></Button>
		</Item>		
		
            </Container>
        )
    }
}

export default ChatWindow;

const styles = StyleSheet.create({
    senderCardStyle:{
	minHeight: 50,
	padding: 10,
	backgroundColor: "#aeaecc",
	width: "50%",
	alignSelf: "flex-end"
    },
    receiverCardStyle:{
	minHeight: 50,
	width: "50%",
	padding: 10,
	backgroundColor: "#efefef"
    }
});

