import React, { Component } from 'react';
import { Container, Header, Content, Button, Icon, Text, Tab, Tabs } from 'native-base';

const LikeView = ({numLikes}) => (
  <Container>
    <Text>{numLikes} people liked your profile.</Text>
  </Container>
);


const FitView = ({num}) => (
  <Container>
    <Text>{num} fit.</Text>
  </Container>
);


export class ActivityScreen extends Component {
  render() {
    return (
      <Container>

        <Tabs>
          <Tab heading="Likes">
            <LikeView 
              numLikes={123}
            />
          </Tab>
          <Tab heading="Fits">
            <FitView 
              num={213}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default ActivityScreen;
