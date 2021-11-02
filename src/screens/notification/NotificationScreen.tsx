import React, { useState, useEffect, useCallback } from 'react';
import { Box, Image, ScrollView, Text } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from 'components/Header';
import NotiCard from './component/NotiCard';

interface Props {}

const NotificationScreen = (props: Props) => {
  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Header title="Thông báo" />
        </Box>
        <Box style={styles.paddingBottom}>
          <NotiCard />
          <NotiCard />
          <NotiCard />
          <NotiCard />
          <NotiCard />
          <NotiCard />
          <NotiCard />
          <NotiCard />
          <NotiCard />
          <NotiCard />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paddingBottom: {
    marginBottom: 80,
  },
});

export default NotificationScreen;
