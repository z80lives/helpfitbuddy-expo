import React from 'react';
import {Text, View} from 'react-native';

import LoginScreen from './screens/login/login.jsx';
import SignupScreen from './screens/signup/signup.jsx';
import HomeScreen from './screens/home/home.jsx';

import {ChatWindow} from "./screens/home/chat/chatWindow.jsx";



import {Router, Stack, Scene} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import store from './redux/store';

//const ConnectedRouter = connect()(Router);
import * as Font from 'expo-font';
//import {Font} from "expo";
import { Ionicons } from '@expo/vector-icons';



const ConnectedRouter = connect()(Router);

class App extends React.Component{

      constructor(props) {
	  super(props);
	  this.state = {
	      isReady: false,
	  };
      }

    async componentDidMount() {
	await Font.loadAsync({
	    "Roboto": require('native-base/Fonts/Roboto.ttf'),
	    "Roboto_medium": require('native-base/Fonts/Roboto_medium.ttf'),
	    ...Ionicons.font,
	});
	this.setState({ isReady: true });
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

		</Stack>
	    </ConnectedRouter>
	    </Provider>
	);
    }
}

export default App;
