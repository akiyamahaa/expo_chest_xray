import { Box, Image } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';

interface Props {}

const LoadingScreen = (props: Props) => {
  const { width, height } = Dimensions.get('screen');
  return (
    <Box flex={1}>
      <Image
        style={{ width, height }}
        source={require('assets/images/loading-bg.png')}
        alt="loading-bg"
      />
    </Box>
  );
};

export default LoadingScreen;
