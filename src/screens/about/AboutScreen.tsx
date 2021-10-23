import React, { useState, useEffect, useCallback } from 'react';
import { Box, Image, ScrollView, Text } from 'native-base';
import {SafeAreaView } from 'react-native';

interface Props {}

const AboutScreen = (props: Props) => {

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Text>This is About Page</Text>
          {listStar.map((star) => (
            <Box key={star.name}> 
              <Text>{star.name}</Text>
              <Text>{star.desc}</Text>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
