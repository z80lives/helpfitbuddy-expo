import React from "react";
import { Container, Text, View, Input, Item, Form, Button } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, modalStyleIOS } from "react-native";

export class AddGymScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      dateText: "Enter open Time",
      isVisible: false,
      chosenDate: "",
    };
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
              <Text style={{ fontSize: 35, marginBottom: 50 }}>CREATE GYM</Text>
            </View>
            <View>
              <Form>
                <Item regular style={styles.button}>
                  <Input placeholder="Name of Gym" />
                </Item>

                <Text>{this.state.chosenDate}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.showPicker}
                >
                  <Text style={styles.text}> {this.state.dateText} </Text>
                </TouchableOpacity>

                <Text>{this.state.chosenDate}</Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={this.showPicker}
                >
                  <Text style={styles.text}> {this.state.dateText} </Text>
                </TouchableOpacity>

                <Item regular style={(styles.button, { marginTop: 15 })}>
                  <Input placeholder="Location" />
                </Item>
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
              <Text style={{ color: "black" }}> Create </Text>
            </Button>
          </View>
        </Container>
      </Container>
    );
  }
}

export default AddGymScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: 400,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "gray",
    alignSelf: "flex-start",
    textAlign: "center",
  },
});
