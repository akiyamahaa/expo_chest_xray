import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'redux/stores';
import AboutScreen from 'screens/about/AboutScreen';
import GlobalStyles from 'utils/styles';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: 'rgb(255, 45, 85)',
  },
};

export default function App() {
  return (
    <SafeAreaProvider style={[styles.root, GlobalStyles.AndroidSafeArea]}>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer theme={MyTheme}>
            <SafeAreaView />
            <AboutScreen />
            <StatusBar style="auto" />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
