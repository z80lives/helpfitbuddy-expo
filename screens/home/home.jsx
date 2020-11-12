import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';

import {MemberScreen} from "./member/member.jsx";
import {ActivityScreen} from "./activities/activites.jsx";
//import ActivityScreen from "/activites/activites.jsx";

class BodyContent extends React.Component{
    render(){
	if(this.props.currentPage==0)
	    return <MemberScreen/>;
	else if(this.props.currentPage==1)	    
	    return <ActivityScreen/>;
	else
	    return <ActivityScreen/>;
    }
}

export default class FooterTabsIconTextExample extends Component {
    state={
	currentPage: 0
    }

    clickNav = (num) => {
      console.log("Opening page number", num);
	    this.setState({currentPage: num})
    }
    
  render() {
    return (
      <Container>
          <Header />
	  <Content>
	      <BodyContent currentPage={this.state.currentPage}/>
	  </Content>
        <Footer>
          <FooterTab>
              <Button vertical onPress={()=>this.clickNav(0)} active={this.state.currentPage==0}>
              <Icon active={this.state.currentPage==0} name="computer" type="MaterialIcons" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={()=>this.clickNav(1)} active={this.state.currentPage==1}>
              <Icon name="dumbbell" active={this.state.currentPage==1} type="FontAwesome5" />
              <Text>Activity</Text>
            </Button>
              <Button vertical onPress={()=>this.clickNav(2)} active={this.state.currentPage==2}>
		  <Icon active={this.state.currentPage==2} name="calendar" type="AntDesign" />
              <Text>Events</Text>
            </Button>
            <Button vertical onPress={()=>this.clickNav(3)} active={this.state.currentPage==3}>
              <Icon active={this.state.currentPage==3} name="chat" type="Entypo" />
              <Text>Chat</Text>
            </Button>
            <Button vertical onPress={()=>this.clickNav(4)} active={this.state.currentPage==4}>
              <Icon active={this.state.currentPage==4} name="profile" type="AntDesign"/>
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
