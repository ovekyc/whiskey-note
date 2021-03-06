import React, { useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { Image, Platform, StyleSheet, Text, Button, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { delNote } from '../dao/NoteDao';

export default function ShowNoteScreen({ navigation, route }) {
  const [data, setData] = useState(route.params.data);
  navigation.setOptions({
    headerRight: () => (
      <Button title="edit" onPress={() => { 
        navigation.dispatch(StackActions.replace('Home', {})); 
        navigation.dispatch(StackActions.popToTop()); 
      }}/>
    ),
    title: data.info.name ? data.info.name : "NO NAME"
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View key="infomation-view" style={styles.informationContainer}>
          {Object.keys(data.info).filter(key => key !== "name").map(key => (
            <View key={key} style={styles.informationItem}>
              <Text style={styles.getStartedText}>{key}</Text>
              <Text style={styles.getStartedText}>{data.info[key]}</Text>
            </View>
          ))}
        </View>

        

        <Button title='delete' onPress={() => {
          delNote(data.id).then(() => {
            navigation.dispatch(StackActions.popToTop('Home'));
            navigation.dispatch(StackActions.replace('Home', { notes: [] }));
          })
        }}/>
      </ScrollView>
    </View>
  );
}

ShowNoteScreen.navigationOptions = {
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
  informationContainer: {
    flexDirection: 'col',
    marginHorizontal: 50,
    alignItems:'center', 
    justifyContent:'center'
  },
  informationItem: {
    flexDirection: 'col',
    marginHorizontal: 50,
    alignItems:'center', 
    justifyContent:'center'
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
