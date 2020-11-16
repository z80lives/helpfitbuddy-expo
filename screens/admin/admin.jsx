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

export class AdminScreen extends React.Component {
  render() {
    return (
      <Container>
        <Grid>
          <Row>
            <Card style={styles.Container}>
              <Text style={styles.nameStyle}> Salem Mohammed</Text>

              <Button style={styles.profileButton}>
                <Icon name="person" type="Octicons" />
              </Button>
            </Card>
          </Row>
          <Text style={styles.nameStyle2}>Admin</Text>
          <Card style={styles.Container1}>
            <Row>
              <View>
                <Button
                  style={styles.circleButton3}
                  onPress={() => Actions.setting()}
                >
                  <Icon
                    style={styles.iconStyle2}
                    name="clipboard-notes"
                    type="Foundation"
                  />
                </Button>
                <Text style={{ left: 185, top: 10 }}>Add Gym</Text>
              </View>
              <View>
                <Button style={styles.circleButton2}>
                  <Icon
                    style={styles.iconStyle}
                    name="add-circle-outline"
                    type="MaterialIcons"
                  />
                </Button>
                <Text style={{ left: 200, top: 210 }}>Logout</Text>
              </View>
              <View>
                <Button style={styles.circleButton4}>
                  <Icon style={styles.iconStyle4} name="log-out" type="Entypo" />
                </Button>
                <Text style={{ right: 130, top: 210 }}>View Gym Statistics</Text>
              </View>
            </Row>
          </Card>
        </Grid>
      </Container>
    );
  }
}

export default AdminScreen;
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
    marginBottom: 5,
  },

  circleButton2: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    left:65,
    justifyContent: "center",
  },

  circleButton3: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    top: 200,
    left: 80,
    justifyContent: "center",
  },

  circleButton4: {
    backgroundColor: "#f1f0f0",
    width: 100,
    height: 100,
    borderRadius: 110,
    top: 200,
    left:70,   
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

  iconStyle: {
    color: "green",
    fontSize: 60,
  },
  iconStyle1: {
    color: "red",
    fontSize: 60,
  },
  iconStyle2: {
    color: "blue",
    fontSize: 60,
  },
  iconStyle4: {
    color: "red",
    fontSize: 50,
    left: 5
    
  },
  TextColor: {
    color: "black",
    justifyContent: "center",
    right: 20,
    paddingTop: 80,
  },
  nameStyle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    top: 105,
    left: 185,
  },

  nameStyle2: {
    fontSize: 18,
    left: 175,
    bottom: 65,
  },
});
