import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import {Actions, ActionConst} from "react-native-router-flux";
import {connect} from 'react-redux';

import {auth} from "../../redux/actions/auth";

class LoginScreen extends Component {

    redirectAuthentication = () => {
	if (this.props.isAuthenticated) {
	    Actions.home({"type": ActionConst.RESET});
	}
    }

    onClickLogin = () => {
	this.props.loginAction("person1");
	this.redirectAuthentication();
    }

    componentDidUpdate() {
	this.redirectAuthentication();
    }
    
    componentDidMount(){
	this.redirectAuthentication(); 
    }


    render(){
	if(!this.props.isAuthenticated){
	    return (
		<Container>
		    <Header />
		    <Content>
			<View  style={styles.header}>
			    <Text  style={styles.header1}>Login </Text>
			</View>
			<Form >
			    <Item align style={styles.text_header}>
				<Input placeholder="Username" />
			    </Item>
			    <Item align style={styles.text_footer}>
				<Input placeholder="Password"  secureTextEntry/>
			    </Item>
			</Form>
			
			<Button full warning onPress={this.onClickLogin}>
			<Text> Login </Text>
			</Button>
			
			<View style={styles.text_account}> 
			    <Button transparent light
				    onPress={() => Actions.signup()}>
				<Text>Register new account</Text>
			    </Button>
			    
			</View>
			
		    </Content>
		</Container>
	    );
	}else{
	    return (<Container><Text>Please wait</Text></Container>);
	}
    }
  }

const mapStateToProps = ({authReducer}) => ({
  isAuthenticated: authReducer.isAuthenticated,
  isLoading: authReducer.isLoading,
});

export default connect(mapStateToProps, {...auth})(LoginScreen);

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
        marginTop: 10,
        marginBottom: 35,
    },

    text_account: {
        flex: 1,
        alignSelf: 'center',
        paddingTop: 250,
    }
    
});
