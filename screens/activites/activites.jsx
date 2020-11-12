import React, { Component } from 'react';
import { Container, Header, Content, Button, Icon, Text } from 'native-base';

export default class ButtonIconExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
        
          <Button iconLeft light>
            <Icon name='computer' type=""material />
            <Text>Back</Text>
          </Button>
          <Button iconRight light>
            <Text>Next</Text>
            <Icon name='arrow-forward' />
          </Button>
          <Button iconLeft>
            <Icon name='home' />
            <Text>Home</Text>
          </Button>
          <Button iconLeft transparent primary>
            <Icon name='beer' />
            <Text>Pub</Text>
          </Button>
          <Button iconLeft dark>
            <Icon name='cog' />
            <Text>Settings</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}