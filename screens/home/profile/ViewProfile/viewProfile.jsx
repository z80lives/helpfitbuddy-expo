import React from "react";
import { Container, Grid, Row, Text, View, Icon } from "native-base";
import { Image, StyleSheet } from "react-native";

export class ViewProfileScreen extends React.Component {
  render() {
    return (
      <Container>
        <Grid>
          <Row>
            <Image
              source={require("../../../../res/hothaifa.jpg")}
              style={styles.imageStyle}
            />
          </Row>
          <Row>
            <Text style={styles.textStyle}>Hothaifa Alhammadi, 27</Text>
            <View>
              <Text style={{ top: 50, right: 180 }}>
                <Icon
                  style={{ fontSize: 15, color: "#800080" }}
                  name="world-o"
                  type="Fontisto"
                />
                Yemen
              </Text>

              <Text style={{ top: 65, right: 180 }}>
                <Icon
                  style={{ fontSize: 15, color: "#800080" }}
                  name="wallet-travel"
                  type="MaterialCommunityIcons"
                />
                Student
              </Text>
            </View>

            <View>
              <Text
                style={{
                  top: 130,
                  right: 250,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                <Icon
                  style={{ fontSize: 15, color: "#800080" }}
                  name="person"
                  type="Fontisto"
                />
                About Me
              </Text>
              <Text
                style={{
                  top: 140,
                  right: 200,
                  color: 'gray'
                }}
              >
                Interested in ping pong, basketball, MMA.....
              </Text>
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
}

export default ViewProfileScreen;

const styles = StyleSheet.create({
  imageStyle: {
    width: 415,
    height: 338,
    borderWidth: 1,
    borderColor: "gray",
  },
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    left: 10,
  },
  textStyle1: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    left: 10,
  },
});
