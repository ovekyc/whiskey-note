import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import HomeNavigator from './navigation/HomeNavigator';
import CreateNavigator from './navigation/CreateNavigator';
import TabBarIcon from './components/TabBarIcon';
import Note from './models/Note';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
            <BottomTab.Screen
              name="Home"
              component={HomeNavigator}
              options={{
                title: 'Get Started',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
              }}
            />
            <BottomTab.Screen
              name="CreateNote"
              component={CreateNavigator}
              options={{
                title: 'CreateNote',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
              }}
              initialParams={{ data: new Note() }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
