import React from "react";
import { Root, Container, Content,
	 Text,
	 View,
	 Spinner } from "native-base";

import { connect } from "react-redux";

import {GymUserService} from "../../services/gymuser";


//import {GooglePlacesAutoComplete} from "react-native-google-places-autocomplete";

import AddGymScreen from "./creategym";
import styles from './style';
import {makeToast} from "../../utils/notifications";

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

    onCreateGym = () => {
	//makeToast("Gym successfully created");
	this.loadGymData();	
    }
    
    componentDidMount(){
	this.loadGymData();
    }
    
    render(){
	return(
	    <Root>
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
			 gymServices={this.gymServices}
			 onCreate={this.onCreateGym}
		     />
		    }
		</Content>
	    </Container>
	    </Root>
	);
    }
}

const mapStateToProps = ({authReducer}) => ({
    user: authReducer.user
});

export default connect(mapStateToProps, {})(ManageGym);
