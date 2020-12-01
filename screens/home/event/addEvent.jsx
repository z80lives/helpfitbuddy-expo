import React from "react";
import {
  Container,
  Text,
  View,
  Input,
  Item,
  Form,
  Button,
  Picker,
  Content,
  Icon,
  DatePicker,
} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, modalStyleIOS } from "react-native";

import { GymUserService } from "../../../services/gymuser";

export class AddEventScreen extends React.Component {
  gymService = new GymUserService();

  state = {
      dateText: "Enter the Time",
      isVisible: false,
      chosenDate: "",
    };

  componentDidMount() {
    /*
    this.gymService.getGymList().then(data => {
      this.setState({dateText: "I was changed"})
      console.log("DATA RECEIVED", r);
    }).catch(err => {
      console.log("error ", err);
    })*/
  }

  handlePicker = (datetime) => {
    const formatDate = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(datetime);

    this.setState({
      dateText: formatDate,
      isVisible: false,
    });
  };

  hidePicker = (datetime) => {
    this.setState({
      isVisible: false,
    });
  };

  showPicker = () => {
    this.setState({
      isVisible: true,
    });
  };
  render() {
    return (
      <Container>
        <Container>
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 35, marginBottom: 50 }}>ADD EVENT</Text>
            </View>
            <View>
              <Form>
                <Item regular style={(styles.button, {})}>
                  <Input placeholder="Event Name" placeholderTextColor="gray" />
                </Item>

                <Text>{this.state.chosenDate}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.showPicker}
                ><View><Text style={styles.text}>{this.state.dateText}</Text></View>
                </TouchableOpacity>

                <View
                  style={{
                    width: 400,
                    height: 50,
                    borderWidth: 1,
                    marginTop: 10,
                    borderColor: "#D3D3D3",
                  }}
                >
                  <Item>
                    <DatePicker
                      defaultDate={new Date(1995, 4, 4)}
                      minimumDate={new Date(1900, 1, 1)}
                      maximumDate={new Date(2018, 12, 31)}
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Enter the Date"
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{
                        color: "gray",
                        marginTop: 5,
                        fontSize: 18,
                      }}
                      onDateChange={(newDate) => {
                        this.setState({ dob: newDate });
                      }}
                      disabled={false}
                    />
                  </Item>
                </View>

                <Form
                  style={{
                    width: 400,
                    height: 50,
                    borderWidth: 1,
                    marginTop: 10,
                    borderColor: "#D3D3D3",
                  }}
                >
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select Gym"
                    placeholderStyle={{ color: "gray" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                    selectedValue={this.state.selected}
                  >
                    <Picker.Item label="Fitness First" value="key0" />
                    <Picker.Item label="Anytime fitness" value="key1" />
                  </Picker>
                </Form>
              </Form>
              <Form
                style={{
                  width: 400,
                  height: 50,
                  borderWidth: 1,
                  marginTop: 10,
                  borderColor: "#D3D3D3",
                }}
              >
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select Activity"
                  placeholderStyle={{ color: "gray" }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={(val) => this.setState({ selected: val })}
                >
                  <Picker.Item label="Running " value="running" />
                  <Picker.Item label="MMA" value="mma" />
                </Picker>
              </Form>
            </View>

            <DateTimePickerModal
              style={{ modalStyleIOS }}
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={"time"}
            />
          </View>

          <View>
            <Button full warning onPress={() => Actions.home()}>
              <Text style={{ color: "black" }}> Done </Text>
            </Button>
          </View>
        </Container>
      </Container>
    );
  }
}

export default AddEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 400,
    height: 50,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "gray",
    left: 10,
    alignSelf: "flex-start",
    textAlign: "center",
  },
});
