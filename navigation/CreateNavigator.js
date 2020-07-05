import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import CreateNoteDetailScreen from '../screens/CreateNoteDetailScreen';
import Note from '../models/Note';

const Stack = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Create';

export default function CreateNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  navigation.setOptions({ headerTitle: getHeaderTitle(routeName) });

  return (
    <Stack.Navigator>
       <Stack.Screen
        name="CreateNote"
        component={CreateNoteScreen}
        options={{
          title: 'Create Note',
        }}
        initialParams={{ data: new Note() }}
      />
      <Stack.Screen
        name="CreateNoteDetail"
        component={CreateNoteDetailScreen}
        options={({ route }) => ({ title: route.params.data.name })}
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
