import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Chip, Dialog, Portal } from 'react-native-paper';
import { Input, Icon, Item, Textarea } from 'native-base';

export default class Alert extends Component {
  state = {
    text: '',
    date: '',
    inputTag: '',
    tags: [],
  };

  componentWillReceiveProps(nextProps) {
    const { indexEdit, isEdit, notes } = nextProps;
    if (isEdit) {
      const notesArray = notes.slice();
      const note = notesArray.splice(indexEdit, 1);
      this.setState({
        text: note[0].text,
        date: note[0].date,
        tags: note[0].tags,
        inputTag: '',
      });
    } else {
      this.setState({
        text: '',
        date: '',
        inputTag: '',
        tags: [],
      });
    }
  }

  onTextChange = (text, name) => {
    this.setState({ [name]: text });
  };

  addTag = () => {
    let tagsArray = this.state.tags;
    tagsArray.push(this.state.inputTag);
    this.setState({ tags: tagsArray, inputTag: '' });
  }

  removeTag = (index) => {
    let tagsArray = this.state.tags;
    tagsArray.splice(index, 1);
    this.setState({ tags: tagsArray });
  }

  onSaveNote = () => {
    this.props.onSave(this.state)
    this.setState({
      text: '',
      inputTag: '',
      tags: [],
    })
    this.props.hideDialog();
  }

  render() {
    const { visible, hideDialog } = this.props;
    const { text, inputTag, tags } = this.state
    return (
      <View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}>
            <Dialog.Title>Your note</Dialog.Title>
            <Dialog.Content style={{ maxHeight: 400, minHeight: 400 }}>
              <Textarea
                rowSpan={4}
                bordered placeholder="Write your note"
                onChangeText={text => this.onTextChange(text, 'text')}
                value={text}
              />
              <Item style={{ marginTop: 20 }}>
                <Input
                  bordered placeholder="Add tags"
                  onChangeText={text => this.onTextChange(text, 'inputTag')}
                  value={inputTag}
                />
                <Icon onPress={this.addTag} style={{ fontSize: 30, color: '#6200ee' }} name='add-circle' />
              </Item>
              <ScrollView >
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  {tags.map((tag, index) => (
                    <Chip
                      onClose={() => this.removeTag(index)}
                      key={index}
                      style={{ marginTop: 10 }}
                    >
                      {tag}
                    </Chip>
                  ))}
                </View>
              </ScrollView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button
                disabled={!text}
                onPress={this.onSaveNote}
                style={{ marginLeft: 'auto' }}
              >
                Save
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal >
      </View >
    );
  }
}
