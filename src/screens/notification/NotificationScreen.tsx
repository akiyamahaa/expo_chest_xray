import React, { useState, useEffect, useCallback } from 'react';
import { Box, Image, ScrollView, Text } from 'native-base';
import { SafeAreaView } from 'react-native';

interface Props {}

const NotificationScreen = (props: Props) => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Text>NOtification Page</Text>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
