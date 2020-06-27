import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeNavigator from '../navigation/HomeNavigator';
import CreateNavigator from '../navigation/CreateNavigator';
import Note from '../models/note';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  navigation.setOptions({ headerTitle: getHeaderTitle(routeName) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Navigator
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Navigator
        component={CreateNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(routeName) {
  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'CreateNote':
      return 'Create Note';
  }
}
