import React from 'react';
import {Text, View} from 'react-native';

import LoginScreen from './screens/login/login.jsx';
import SignupScreen from './screens/signup/signup.jsx';
import ActivitesScreen from './screens/activites/activites.jsx';
import HomeScreen from './screens/home/home.jsx';





import {Router, Stack, Scene} from 'react-native-router-flux';
//import HomeScreen from './screens/home/home.component';

//import {connect, Provider} from 'react-redux';
//import store from './redux/store';

//const ConnectedRouter = connect()(Router);

const App = () => (
    <Router>
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
          component={ActivitesScreen}
          hideNavBar={false}
          key="activites"
          title="Activites"
        />

        <Scene
          component={HomeScreen}
          hideNavBar={false}
          key="home"
          title="home"
          back={false}
        />
        
      </Stack>
    </Router>
);

export default App;