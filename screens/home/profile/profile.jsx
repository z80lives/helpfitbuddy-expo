import React from "react";
import { StyleSheet, Image } from "react-native";
import {
  Container,
  Text,
  Button,
  Icon,
  Card,
  View,
  Content,
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { auth } from "../../../redux/actions/auth";

import { Col, Row, Grid } from "react-native-easy-grid";

export class ProfileScreen extends React.Component {
  clickLogout = () => {
    console.log("Logout action called");
    this.props.logoutAction();
  };

  componentDidMount() {}

  render() {
    return (
      <Container>
        <Grid>
          <Row size={1.5}>
            <Grid style={{ borderRadius: 2, elevation: 2 }}>
              <Row>
                <Col
                  style={{ justifyContent: "center", paddingLeft: 10 }}
                  size={1}
                >
                  <Button style={styles.thumbnailButton}>
                    {!this.props.user.image ? (
                      <Icon name="person" type="Octicons" />
                    ) : (
                      <Image
                        source={{ uri: this.props.user.image }}
                        style={{
                          resizeMode: "stretch",
                          width: 120,
                          height: 120,
                          borderRadius: 110,
                          overflow: "hidden",
                        }}
                      />
                    )}
                  </Button>
                </Col>

                <Col size={2} style={{ justifyContent: "center" }}>
                  <Text>{this.props.user.name}</Text>
                  <Text style={styles.typeNameStyle}>
                    {this.props.user.type}
                  </Text>
                  <Button
                    style={{
                      marginTop: 20,
                      backgroundColor: "white",
                      width: 180,
                      borderWidth: 2,
                      borderColor: "#800080",
                    }}
                    rounded
                    onPress={() => Actions.viewProfile()}
                  >
                    <Text style={{ color: "#8B008B", left: 25 }}>
                      View Profile
                    </Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Row>

          <Row size={3}>
            <Grid style={{ elevation: 5 }}>
              <Row size={1}>
                <Col style={{ justifyContent: "center", alignItems: "center" }}>
                  <View>
                    <Button style={styles.circleButton1}>
                      <Icon
                        style={styles.iconStyle1}
                        name="share"
                        type="Fontisto"
                      />
                    </Button>
                    <Text style={{ left: 20, top: 10 }}>Share</Text>
                  </View>
                </Col>
                <Col style={{ justifyContent: "center", alignItems: "center" }}>
                  <View>
                    <Button
                      style={styles.circleButton3}
                      onPress={() => Actions.setting()}
                    >
                      <Icon
                        style={styles.iconStyle2}
                        name="settings"
                        type="SimpleLineIcons"
                      />
                    </Button>
                    <Text style={{ left: 5, top: 10 }}>Edit Profile</Text>
                  </View>
                </Col>
              </Row>

              <Row size={1}>
                <Col style={{ justifyContent: "center", alignItems: "center" }}>
                  <View>
                    <Button style={styles.circleButton4}>
                      <Icon
                        style={styles.iconStyle4}
                        name="star"
                        type="Fontisto"
                      />
                    </Button>
                    <Text style={{ left: 15, top: 10 }}>Settings</Text>
                  </View>
                </Col>

                <Col style={{ justifyContent: "center", alignItems: "center" }}>
                  {this.props.user.type == "gymadmin" && (
                    <View>
                      <Button
                        style={styles.circleButton2}
                        onPress={() => {
                          Actions.addGym();
                        }}
                      >
                        <Icon
                          style={styles.iconStyle}
                          name="pencil-alt"
                          type="FontAwesome5"
                        />
                      </Button>

                      <Text style={{ left: 5, top: 10 }}>Manage Gym</Text>
                    </View>
                  )}
                </Col>
              </Row>
            </Grid>
          </Row>
        </Grid>
        <Card style={styles.bottomCard}>
          <Row style={{ justifyContent: "center" }}>
            <Button
              style={
                (styles.logoutButtonStyle,
                {
                  width: "80%",
                  color: "red",
                  backgroundColor: "#800080",
                  justifyContent: "center",
                  alignContent: "center",
                  margin: 25,
                })
              }
              onPress={this.clickLogout}
            >
              <Icon
                style={styles.iconStyle4, {color: "white"}}
				name="logout"
                type="MaterialCommunityIcons"
              />
              <Text>Logout</Text>
            </Button>
          </Row>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = ({ authReducer }) => ({
  user: authReducer.user,
});

export default connect(mapStateToProps, { ...auth })(ProfileScreen);

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#4d2b78",
    height: 100,
    width: 415,
    paddingTop: 30,
    marginBottom: 140,
  },

  Container1: {
    height: 380,
    paddingTop: 40,
    marginBottom: 5,
  },
  bottomCard: {
    height: 100,
    paddingTop: 1,
    marginBottom: 5,
    justifyContent: "center",
  },
  circleButton1: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    justifyContent: "center",
  },

  logoutButtonStyle: {
    backgroundColor: "#ff0f5f",
  },
  circleButton2: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    justifyContent: "center",
  },

  circleButton3: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    justifyContent: "center",
  },

  circleButton4: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    justifyContent: "center",
  },

  thumbnailButton: {
    backgroundColor: "#D3D3D3",
    width: 120,
    height: 120,
    borderRadius: 110,
    //top: 70,
    //left: 50,
    justifyContent: "center",
  },

  profileButton: {
    backgroundColor: "#D3D3D3",
    width: 120,
    height: 120,
    borderRadius: 110,
    top: 70,
    left: 50,
    justifyContent: "center",
  },

  ViewProfileButton: {
    backgroundColor: "white",
    left: 140,
    top: 70,
    width: 180,
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#a996b6",
  },

  iconStyle: {
    color: "#4169E1",
    fontSize: 35,
    left: 5,
  },
  iconStyle1: {
    color: "red",
    fontSize: 35,
  },
  iconStyle2: {
    color: "#3CB371",
    fontSize: 35,
  },
  iconStyle4: {
    color: "orange",
    fontSize: 35,
  },
  TextColor: {
    color: "black",
    justifyContent: "center",
    right: 20,
    paddingTop: 80,
  },

  typeNameStyle: {
    color: "#a0a0a0",
    fontSize: 18,
    fontWeight: "bold",
  },
  nameStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    top: 105,
    left: 185,
  },
  nameStyle1: {
    fontSize: 18,
    left: 178,
    bottom: 65,
  },
  nameStyle2: {
    fontSize: 18,
    left: 175,
    bottom: 55,
  },
});
