import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Const } from '../constants';
import { Container, Header, Input, Content, Fab, Body, Icon, Text, Item } from 'native-base';
import Alert from './alert';
import { Avatar, Button, Card, Title, Paragraph, Chip } from 'react-native-paper';
import { AsyncStorage } from 'react-native';

export default class BodyComponent extends Component {
  state = {
    filteredNotes: [],
    notes: [],
    serchValue: '',
    visible: false,
    isEdit: false,
    indexEdit: '',
  };

  async componentDidMount() {
    try {
      const value = await AsyncStorage.getItem('notes');
      if (value !== null) {
        this.setState({ notes: JSON.parse(value), filteredNotes: JSON.parse(value), })
      } else {
        await AsyncStorage.setItem('notes', "[]");
      }
    } catch (error) {
      throw new Error('Уупс!');
    }
  }

  clearSearch = () => this.setState({ serchValue: '', filteredNotes: this.state.notes });

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  onSave = async (note) => {
    const myNotes = this.state.notes.slice();;
    if (this.state.isEdit) {
      myNotes.splice(this.state.indexEdit, 1);
    }
    myNotes.unshift({ text: note.text, tags: note.tags, date: new Date() });
    this.setState({ notes: myNotes, filteredNotes: myNotes, isEdit: false, indexEdit: '' });
    await AsyncStorage.setItem('notes', JSON.stringify(myNotes));
    this.rerenderNotes(this.state.serchValue);
    this.hideDialog();
  }

  editNote = (index) => {
    this.setState({ isEdit: true, indexEdit: index });
    this.showDialog();
  }

  deleteNote = async (index) => {
    const myNotes = this.state.notes;
    myNotes.splice(index, 1);
    this.setState({ notes: myNotes, filteredNotes: myNotes });
    await AsyncStorage.setItem('notes', JSON.stringify(myNotes));
  }

  onSearchTextChange = text => {
    this.rerenderNotes(text);
    this.setState({ serchValue: text });
  };

  rerenderNotes = (text) => {
    const filtered = []

    for (const note of this.state.notes) {
      for (const tag of note.tags) {
        if (tag.match(text)) {
          filtered.push(note);
        }
      }
    }
    this.setState({ filteredNotes: filtered });
  }
  render() {
    const { filteredNotes, notes, serchValue } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: '#6200ee' }}>
          <Body>
            <Title style={{ color: 'white' }}>
              Diary
            </Title>
          </Body>
        </Header>
        <Item>
          <Input
            bordered
            onChangeText={text => this.onSearchTextChange(text)}
            value={this.state.serchValue} placeholder="Search by tag"
          />
          <Button transparent onPress={this.clearSearch} >
            <Icon style={{ fontSize: 30, color: '#6200ee' }} name='close' />
          </Button>
        </Item>
        <ScrollView>
          <Content>
            {!serchValue && filteredNotes.length === 0 ? <Text>Have no notes</Text> : <></>}
            {filteredNotes.map((note, index) => (
              <Card
                key={index}
                style={{ backgroundColor: '#be8fff', margin: 10 }}
              >
                <Card.Title
                  title={`${new Date(note.date).getDate() < 10 ? '0' + new Date(note.date).getDate()
                    : new Date(note.date).getDate()} ${Const.months[new Date(note.date).getMonth()]} ${new Date(note.date).getFullYear()} at ${new Date(note.date).getHours()}:${new Date(note.date).getMinutes()}`}
                  left={(props) => <Avatar.Icon {...props} style={{ fontSize: 35, color: 'darkblue' }} icon="heart"
                  />}
                />
                <Card.Content style={{ backgroundColor: '#eeebff', padding: 20 }}>
                  <Paragraph style={{ fontSize: 17 }}>{note.text}</Paragraph>
                </Card.Content>
                <Card.Content style={{ backgroundColor: '#eeebff', padding: 20 }}>
                  <View style={{ flex: 1, alignItems: 'flex-start' }}>
                    {note.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        style={{ backgroundColor: '#be8fff', marginBottom: 7 }}
                      >{tag}</Chip>
                    ))}
                  </View>
                </Card.Content>
                <Card.Actions style={{ backgroundColor: '#332863' }} >
                  <Button
                    style={{ paddingLeft: 30 }}
                    onPress={() => this.editNote(index)}
                  >
                    <Icon style={{ fontSize: 30, color: 'white' }} name='create' />
                  </Button>
                  <Button
                    style={{ marginLeft: 'auto', paddingRight: 30 }}
                    onPress={() => this.deleteNote(index)}
                  >
                    <Icon style={{ fontSize: 30, color: 'white' }} name='trash' />
                  </Button>
                </Card.Actions>
              </Card>
            ))}
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
          isEdit={this.state.isEdit}
          indexEdit={this.state.indexEdit}
          notes={this.state.notes}
        />
      </Container>
    );
  }
}
