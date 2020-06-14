import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Create';

export default function HomeNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  navigation.setOptions({ headerTitle: getHeaderTitle(routeName) });

  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
    </Stack.Navigator>
  );
}

function getHeaderTitle(routeName) {
  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'CreateNote':
      return 'Create Note';
    case 'Links':
      return 'Links to learn more';
  }
}
