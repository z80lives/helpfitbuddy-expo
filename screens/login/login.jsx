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
  Toast,
  Root,
  Spinner,
  Icon,
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import { connect } from "react-redux";
import { auth } from "../../redux/actions/auth";

import { AuthService } from "../../services/auth.js";

class LoginScreen extends Component {
    authServices = new AuthService();
    _ismounted = true;
  state = {
    username: "shath",
    password: "1234",
    loginLoading: false,
    loginMessage: null,
  };

  authRedirect = () => {
    if (this.props.isAuthenticated) {
      Actions.home({ type: ActionConst.RESET });
    }
  };

  componentDidMount() {
      this.authRedirect();
      this._ismounted = true;
  }

 
    componentWillUnmount() {
	this._ismounted = false;
    	Toast.toastInstance = null;
    }

  componentDidUpdate() {
    this.authRedirect();
  }
  makeToast(msg) {
    Toast.show({
      text: msg,
      position: "bottom",
      duration: 3000,
    });
  }

  clickLogin = () => {
    this.setState({ loginLoading: true });  //disable button for loading
    const validUsername = this.state.username.length > 0;
    const validPassword = this.state.password.length > 0;

    if (validUsername && validPassword) {
      this.authServices
        .login(this.state.username, this.state.password)
        .then((response) => {
          if (response.token != null) {
            this.authServices.setToken(response.token);
            this.authServices
              .loginState()
              .then((r) => {
                console.log("Login state", r);
                  this.makeToast(r.message);
		  if(this._ismounted)
                      this.setState({ loginLoading: false });
                this.props.loginAction(r.user, response.token);
              })
              .catch((msg, err) => {
                this.makeToast(msg);
                console.log("Failed", this.state.username);                
                  this.props.logoutAction();
		  if(this._ismounted)
                      this.setState({ loginLoading: false, loginMessage: msg });
                this.makeToast(msg);
              });
          } else {
            this.setState({
              loginLoading: false,
              loginMessage: "Server Error:Token not recieved",
            });
          }

          //this.authServices.setToken(response.token);
        })

        .catch((msg, err, r) => {
          //console.error("Login Failed:", msg);
          //console.error("Error", msg);
            //console.error("Error", msg, err, r);
	    if(this._ismounted)
		this.setState({ loginLoading: false, loginMessage: msg });
          this.makeToast(msg);
        });
    } else {
      if (!validUsername) {
        this.makeToast("Username cannot be  empty");
        this.setState({ loginLoading: false });
      }
      if (!validPassword) {
        this.makeToast("Password cannot be empty.")
        this.setState({ loginLoading: false });
      }
    }
    //this.authRedirect();
  };


  render() {
    return (
      <Root>
        <Container>
          <Header />
          <Content>
            <View style={styles.header}>
              <Text style={styles.header1}>Login </Text>
            </View>

            <Form>
              <Item
                regular
                style={styles.text_header}
                error={this.state.username.length == 0}
              >
                <Input
                  placeholder="Username"
                  value={this.state.username}
                  onChangeText={(val) => {
                    this.setState({ username: val });
                  }}
                />

                {this.state.username.length ===0 &&
                <Icon name="close-circle" />
                  }
                
              </Item>
              <Item
                regular
                style={styles.text_footer}
                error={this.state.password.length == 0}
              >
                <Input
                  placeholder="Password"
                  textContentType="password"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={(val) => {
                    this.setState({ password: val });
                  }}
                />
                {this.state.password.length ===0 &&
                <Icon name="close-circle" />
                  }
              </Item>
            </Form>

            <Button
              full
              warning
              style={{ width: 380, left: 17, borderRadius: 5 }}
              onPress={this.clickLogin}
              disabled={this.state.loginLoading}
            >
              {this.state.loginLoading ? <Spinner /> : <Text> Login </Text>}
            </Button>

            {this.state.loginMessage ? (
              <View>
                <Text style={styles.text_warning}>
                  {this.state.loginMessage}
                </Text>
              </View>
            ) : (
              <></>
            )}

            <View style={styles.text_account}>
              <Button transparent light onPress={() => Actions.signup()}>
                <Text>Register new account</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </Root>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  isAuthenticated: authReducer.isAuthenticated,
  isLoading: authReducer.isLoading,
  token: authReducer.token,
});

export default connect(mapStateToProps, { ...auth })(LoginScreen);

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

  header1: {
    fontWeight: "bold",
    fontSize: 40,
  },

  text_header: {
    flex: 1,
    width: 399,
    left: 8,
    marginTop: 30,
  },

  text_warning: {
    alignSelf: "center",
    paddingTop: 10,
    color: "#c0c0c0",
    fontSize: 12,
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
    alignSelf: "center",
    paddingTop: 250,
    //top: 10
  },
});
