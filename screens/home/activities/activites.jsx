import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Tab,
  Tabs,
  Fab,
  Icon,
} from "native-base";

import { Dimensions } from "react-native";
import MapView from "react-native-maps";

import { GymUserService } from "../../../services/gymuser.js";

import * as Location from "expo-location";

import { FriendRequestView } from "../../friend_requests";

const LikeView = ({ numLikes }) => (
  <Container>
    <Text>{numLikes} people liked your profile.</Text>
  </Container>
);

const GymView = ({ num }) => (
  <Container>
    <Text>No gyms available. </Text>
  </Container>
);

class Map extends Component {
  gymUserServices = new GymUserService();
  map = React.createRef();

  state = {
    region: {
      latitude: 3.20623,
      longitude: 101.58084,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    marker: null,
    location: null,
    reposition: false,
    //location: null
  };

  onRegionChange = (region) => {
    this.setState({ region });
  };

  updateLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
    }
    
    let location = await Location.getCurrentPositionAsync({});
    this.gymUserServices.updateLocation(location).then((r) => console.log(r));

	this.setState({ location });
	this.jumpToLocation(location);	
  };

  jumpToLocation(location) {
    const {
      latitude,
      longitude,
    } = location.coords;
    this.map.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    // console.log(this.map)
    // this.setState({latitude: latitude.toString(), longitude: longitude.toString()});
  }

  componentDidMount() {
    this.updateLocation();
  }

  render() {
    return (
      <Container>
        <MapView
			ref={(map) => {
				this.map = map;
			  }}
          onRegionChange={this.onRegionChange}
          initialRegion={this.state.region}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          {this.state.location && (
            <>
              <MapView.Marker
                coordinate={this.state.location.coords}
                title="Me"
                description="Current Location"
              ></MapView.Marker>
              <MapView.Circle
                radius={120}
                center={this.state.location.coords}
              />
            </>
          )}
        </MapView>
        <Button>
          <Icon name="mail" />
        </Button>
      </Container>
    );
  }
}

export class ActivityScreen extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading="Map">
            <Map></Map>
          </Tab>
          <Tab heading="Notifications">
            <FriendRequestView />
          </Tab>
          <Tab heading="Gyms">
            <GymView num={213} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default ActivityScreen;
