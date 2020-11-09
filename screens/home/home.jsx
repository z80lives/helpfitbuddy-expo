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
              <Icon name="computer" />
              <Text>Members</Text>
            </Button>
            <Button vertical>
              <Icon name="activity" />
              <Text>Ativity</Text>
            </Button>
            <Button vertical active>
              <Icon active name="events" />
              <Text>Events</Text>
            </Button>
            <Button vertical>
              <Icon name="chat" />
              <Text>Chat</Text>
            </Button>
            <Button vertical>
              <Icon name="profile" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}