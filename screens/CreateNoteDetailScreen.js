import React, { useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { Platform, StyleSheet, Text, Button, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { setNote } from '../dao/NoteDao';
import Note from '../models/Note';

export default function CreateNoteDetailScreen({ navigation, route }) {
  const [data, setData] = useState(route.params.data);
  navigation.setOptions({
    headerRight: () => (
      <Button title="save" onPress={() => { setNote(data).then(() => {
        navigation.dispatch(StackActions.popToTop());
        navigation.dispatch(StackActions.replace('CreateNote', { data: new Note() }));
        navigation.navigate('Home');
      }) }} />
    ),
    title: data.info.name ? data.info.name : "NO NAME"
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <TextInput
          style={{height: 40}}
          placeholder="notes"
          onChangeText={(changed) => { data.notes = changed; setData(data); }}
        />

        <View>
          <Text>Color</Text>
        </View>
        
        {['aroma', 'plate'].map(key => (
          <View key={key} style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>{key}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

CreateNoteDetailScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    alignItems:'center', 
    justifyContent:'center'
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
    marginLeft: 20
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
