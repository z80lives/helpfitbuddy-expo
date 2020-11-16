import React from "react";
import {Container, Text, Grid, Row, Button} from "native-base";
import {Actions, ActionConst} from "react-native-router-flux";
import {connect} from "react-redux";
import {auth} from "../../../redux/actions/auth";

class ProfileScreen extends React.Component{

    redirectAuthentication = () => {
	if(!this.props.isAuthenticated){
	    Actions.login({"type": ActionConst.RESET});
	}
    }

    onPressLogout = () => {
	this.props.logoutAction();
	this.redirectAuthentication();
    }
    
    render(){
        return(
            <Container>
                <Grid>
                    <Row>
                        <Text>Profile stuff will be here</Text>
                    </Row>
                    <Row>
                        <Text>Other stuff here</Text>

			
			<Button onPress={this.onPressLogout}>
			    <Text>Logout</Text>
			</Button>
                    </Row>

                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = ({authReducer}) => ({
    isAuthenticated: authReducer.isAuthenticated
});

export default connect(mapStateToProps, {...auth})(ProfileScreen);
