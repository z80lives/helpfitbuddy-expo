import React from 'react';
import {Text, View} from 'react-native';

import LoginScreen from './screens/login/login.jsx';
import SignupScreen from './screens/signup/signup.jsx';
import HomeScreen from './screens/home/home.jsx';

import AddGymScreen from "./screens/admin/addGym";
import AdminScreen from "./screens/admin/admin";

import {ChatWindow} from "./screens/home/chat/chatWindow";
import SettingScreen from './screens/home/profile/Setting/setting.jsx';




import {Router, Stack, Scene} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import store from './redux/store';

import {AuthService} from "./services/auth";


//const ConnectedRouter = connect()(Router);
import * as Font from 'expo-font';
//import {Font} from "expo";
import { Ionicons } from '@expo/vector-icons';
import ViewProfileScreen from './screens/home/profile/ViewProfile/viewProfile.jsx';

import {Root} from "native-base";

const ConnectedRouter = connect()(Router);

class App extends React.Component{
    authServices = new AuthService();
    constructor(props) {
	super(props);
	this.state = {
	    isReady: false,
	};
    }

    state = {
	refreshTimeout: null
    }

    async componentDidMount() {
	await Font.loadAsync({
	    "Roboto": require('native-base/Fonts/Roboto.ttf'),
	    "Roboto_medium": require('native-base/Fonts/Roboto_medium.ttf'),
	    ...Ionicons.font,
	});
	this.setState({ isReady: true });
	console.log("App Component mounted");
	this.initRefreshTokens();
    }

    componentDidUpdate(){
	this.initRefreshTokens();
    }

    initRefreshTokens = ()=>{
	if(this.state.refreshTimeout == null){
	    console.log("Initialising refresh timeout");
	    const refreshTimeout = setInterval( this.refreshTokens,
					       10000);
	    this.setState({refreshTimeout})	    
	}	
    }    

    
    refreshTokens = async () => {
	(new AuthService()).refreshTokens();
    }    
	
    
    render(){
	if(!this.state.isReady){
	    return <View></View>;
	}

	return(
	    <Provider store={store}>		
		<ConnectedRouter>
		    <Stack key="root">
			<Scene
			    component={LoginScreen}
			    hideNavBar={true}
			    initial={true}
			    key="login"
			    title="Login"
			/>

			<Scene
			    component={SignupScreen}
			    hideNavBar={true}
			    key="signup"
			    title="Sign up"
			/>

			<Scene
			    component={HomeScreen}
			    hideNavBar={true}
			    key="home"
			    title="home"
			    back={false}
			/>

			<Scene
			    component={ChatWindow}
			    hideNavBar={false}
			    key="chatwindow"
			    title="Messaging"
			/>

			<Scene
			    component={SettingScreen}
			    hideNavBar={false}
			    key="setting"
			    title="Settings"
			/>

			<Scene
			    component={ViewProfileScreen}
			    hideNavBar={false}
			    key="viewProfile"
			    title="View Profile"
			/>

			<Scene
			    component={AddGymScreen}
			    hideNavBar={false}
			    key="addGym"
			    title="Manage Gym"
			/>

			<Scene
			    component={AdminScreen}
			    hideNavBar={false}
			    key="admin"
			    title="Admin"
			/>

		    </Stack>
		    </ConnectedRouter>
	    </Provider>
	);
    }
}

export default App;
