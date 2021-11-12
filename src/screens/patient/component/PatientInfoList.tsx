import { Box, Icon, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';
import PatientCard from './PatientCard';
import { IPatient } from 'utils/interfaces/patient.interface';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import moment from 'moment';
import ContainerLayout from 'components/ContainerLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { getPatientsByDate } from 'redux/actions/care.action';
import { RootState } from 'redux/stores';
import { IUserState } from 'redux/reducers/user.reducer';

interface Props {}

const PatientInfoList = (props: Props) => {
  // REDUX STATE
  const user = useSelector<RootState>((state) => state.user) as IUserState;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [listPatient, setListPatient] = useState<IPatient[]>([]);

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');

    setDate(currentDate);
  };

  const onHandleGetPatients = async (byDate: Date, doctorId: number) => {
    const list = (await dispatch(
      getPatientsByDate(byDate, doctorId)
    )) as any as IPatient[];
    setListPatient(list);
  };

  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      onHandleGetPatients(date, user.id);
    });

    const unsubscribe = navigation.addListener('blur', () => {
      setListPatient([]);
      setDate(new Date());
    });

    return () => {
      subscribe();
    };
    // add two params to prevent get data from previous user_id
  }, [navigation, user.id]);

  useEffect(() => {
    onHandleGetPatients(date, user.id);
    return () => {
      setListPatient([]);
    };
  }, [date]);

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
        {listPatient.map((patient) => (
          <Box width="90%" key={patient.id}>
            <PatientCard data={patient} />
            <Box style={[styles.ruler]}></Box>
          </Box>
        ))}
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
