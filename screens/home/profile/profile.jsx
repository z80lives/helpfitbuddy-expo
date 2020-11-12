import React from "react";
import {Container, Text, Grid, Row} from "native-base";


export class ProfileScreen extends React.Component{
    render(){
        return(
            <Container>
                <Grid>
                    <Row>
                        <Text>Profile stuff will be here</Text>
                    </Row>
                    <Row>
                        <Text>Other stuff here</Text>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

export default ProfileScreen;