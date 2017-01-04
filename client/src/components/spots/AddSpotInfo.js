import React, { Component } from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, Dimensions } from 'react-native';
import CategoryModal from './CategoryModal';

const { width } = Dimensions.get('window');

class AddSpotInfo extends Component {
    render() {
        return (
            <ScrollView>
                <Text style={styles.labelStyle}>Title:</Text>
                <TextInput 
                style={styles.inputStyle}
                label='title'
                placeholder='Cool street art'
                //autocorrect={false}
                value={this.props.title}
                onChangeText={this.props.onTitleChange}
                />

                <Text style={styles.labelStyle}>Description: </Text>
                <TextInput 
                style={styles.inputStyle}
                label='description'
                placeholder='A large painting on a dumpster'
                value={this.props.description}
                onChangeText={this.props.onDescriptionChange}
                />

                <Text style={styles.labelStyle}>Category:</Text>
                <CategoryModal 
                    onCategoryChange={this.props.onCategoryChange} 
                    category={this.props.category}
                />

                <TouchableHighlight 
                    style={styles.buttonStyle}
                    onPress={this.props.onSubmit}
                >
                    <Text style={styles.buttonTextStyle}>Submit</Text>
                </TouchableHighlight>
            </ScrollView>
      );
    }
}

const styles = {
  labelStyle: {
    fontSize: 18,
    paddingBottom: 5,
    paddingTop: 20,
    flex: 1,
    alignSelf: 'center'
  },
  inputStyle: {
    alignSelf: 'center', 
    borderWidth: 1, 
    borderRadius: 2,
    borderColor: '#ccc', 
    padding: 10, 
    height: 40, 
    width: width - 30
  },
  buttonStyle: {
    backgroundColor: 'gray',
    width: 100,
    height: 40,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'center'
  }
};

export default AddSpotInfo;