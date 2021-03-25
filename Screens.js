/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';

function HomeScreen0(props) {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(isFocused);
  }, [isFocused]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Bro {String(isFocused)} HomeScreen0</Text>
      <Button
        title="Go to About"
        onPress={() => props.navigation.navigate('Home1')}
      />
    </View>
  );
}
function HomeScreen1(props) {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(isFocused);
  }, [isFocused]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Bro {String(isFocused)} HomeScreen1</Text>
      <Button
        title="Go to About"
        onPress={() => props.navigation.navigate('Home0')}
      />
    </View>
  );
}
function HomeScreen3(props) {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(isFocused);
  }, [isFocused]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Bro {String(isFocused)} HomeScreen3</Text>
      <Button
        title="Go to About"
        onPress={() => props.navigation.navigate('Home2')}
      />
    </View>
  );
}
function HomeScreen2(props) {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(isFocused);
  }, [isFocused]);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Bro {String(isFocused)} HomeScreen2</Text>
      <Button
        title="Go to About"
        onPress={() => props.navigation.navigate('Home3')}
      />
    </View>
  );
}

// function Check(props) {
//   return <Text>{JSON.stringify(props)}</Text>;
// }

const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home1" component={HomeScreen1} />
      <Stack.Screen name="Home2" component={HomeScreen2} />
      <Stack.Screen name="Home3" component={HomeScreen3} />
      <Stack.Screen name="Home0" component={HomeScreen0} />
      <Stack.Screen name="Home5" component={HomeScreen0} />
      <Stack.Screen name="Home6" component={HomeScreen0} />
      <Stack.Screen name="Home7" component={HomeScreen0} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(isFocused);
  }, [isFocused]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bro {String(isFocused)} Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log(isFocused);
  }, [isFocused]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Bro {String(isFocused)} Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Stacks" component={Stacks} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
