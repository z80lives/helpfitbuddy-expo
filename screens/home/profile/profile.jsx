import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Text,
  Grid,
  Row,
  Button,
  Icon,
  Card,
  View,
} from "native-base";
import { Actions } from "react-native-router-flux";

export class ProfileScreen extends React.Component {
  render() {
    return (
      <Container>
        <Grid>
          <Row>
            <Card style={styles.Container}>
              <Button style={styles.profileButton}>
                <Icon name="person" type="Octicons" />
              </Button>
              <Button
                rounded
                style={styles.ViewProfileButton}
                onPress={() => Actions.viewProfile()}
              >
                <Text style={{ color: "#7f709f" }}>View Profile</Text>
              </Button>
            </Card>
          </Row>
          <Card style={styles.Container1}>
            <Row>
              <View>
                <Button style={styles.circleButton1}>
                  <Icon
                    style={styles.iconStyle1}
                    name="share"
                    type="Fontisto"
                  />
                </Button>
                <Text style={{ left: 70, top: 10 }}>Share</Text>
              </View>

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
                <Text style={{ left: 215, top: 10 }}>Edit Profile</Text>
              </View>
              <View>
                <Button style={styles.circleButton2}>
                  <Icon
                    style={styles.iconStyle}
                    name="pencil-alt"
                    type="FontAwesome5"
                  />
                </Button>
                <Text style={{ left: 98, top: 210 }}>Edit Profile</Text>
              </View>
              <View>
                <Button style={styles.circleButton4}>
                  <Icon style={styles.iconStyle4} name="star" type="Fontisto" />
                </Button>
                <Text style={{ right: 230, top: 210 }}>Settings</Text>
              </View>
            </Row>
          </Card>
        </Grid>
      </Container>
    );
  }
}

export default ProfileScreen;
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#4d2b78",
    height: 170,
    width: 415,
    paddingTop: 30,
    marginBottom: 140,
  },

  Container1: {
    height: 380,
    paddingTop: 10,
    marginBottom: 60,
  },
  circleButton1: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    left: 40,
    justifyContent: "center",
  },

  circleButton2: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    left: 90,
    justifyContent: "center",
  },

  circleButton3: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    top: 200,
    right: 58,
    justifyContent: "center",
  },

  circleButton4: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    top: 200,
    right: 18,
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
});
