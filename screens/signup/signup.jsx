import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  View,
  DatePicker,
  Picker,
  Switch,
  Label,
  Separator,
  Textarea,
  Icon,
  Toast,
} from "native-base";
import { AuthService } from "../../services/auth.js";

import { Actions, ActionConst } from "react-native-router-flux";

import CountryList from "../../res/countries.json";

class SignupScreen extends Component {
  authServices = new AuthService();

  state = {
    name: "",
    username: "",
    password: "",
    password2: "",
    occupation: "",
    bio: "",
    country: undefined,
    dob: new Date(),
	isAdmin: false,
	errorMessage: null
  };

  makeToast(msg) {
    Toast.show({
      text: msg,
      position: "bottom",
      duration: 3000,
    });
  }

  handleSignup = () => {
    const {
      name,
      username,
      password,
      password2,
      dob,
      country,
      bio,
      occupation,
    } = this.state;

    console.log("dsada", password, password2);
    if (password != password2) {
      this.makeToast("Password is not match");
      return;
    }

    //api call
    this.authServices.register(
    	name,
    	username,
    	password,
    	dob,
    	this.state.isAdmin?"gymadmin":"gymuser",
    	country,
    	occupation,
    	bio
    ).then(response => {
		console.log("signup response", response);
		this.makeToast(response.message);		
    	Actions.login();
    }).catch(err => {
		this.makeToast("Cannot create user"); //not working
		this.setState({errorMessage: "Cannot create user"})
		console.log("Ërror", err);
	});
  };

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <View style={styles.header}>
            <Text style={styles.header1}>Sign Up </Text>
          </View>
          <Form>
            <Separator bordered>
              <Text style={styles.seperatorTextStyle}> Personal</Text>
            </Separator>
            <Item
              align
              style={styles.text_header}
              error={this.state.name.length == 0}
            >
              <Input
                placeholder="Fullname"
                value={this.state.name}
                onChangeText={(val) => {
                  this.setState({ name: val });
                }}
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
                onDateChange={(newDate) => {
                  this.setState({ dob: newDate });
                }}
                disabled={false}
              />
            </Item>

            <Separator bordered>
              <Text style={styles.seperatorTextStyle}> Credentials</Text>
            </Separator>

            <Item align error={this.state.username.length == 0}>
              <Input
                placeholder="Username"
                value={this.state.username}
                onChangeText={(val) => {
                  this.setState({ username: val });
                }}
              />
            </Item>

            <Item align error={this.state.password.length == 0}>
              <Input
                placeholder="Password"
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
              />
            </Item>
            <Item
              align
              error={
                this.state.password2.length == 0 ||
                this.state.password != this.state.password2
              }
            >
              <Input
                placeholder="Confirm Password"
                value={this.state.password2}
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ password2: val });
                }}
              />
			  
            </Item>
			{
				this.state.password2 != this.state.password &&
				<Text style={{fontSize: 12, marginLeft: 15, color: "red"}}>Password do not match</Text>
  			}

            <Item align stackedLabel>
              <Label>Gym Adminstrator</Label>
              <Switch
                value={this.state.isAdmin}
                onValueChange={() => {
                  this.setState({ isAdmin: !this.state.isAdmin });
                }}
              />
            </Item>

            <Separator bordered>
              <Text style={styles.seperatorTextStyle}> About</Text>
            </Separator>

            <Item align error={this.state.occupation.length == 0}>
              <Input
                placeholder="Occupation"
                value={this.state.occupation}
                onChangeText={(val) => {
                  this.setState({ occupation: val });
                }}
              />
            </Item>

            <Item align style={{ margin: 4 }}>
              <Textarea
                style={{ flex: 0.9 }}
                rowSpan={5}
                bordered
                placeholder="Write about yourself"
                value={this.state.bio}
                onChangeText={(val) => {
                  this.setState({ bio: val });
                }}
              />
            </Item>

            <Item align style={styles.text_footer}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select your Country"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={this.state.country}
                onValueChange={(value) => {
                  this.setState({ country: value });
                }}
              >
                {CountryList.map((c, i) => (
                  <Picker.Item
                    value={c.name}
                    label={c.name}
                    key={"key_" + c.code}
                  />
                ))}
              </Picker>
            </Item>
          </Form>

		{this.state.errorMessage &&
		  <View>
				<Text>{this.state.errorMessage}</Text>
		  </View>
  		}

          <Button full warning onPress={this.handleSignup}>
            <Text> Sign Up </Text>
          </Button>

          <View style={styles.text_account}>
            <Button
              transparent
              light
              onPress={() => navigation.navigate("login")}
            >
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
    backgroundColor: "#ffff",
  },
  header: {
    flex: 1,
    paddingTop: 80,
    alignSelf: "center",
    textDecorationLine: "underline",
  },

  seperatorTextStyle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  header1: {
    fontWeight: "bold",
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
    alignSelf: "center",
    paddingTop: 155,
  },
});
