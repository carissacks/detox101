import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { NavigationProp, RouteProp, StackParamList } from './types/navigation';
import { users } from './__mocked__/data';

function HomeScreen() {
  const { reset } = useNavigation<NavigationProp<'Home'>>();
  const {
    params: { name },
  } = useRoute<RouteProp<'Home'>>();

  const onPressLeave = () => {
    reset({ routes: [{ name: 'Login' }], index: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back, {name}</Text>
      <Text style={styles.text}>You made it!</Text>
      <Text style={styles.text}>Leave</Text>
      <Text style={styles.text}>Now?</Text>
      <Button title="Leave" onPress={onPressLeave} />
    </View>
  );
}

function LoginScreen() {
  const { reset } = useNavigation<NavigationProp<'Login'>>();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onSubmit = () => {
    if (name === '' || password === '') {
      setError(
        'Tell me who you are along with the secret code, so I can identify you.',
      );
      return;
    }

    let user = users.find(
      ({ name: userName, password: userPassword }) =>
        name.toLowerCase() === userName && password === userPassword,
    );
    if (user) {
      setError(null);
      reset({ routes: [{ name: 'Home', params: { name } }], index: 0 });
      return;
    }

    setError('Sorry, we have never met before');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hey, welcome back!</Text>
      <TextInput
        onChangeText={setName}
        placeholder="who you - username"
        style={[styles.textInput, styles.marginBottom]}
      />
      <TextInput
        onChangeText={setPassword}
        placeholder="credentials here"
        secureTextEntry={true}
        style={[styles.textInput, styles.marginBottom]}
      />
      {!!error && <Text style={styles.text}>{error}</Text>}
      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
}

const Stack = createNativeStackNavigator<StackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  marginBottom: {
    marginBottom: 16,
  },
  title: {
    paddingBottom: 24,
    fontSize: 24,
  },
  text: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  textInput: {
    fontSize: 18,
    borderColor: '#EDEDED',
    borderWidth: 2,
    padding: 8,
    width: 300,
  },
});
