import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, View } from 'native-base';

const SignupScreen = ({navigation}) => {

    return (
      <Container>
        <Header />
        <Content>
            <View  style={styles.header}>
            <Text  style={styles.header1}>Sign Up </Text>
            </View>
          <Form >
            <Item align style={styles.text_header}>
              <Input placeholder="Fullname" />
            </Item>
            <Item align >
              <Input placeholder="Username" />
            </Item>
            <Item align >
              <Input placeholder="Password" />
            </Item>
            <Item align style={styles.text_footer}>
              <Input placeholder="Confirm Password" />
            </Item>
          </Form>

          <Button full warning>
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
