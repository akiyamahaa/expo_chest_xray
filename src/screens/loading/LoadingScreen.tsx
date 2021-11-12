import { Box, Image } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

interface Props {}

const LoadingScreen = (props: Props) => {
  const { width, height } = Dimensions.get('screen');
  return (
    <Box flex={1}>

    </Box>
  );
};

const styles = StyleSheet.create({
  
})

export default LoadingScreen;
