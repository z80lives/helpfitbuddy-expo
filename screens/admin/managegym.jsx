import React from "react";
import { Root, Container, Content,
	 Text,
	 View,
	 Spinner } from "native-base";

import { connect } from "react-redux";

import {GymUserService} from "../../services/gymuser";


//import {GooglePlacesAutoComplete} from "react-native-google-places-autocomplete";

import AddGymScreen from "./creategym";
import ViewGymScreen from "./viewgym";

import styles from './style';
import {makeToast} from "../../utils/notifications";

import {setUserGym} from "../../redux/actions/gym";

//export default connect(null, {})(AddGymScreen);
class ManageGym extends React.Component{
    gymServices = new GymUserService();
    
    state={
	loadComplete: false,
	ownsGym: false,
	gym: null
    };

    loadGymData = () =>{
	this.gymServices.getOwnGym(this.props.user)
	    .then( r => {
		const ownsGym = r.data != undefined;
		this.setState({loadComplete: true, ownsGym});
		//this.setState({gym:r.data});
		this.props.setUserGym(r.data);
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
		     <ViewGymScreen
			 gym={this.props.gym}
		     />		     
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

const mapStateToProps = ({authReducer, gymReducer}) => ({
    user: authReducer.user,
    gym: gymReducer.ownedGym
});

export default connect(mapStateToProps, {setUserGym})(ManageGym);
