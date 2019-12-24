import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { Avatar, Card, Title, Chip } from 'react-native-paper';
import { Input, Icon, Item } from 'native-base';

export default class Alert extends Component {
  state = {
    text: '',
    inputTag: '',
    tags: [],
  };

  onTextChange = (text, name) => {
    this.setState({ [name]: text });
  };

  render() {
    const { visible, hideDialog, showDialog, onSave } = this.props;
    const { text, inputTag, tags } = this.state
    return (
      <View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content style={{ maxHeight: 400, minHeight: 200 }}>
              <ScrollView>
                <Item>
                  <Input
                    multiline
                    bordered placeholder="Write your note"
                    onTextChange={text => this.onTextChange(text, 'text')}
                    value={text}
                  />
                </Item>
                <Item style={{ marginTop: 20 }}>
                  <Input
                    multiline
                    bordered placeholder="Add tags"
                    onTextChange={text => this.onTextChange(text, 'inputTag')}
                    value={inputTag}
                  />
                  <Button transparent>
                    <Icon style={{ color: '#6200ee' }} name='add' />
                  </Button>
                </Item>
              </ScrollView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={onSave} style={{ marginLeft: 'auto' }}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal >
      </View >
    );
  }
}
