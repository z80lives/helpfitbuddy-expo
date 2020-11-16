import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import {Actions, ActionConst} from "react-native-router-flux";
import {connect} from 'react-redux';

const LoginScreen = ({navigation}) => {
  
    return (
      <Container>
        <Header />
        <Content>
            <View  style={styles.header}>
            <Text  style={styles.header1}>Login </Text>
            </View>
          <Form >
            <Item regular style={styles.text_header}>
              <Input placeholder="Username" />
            </Item>
            <Item regular style={styles.text_footer}>
              <Input placeholder="Password" />
            </Item>
          </Form>

            <Button full warning style={{width:380, left: 17, borderRadius: 5}} onPress={()=> Actions.home()}>
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
        width: 399,
        left: 8,
        marginTop: 30,
    },

    text_footer: {
        flex: 1,
        width: 399,
        left: 8,
        marginTop: 10,
        marginBottom: 35,
    },

    text_account: {
        flex: 1,
        alignSelf: 'center',
        paddingTop: 250,
    }
    
});
