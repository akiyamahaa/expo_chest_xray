import React, { useState, useEffect, useRef } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'redux/stores';
import GlobalStyles from 'utils/styles';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import RootStack from 'navigation/RootStack';
import moment from 'moment';
// UPDATE MOMENT
moment.updateLocale('vi', null);


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: 'rgb(255, 45, 85)',
  },
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchFonts = () => {
    return Font.loadAsync({});
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <SafeAreaProvider style={[styles.root, GlobalStyles.AndroidSafeArea]}>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer theme={MyTheme}>
            {Platform.OS === 'android' && (
              <>
                <SafeAreaView />
                <StatusBar
                  style="auto"
                  translucent
                  backgroundColor="transparent"
                />
              </>
            )}
            <RootStack />
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
