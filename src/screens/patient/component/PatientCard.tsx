import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';

interface Props {}

const PatientCard = (props: Props) => {
  const navigation = useNavigation<PatientStackProps['navigation']>();

  const navigatePatientDetail = () => {
    navigation.navigate('PatientDetail');
  };
  const name = 'Nguyen Van Anh';
  return (
    <TouchableOpacity onPress={navigatePatientDetail}>
      <Box style={styles.root}>
        <Box flexDirection="row" alignItems="center">
          <Box style={styles.avtStyle}>
            <Text color={Colors.textColor} fontSize={40}>
              {name.split(' ')[name.split(' ').length - 1].charAt(0)}
            </Text>
          </Box>
          <Box ml="2">
            <Text fontSize={16}>Bệnh nhân</Text>
            <Text fontSize={20} bold>
              {name}
            </Text>
          </Box>
        </Box>
        <Box>
          <Text fontSize={18} bold>
            Dương tính
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 12,
  },
  avtStyle: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
});

export default PatientCard;
