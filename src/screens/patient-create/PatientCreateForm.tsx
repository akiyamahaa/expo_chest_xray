import Header from 'components/Header';
import InputGroup from 'components/InputGroup';
import { Box, Image, ScrollView, Button, Text, useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Colors from 'utils/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';
import ContainerLayout from 'components/ContainerLayout';
import { useDispatch, useSelector } from 'react-redux';
import { createPatient } from 'redux/actions/patient.action';
import { IPatient } from 'utils/interfaces/patient.interface';
import { RootState } from 'redux/stores';
import { IUserState } from 'redux/reducers/user.reducer';

interface Props {}

const PatientCreateForm = (props: Props) => {
  // REDUX STATE
  const user = useSelector<RootState>((state) => state.user) as IUserState;

  const dispatch = useDispatch();

  const navigation = useNavigation<PatientStackProps['navigation']>();
  const toast = useToast();
  // STATE
  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

  const disableButton = !fullname || !phone;

  const createProfile = async () => {
    // API CREATE HERE
    const patientData = {
      fullname,
      phone,
      note,
    };
    const create_result = (await dispatch(
      createPatient(patientData, user.id)
    )) as any as IPatient;
    if (create_result) {
      toast.show({
        status: 'success',
        title: 'Tạo hồ sơ thành công',
        placement: 'top',
      });
      navigation.navigate('PatientScreen');
    } else {
      toast.show({
        status: 'error',
        title: 'Số điện thoại không hợp lệ',
        placement: 'top',
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Header
            title="Tạo hồ sơ bệnh nhân"
            showBackBtn={true}
            onPress={() => navigation.goBack()}
          />
        </Box>
        <ContainerLayout>
          <Box width="90%" mt="3">
            <Text fontSize={20} color={Colors.textColor} mb="2">
              Họ tên
            </Text>
            <InputGroup
              placeholder="Nhập họ tên ..."
              text={fullname}
              setText={setFullName}
            />
          </Box>
          <Box width="90%" mt="3">
            <Text fontSize={20} color={Colors.textColor} mb="2">
              Số điện thoại
            </Text>
            <InputGroup placeholder="+84..." text={phone} setText={setPhone} />
          </Box>
          <Box width="90%" mt="3">
            <Text fontSize={20} color={Colors.textColor} mb="2">
              Ghi chú
            </Text>
            <InputGroup
              placeholder="Nhập ghi chú ..."
              text={note}
              setText={setNote}
              multiline={true}
              numberOfLines={5}
            />
          </Box>
          <Box width="90%" mt="3">
            <Button
              width="100%"
              colorScheme={disableButton ? 'gray' : 'teal'}
              onPress={createProfile}
              disabled={disableButton}
            >
              Tạo hồ sơ
            </Button>
          </Box>
        </ContainerLayout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientCreateForm;
