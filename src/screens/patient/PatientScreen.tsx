import { Box, Button, Icon, Image, Input, ScrollView, Text } from 'native-base';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Header from 'components/Header';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from 'utils/Colors';
import PatientInfoList from './component/PatientInfoList';
import { useNavigation } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';

interface Props {}

const PatientScreen = (props: Props) => {
  const navigation = useNavigation<PatientStackProps['navigation']>();
  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Header title="Hồ sơ bệnh nhân" />
        </Box>
        <Box style={styles.searchContainer} mt="4" p="2">
          <Button
            endIcon={
              <Icon as={MaterialCommunityIcons} name="account-plus" size="sm" />
            }
            backgroundColor={Colors.green}
            _pressed={{
              backgroundColor: Colors.greenDark,
            }}
            size="lg"
            onPress={() => navigation.navigate('PatientCreate')}
          >
            Tạo hồ sơ bệnh nhân
          </Button>
        </Box>
        <Box>
          <PatientInfoList />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 12,
  },
});

export default PatientScreen;
