import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';
import { useNavigation } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';
import { IPatient } from 'utils/interfaces/patient.interface';
import { ConvertStatus, EStatus } from 'utils/constants';

interface Props {
  data: IPatient;
}

const PatientCard = (props: Props) => {
  const { data } = props;
  const navigation = useNavigation<PatientStackProps['navigation']>();

  const navigatePatientDetail = () => {
    navigation.navigate('PatientDetail', { patientId: data.id });
  };
  const name = data.fullname;
  return (
    <TouchableOpacity onPress={navigatePatientDetail}>
      <Box style={styles.root}>
        <Box flexDirection="row" alignItems="center" flexBasis="70%">
          <Box style={styles.avtStyle} flexBasis="30%">
            <Text
              color={Colors.textColor}
              fontSize={40}
              textTransform="uppercase"
            >
              {name.split(' ')[name.split(' ').length - 1].charAt(0)}
            </Text>
          </Box>
          <Box ml="2" flexBasis="70%">
            <Text fontSize={16}>Bệnh nhân</Text>
            <Text fontSize={20} bold numberOfLines={1}>
              {name}
            </Text>
          </Box>
        </Box>
        <Box flexBasis="30%" alignItems="flex-end">
          <Text
            fontSize={18}
            bold
            color={
              data.status === EStatus.IN_PROGRESS ? 'yellow.500' : 'green.500'
            }
          >
            {ConvertStatus[data.status || '']}
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
