import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  CardItem,
  Container,
  Left,
  Right,
  Text,
  View,
  Icon,
  Switch,
  Header,
} from "native-base";

export class SettingScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false, //remove this

      newLike: false,
      newFit: false,
      newMessage: false,
      Activity: false,
      Exclusive: false,
      Discount: false,
      Distance: false,
      Age: false,

            
    };
  }

  trunOn = () => {
    this.setState({
      toggle: false,
    });
  };

  trunOff = () => {
    this.setState({
      toggle: true,
    });
  };

  render() {
    return (
      <Container>
        <Text style={styles.headFont}>Notifications</Text>
        <Card style={styles.cardStyle}>
          <CardItem>
            <Left>
              <View style={styles.barItem}>
                <Text style={styles.newLike}>New Like</Text>
                <Text style={styles.newFit}>New Fit</Text>
                <Text style={styles.newMessage}>New Message</Text>
              </View>
            </Left>
            <View>
              <Right>
                <Switch
                  style={styles.switchButton1}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ newMessage: value })}
                  value={this.state.newMessage}
                />

                <Switch
                  style={styles.switchButton2}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ newFit: value })}
                  value={this.state.newFit}
                />

                <Switch
                  style={styles.switchButton3}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ newLike: value })}
                  value={this.state.newLike}
                />
              </Right>
            </View>
          </CardItem>
        </Card>

        <Text style={styles.headFont}>Email</Text>
        <Card style={styles.cardStyle}>
          <CardItem>
            <Left>
              <View style={styles.barItem}>
                <Text style={styles.newLike}>Activity & Messages</Text>
                <Text style={styles.newFit}>Exclusive Event Invitations</Text>
                <Text style={styles.newMessage}> Discount & Partner Promotion
                </Text>
              </View>
            </Left>
            <View>
              <Right>
                <Switch
                  style={styles.switchButton1}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ Activity: value })}
                  value={this.state.Activity}
                />

                <Switch
                  style={styles.switchButton2}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ Exclusive: value })}
                  value={this.state.Exclusive}
                />

                <Switch
                  style={styles.switchButton3}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ Discount: value })}
                  value={this.state.Discount}
                />
              </Right>
            </View>
          </CardItem>
        </Card>

        <Text style={styles.headFont}>Notifications</Text>
        <Card style={styles.cardStyle1}>
          <CardItem>
            <Left>
              <View style={styles.barItem}>
                <Text style={styles.newLike}>Don't Show My Age</Text>
                <Text style={styles.newFit}>Make My Distance Invisible</Text>
              </View>
            </Left>
            <View>
              <Right>
                <Switch
                  style={styles.switchButton1}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ Age: value })}
                  value={this.state.Age}
                />

                <Switch
                  style={styles.switchButton2}
                  trackColor={{ false: "white", true: "#C0C0C0" }}
                  thumbColor="#8B008B"
                  ios_backgroundColor="white"
                  onValueChange={(value) => this.setState({ Distance: value })}
                  value={this.state.Discount}
                />
              </Right>
            </View>
          </CardItem>
        </Card>

        <View style={{marginTop: 40}}>
          <Button full warning onPress={() => Actions.home()}>
            <Text style={{ color: "black" }}> Done </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default SettingScreen;

const styles = StyleSheet.create({
  switchButton1: {
    marginBottom: 35,
  },

  switchButton2: {
    marginBottom: 35,
  },
  barItem: {
    flex: 1,
    paddingBottom: 10,
  },
  newLike: {
    fontSize: 18,
    color: "#808080",
    paddingBottom: 40,
  },
  newFit: {
    fontSize: 18,
    color: "#808080",
    paddingBottom: 40,
  },
  newMessage: {
    fontSize: 18,
    color: "#808080",
  },
  circleButton2: {
    paddingBottom: 19,
  },

  headFont: {
    paddingTop: 15,
    fontSize: 20,
    color: "#4B0082",
    fontWeight: "bold",
    left: 17,
  },

  cardStyle: {
    backgroundColor: "white",
    left: 10,
    width: 395,
    borderWidth: 2,
    borderColor: "#4B0082",
  },
  cardStyle1: {
    backgroundColor: "white",
    left: 10,
    width: 395,
    height: 100,
    borderWidth: 2,
    borderColor: "#4B0082",
  },
});
