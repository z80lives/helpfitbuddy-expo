import React from "react";
import { Container, Content, Text, View, Input, Item, Form, Button, Spinner } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, modalStyleIOS } from "react-native";

import { connect } from "react-redux";

import {GymUserService} from "../../services/gymuser";


export class AddGymScreen extends React.Component {
  constructor() {
    super();
    this.state = {
	dateText: "Enter open Time",
	isVisible: false,
	chosenDate: "",
	currentSelection: "open",
	openTimeText: "Enter open time",
	closeTimeText: "Enter close time"
    };
  }

    handlePicker = (datetime) => {

	console.log("datetime", datetime.toLocaleTimeString());
 /*    const formatDate = new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(datetime);      */
	const formatDate = datetime.toLocaleTimeString();
	const isVisible = false;

	if(this.state.currentSelection == "open"){
	    this.setState({
		openTimeText: formatDate,
		isVisible
	    });
	}else{
	    this.setState({
		closeTimeText: formatDate,
		isVisible: false
	    });
	}
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
	  <>
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
                    onPress={ () => { this.setState({isVisible: true, currentSelection: "open"})} }
                >
                  <Text style={styles.text}> {this.state.openTimeText} </Text>
                </TouchableOpacity>

                <Text>{this.state.chosenDate}</Text>

                <TouchableOpacity
                  style={styles.button}                    
		    onPress={ () => { this.setState({isVisible: true, currentSelection: "close"})} }

                >
                  <Text style={styles.text}> {this.state.closeTimeText} </Text>
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
	  </>
    );
  }
}

//export default connect(null, {})(AddGymScreen);

class ManageGym extends React.Component{
    gymServices = new GymUserService();
    state={
	loadComplete: false,
	ownsGym: false
    };

    loadGymData = () =>{
	this.gymServices.getOwnGym(this.props.user)
	    .then( r => {
		const ownsGym = r.data != undefined;
		this.setState({loadComplete: true, ownsGym});		
	    });
    }    
    
    componentDidMount(){
	this.loadGymData();
    }
    
    render(){
	return(
	    <Container>
		<Content>
		    {!this.state.loadComplete &&
		     <View style={{justifyContent: "center",
				   alignItems: "center"}}
		     >
			 <Text>Loading</Text>
			 <Spinner color="blue" />
		     </View>
		    }

		    {this.state.loadComplete && this.state.ownsGym &&
		     <View>
			 <Text>Owns gym</Text>
		     </View>
		    }

		    {this.state.loadComplete && !this.state.ownsGym &&
		     <AddGymScreen
		     />
		    }
		</Content>
	</Container>
	);
    }
}

const mapStateToProps = ({authReducer}) => ({
    user: authReducer.user
});

export default connect(mapStateToProps, {})(ManageGym);

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
