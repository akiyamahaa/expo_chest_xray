import { Box, Icon, Text } from 'native-base';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from 'utils/Colors';
import PatientCard from './PatientCard';
import GlobalStyles from 'utils/styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import moment from 'moment';
import ContainerLayout from 'components/ContainerLayout';

interface Props {}

const PatientInfoList = (props: Props) => {
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const { width } = Dimensions.get('screen');

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');

    setDate(currentDate);
  };

  return (
    <Box alignItems="center">
      {showDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Box m="4" style={styles.dateContainer}>
        <Box mr="2">
          <TouchableOpacity onPress={() => setShowDate(true)}>
            <Icon as={<Fontisto name="date" />} size={7} color={Colors.green} />
          </TouchableOpacity>
        </Box>
        <Text color={Colors.textColor} fontSize={20} ml="2">
          {moment(date).format('DD/MM/YYYY')}
        </Text>
      </Box>
      <ContainerLayout>
        <Box width="90%">
          <PatientCard />
          <Box style={[styles.ruler]}></Box>
        </Box>
        <Box width="90%">
          <PatientCard />
          <Box style={styles.ruler} />
        </Box>
      </ContainerLayout>
    </Box>
  );
};

const styles = StyleSheet.create({
  ruler: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.greenDark,
    marginHorizontal: '5%',
  },
  dateContainer: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.greenDark,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PatientInfoList;
