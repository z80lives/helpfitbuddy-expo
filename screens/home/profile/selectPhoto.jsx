import React, { Component } from "react";
import { Button, Text, View, Card, ActionSheet } from "native-base";

import { Image, Alert } from "react-native";
import { GymUserService } from "../../../services/gymuser";
import * as ImagePicker from 'expo-image-picker';

import {auth} from "../../../redux/actions/auth";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";


class SelectPhotoScreen extends Component {
  gymServices = new GymUserService();
  state = {
    selectedImage: this.props.user?this.props.user.image: require("../../../res/blank.png"),
    imgb64: null,
  };
  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });
    console.log(pickerResult);
    const imgbase64 = pickerResult
      ? `data:image/jpg;base64,${pickerResult.base64}`
      : null;

    this.setState({
      selectedImage: { uri: pickerResult.uri },
      imgb64: imgbase64,
    });
  };

  handleSave = () => {
    this.gymServices
      .setProfilePicture(this.state.imgb64)
      .then((response) => {
        //this.props.onSave(this.state.imgb64);        
        this.props.setProfilePictureAction(this.state.imgb64);
        Actions.home({setPage: 4});
      })
      .catch((msg) => {
        console.error(msg);
      });
  };

  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Card style={{ padding: 15 }}>
          <Image
            source={this.state.selectedImage}
            width={50}
            height={50}
            style={{ width: 200, height: 200, resizeMode: "stretch" }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ left: 30 }}
              onPress={this.openImagePickerAsync}
              width={"100%"}
            >
              <Text>Pick a photo</Text>
            </Button>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Button
              style={{ left: 55 }}
              onPress={this.handleSave}
              width={"100%"}
            >
              <Text>Save</Text>
            </Button>
          </View>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({authReducer}) => ({
    user: authReducer.user
});

export default connect(null, {...auth})(SelectPhotoScreen);
