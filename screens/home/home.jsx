import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default class FooterTabsIconTextExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content />
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="computer" type="MaterialIcons" />
              <Text>Member</Text>
            </Button>
            <Button vertical>
              <Icon name="bell-o" type="FontAwesome"/>
              <Text>Activity</Text>
            </Button>
            <Button vertical active>
              <Icon  name="event" type="MaterialIcons" />
              <Text>Events</Text>
            </Button>
            <Button vertical>
              <Icon name="chat" type="MaterialIcons" />
              <Text>Chat</Text>
            </Button>
            <Button vertical>
              <Icon name="person" type="Octicons"/>
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}