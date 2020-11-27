import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, View, DatePicker, Switch, Label } from 'native-base';
import {AuthService} from "../../services/auth.js";

import {Actions, ActionConst} from "react-native-router-flux";

class SignupScreen extends Component{
    authServices = new AuthService();
    state = {
	name:"John Doe",
	username:"jdoe",
	password:"123",
	password2:"123",
	dob: new Date(),
	isAdmin: false
    }

    handleSignup = () => {
	console.log("Signing up", this.state);
	const {name, username, password, dob} = this.state;
	this.authServices.register(
	    name,
	    username,
	    password,
	    dob,
	    this.state.isAdmin?"gymadmin":"gymuser"
	).then(response => {
	    console.log("signup response", response);
	    Actions.login();	    
	});
    }

    render(){
	return (
	    <Container>
		<Header />
		<Content>
		    <View  style={styles.header}>
			<Text  style={styles.header1}>Sign Up </Text>
		    </View>
		    <Form >
			<Item align style={styles.text_header}>
			    <Input placeholder="Fullname"
				   value={this.state.name}
				   onChangeText={ val => {this.setState({name: val}) }}
			    />
			</Item>
			<Item align >
			    <Input placeholder="Username"
				   value={this.state.username}
				   onChangeText={ val => {this.setState({username: val}) }}
			    />
			</Item>
			
			<Item align>
			    <DatePicker
				defaultDate={new Date(1995, 4, 4)}
				minimumDate={new Date(1900, 1, 1)}
				maximumDate={new Date(2018, 12, 31)}
				locale={"en"}
				timeZoneOffsetInMinutes={undefined}
				modalTransparent={false}
				animationType={"fade"}
				androidMode={"default"}
				placeHolderText="Date of Birth"
				textStyle={{ color: "green" }}
				placeHolderTextStyle={{ color: "#d3d3d3" }}
				onDateChange={(newDate) => {this.setState({dob: newDate})}}
				disabled={false}
			    />

			</Item>

			<Item align stackedLabel>
			    <Label>Gym Adminstrator</Label>
			    <Switch value={this.state.isAdmin} onValueChange = {() => {this.setState({isAdmin: !this.state.isAdmin})} } />
			</Item>


			<Item align >
			    <Input placeholder="Password"
				   value={this.state.password}
				   secureTextEntry={true}
				   onChangeText={ val => {this.setState({password: val}) }}
			    />
			</Item>
			<Item align style={styles.text_footer}>
			    <Input placeholder="Confirm Password"
				   value={this.state.password2}
				   secureTextEntry={true}
				   onChangeText={ val => {this.setState({password2: val}) }}

			    />
			</Item>			
		    </Form>

		    <Button full warning onPress={this.handleSignup}>
			<Text> Sign Up </Text>
		    </Button>

		    <View style={styles.text_account}> 
			<Button transparent light
				onPress={() => navigation.navigate('login')}>
			    <Text>I have an account</Text>
			</Button>
			
		    </View>
		    
		</Content>
	    </Container>
	);
    }

}
export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
        
    },
    header: {
        flex: 1,
        paddingTop: 80,
        alignSelf: 'center',
        textDecorationLine: 'underline',
        
    },

    header1: {
      fontWeight: 'bold',
      fontSize: 40,
     
    },

    text_header: {
        flex: 1,
        marginTop: 30,
    },

    text_footer: {
        flex: 1,
        marginBottom: 35,
    },

    text_account: {
        flex: 1,
        alignSelf: 'center',
        paddingTop: 155,
    }
    
});
