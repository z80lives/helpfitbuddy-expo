import React from "react";
import { Container, Grid, Row, Text, View, Icon } from "native-base";
import { Image, StyleSheet } from "react-native";

import {connect} from "react-redux";

export class ViewProfileScreen extends React.Component {
  render() {
    return (
      <Container>
        <Grid>
          <Row>
            <Image
              source={{uri:this.props.user.image}}
              style={styles.imageStyle}
            />
          </Row>
          <Row>
            <Text style={styles.textStyle}>{this.props.user.name},  27</Text>
            <View>
              <Text style={{ top: 50, right: 180 }}>
                <Icon
                  style={{ fontSize: 15, color: "#800080" }}
                  name="world-o"
                  type="Fontisto"
                />
                {this.props.user.country}
              </Text>

              <Text style={{ top: 65, right: 180 }}>
                <Icon
                  style={{ fontSize: 15, color: "#800080" }}
                  name="wallet-travel"
                  type="MaterialCommunityIcons"
                />
                {this.props.user.occupation}
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
              {this.props.user.bio}                
              </Text>
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({authReducer}) => ({
  user: authReducer.user  
});

export default connect(mapStateToProps, {})(ViewProfileScreen);

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
