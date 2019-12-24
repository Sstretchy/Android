import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Container, Header, Input, Content, Textarea, Label, Fab, Footer, FooterTab, Left, Right, Body, Icon, Text, Item } from 'native-base';
import Alert from './alert';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { AsyncStorage } from 'react-native';

export default class BodyComponent extends Component {
  state = {
    notes: [],
    serchValue: '',
    visible: false
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('notes');
      if (value !== null) {
        console.log(value);
      } else {
        await AsyncStorage.setItem('notes', []);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  onSave = () => {

  }

  onSearchTextChange = text => {
    this.setState({ serchValue: text });
  };
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#6200ee' }}>
          <Body>
            <Title style={{ color: 'white' }}>
              Diary
            </Title>
          </Body>
        </Header>
        <ScrollView>
          <Content>
            <Item>
              <Input
                bordered
                onSearchTextChange={text => this.onSearchTextChange(text)}
                value={this.state.serchValue} placeholder="Search by tag"
              />
              <Button transparent>
                <Icon style={{ fontSize: 35, color: '#6200ee' }} name='close' />
              </Button>
            </Item>
            <Card style={{ backgroundColor: '#be8fff', margin: 10 }}>
              <Card.Title
                title="Card Title"
                left={(props) => <Avatar.Icon {...props} style={{ fontSize: 35, color: 'darkblue' }} icon="heart"
                />}
              />
              <Card.Content style={{ backgroundColor: '#eeebff', padding: 20 }}>
                <Paragraph>Card content </Paragraph>
              </Card.Content>
              <Card.Content style={{ backgroundColor: '#eeebff', padding: 20 }}>
                <Paragraph>Card content </Paragraph>
              </Card.Content>
              <Card.Actions style={{ backgroundColor: '#332863' }} >
                <Button style={{ paddingLeft: 30 }} ><Icon style={{ fontSize: 35, color: 'white' }} name='create' /></Button>
                <Button style={{ marginLeft: 'auto', paddingRight: 30 }}><Icon style={{ fontSize: 35, color: 'white' }} name='trash' /></Button>
              </Card.Actions>
            </Card>
          </Content>
        </ScrollView>
        <Fab
          style={{ color: 'darkblue' }}
          active={this.state.active}
          containerStyle={{}}
          style={{ backgroundColor: '#6200ee' }}
          position="bottomRight"
          onPress={this.showDialog}
        >
          <Icon name="add" />
        </Fab>
        <Alert
          visible={this.state.visible}
          hideDialog={this.hideDialog}
          showDialog={this.showDialog}
          onSave={this.onSave}
        />
      </Container>
    );
  }
}
