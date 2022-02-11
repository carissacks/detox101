import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { NavigationProp, RouteProp, StackParamList } from './types/navigation';
import { songs, users } from './__mocked__/data';

function HomeScreen() {
  const { reset } = useNavigation<NavigationProp<'Home'>>();
  const {
    params: { name },
  } = useRoute<RouteProp<'Home'>>();

  const onPressLeave = () => {
    reset({ routes: [{ name: 'Login' }], index: 0 });
  };

  return (
    <FlatList
      data={songs}
      keyExtractor={(_, idx) => `songs-${idx}`}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text>{item.singer}</Text>
        </View>
      )}
      ListHeaderComponent={() => (
        <>
          <Text style={styles.title}>Welcome back, {name}</Text>
          <Text style={styles.title}>Your Songs</Text>
        </>
      )}
      ListFooterComponent={() => (
        <>
          <Text style={styles.text}>End of List</Text>
          <Button title="Leave" onPress={onPressLeave} />
        </>
      )}
      style={styles.songContainer}
      contentContainerStyle={styles.songContentContainer}
    />
  );
}

function LoginScreen() {
  const { reset } = useNavigation<NavigationProp<'Login'>>();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (name === '' || password === '') {
      setError('Tell me who you are.');
      return;
    }

    let user = users.find(
      ({ name: userName, password: userPassword }) =>
        name.toLowerCase() === userName && password === userPassword,
    );
    if (user) {
      setError(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        reset({ routes: [{ name: 'Home', params: { name } }], index: 0 });
      }, 3000);
      return;
    }

    setError('Sorry, we have never met before');
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Hey, welcome back!</Text>
        <TextInput
          onChangeText={setName}
          placeholder="who you - username"
          testID="username"
          style={[styles.textInput, styles.marginBottom]}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="credentials here"
          secureTextEntry={true}
          testID="password"
          style={[styles.textInput, styles.marginBottom]}
        />
        {!!error && <Text style={styles.text}>{error}</Text>}
        {loading && <Text style={styles.text}>Loading...</Text>}
        <Button title="Submit" onPress={onSubmit} />
      </View>
    </ScrollView>
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
    paddingVertical: 24,
  },
  item: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  itemTitle: {
    fontSize: 20,
    paddingBottom: 4,
  },
  marginBottom: {
    marginBottom: 16,
  },
  songContainer: {
    flexGrow: 1,
    width: '100%',
  },
  songContentContainer: {
    padding: 24,
    backgroundColor: '#EDEDED',
  },
  title: {
    paddingBottom: 24,
    fontSize: 24,
  },
  text: {
    fontSize: 18,
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
