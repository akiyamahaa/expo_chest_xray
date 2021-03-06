import Header from 'components/Header';
import { Box, Button, Image, ScrollView, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from 'utils/Colors';
import ResultXray from './component/ResultXray';
import XrayCard from './component/XrayCard';
import { useNavigation, useRoute } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';
import ContainerLayout from 'components/ContainerLayout';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/stores';
import { IUserState } from 'redux/reducers/user.reducer';
import { getProfileById } from 'redux/actions/patient.action';
import { IPatient } from 'utils/interfaces/patient.interface';
import { ConvertStatus, EStatus } from 'utils/constants';
import axios from 'axios';
import getEnvVars from 'redux/enviroment';
import { getXrayDiagnosis, getXrayImage } from 'redux/actions/xray.action';
import { IXrayInput } from 'utils/interfaces/xrayInput.interface';
import { IXrayDiagnosisState } from 'redux/reducers/xrayDiagnosis.reducer';

interface Props {}
const { API_BASE_URL } = getEnvVars();
const PatientDetail = (props: Props) => {
  // REDUX
  const user = useSelector<RootState>((state) => state.user) as IUserState;
  const xrayDiagnosis = useSelector<RootState>(
    (state) => state.xrayDiagnosis
  ) as IXrayDiagnosisState;
  // DISPATCH
  const dispatch = useDispatch();
  const navigation = useNavigation<PatientStackProps['navigation']>();
  const route = useRoute<any>();
  // STATE
  const [image, setImage] = useState(false);
  const [patient, setPatient] = useState<IPatient>({} as IPatient);
  const [listXray, setListXray] = useState<any>({});
  // GET PARAMS
  const patientId = route.params.patientId || '';

  const activeModal = () => {};

  const onGetXrayInput = async () => {
    const xray_result: IXrayInput[] = (await dispatch(
      getXrayImage(patientId)
    )) as any as IXrayInput[];
    // Convert xray arr -> xray obj with xrayInputId as key
    const xray_obj: any = xray_result.reduce(
      (obj, current) => ({
        ...obj,
        [current.id]: current,
      }),
      {}
    );
    if (Object.keys(xray_obj).length) {
      const diagnosis_obj = await onGetXrayDiagnosis(xray_obj);
      if (diagnosis_obj) {
        setListXray(diagnosis_obj);
      } else {
        setListXray(xray_obj);
      }
    }
  };

  const onGetXrayDiagnosis = async (xray_obj: any) => {
    const xray_diagnosis: any = await Promise.all(
      Object.keys(xray_obj).map((xray_id) =>
        dispatch(getXrayDiagnosis(Number(xray_id)))
      )
    );
    // TODO: FIX when not get diagnosis
    if (xray_diagnosis.length) {
      const input_diagnosis_obj: any = xray_diagnosis.reduce(
        (obj: any, current: any) => {
          if (current && xray_obj[current.xrayInputId]) {
            return {
              ...obj,
              [current.xrayInputId]: {
                ...current,
                ...xray_obj[current.xrayInputId],
              },
            };
          }
          // if current is null return obj
          return obj;
        },
        xray_obj
      );
      return input_diagnosis_obj;
    }
  };

  const getInfoPatient = async () => {
    const profile = (await dispatch(getProfileById(patientId))) as any;
    setPatient(profile.patient);
  };

  const onHandleUpload = async (image_uri: any) => {
    let localUri = image_uri;
    let filename = localUri.split('/').pop();
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    // Upload the image using the fetch and FormData APIs
    let formData: any = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('patientId', patientId);
    formData.append('image', { uri: localUri, name: filename, type });
    await axios
      .create({
        baseURL: API_BASE_URL,
        headers: {
          Authorization: user.token ? `Bearer ${user.token}` : '',
          contentType: 'multipart/form-data',
        },
      })
      .post('/uploads', formData);
    setImage(!image);
  };

  const pickImage = async () => {
    const { status: statusUpload } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (statusUpload !== 'granted') {
      return alert(
        'Xin l???i, ch??ng t??i c???n c???p quy???n truy c???p th?? m???c ????? c?? th??? t???i ???nh !!!'
      );
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onHandleUpload(result.uri);
    }
  };

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return alert(
        'Xin l???i, ch??ng t??i c???n truy c???p v??o m??y ???nh ????? s??? d???ng !!!'
      );
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      onHandleUpload(result.uri);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      onGetXrayInput();
      getInfoPatient();
    });
    return unsubscribe;
  }, [navigation, image]);

  // GET new image after upload
  useEffect(() => {
    // CHECK MOUNT - UNMOUNT
    let isUnMount = false;
    if (!isUnMount) {
      onGetXrayInput();
    }
    return () => {
      isUnMount = true;
    };
  }, [image, xrayDiagnosis.isGetNewStatus]);

  return (
    <SafeAreaView>
      <Header
        title="Th??ng tin b???nh nh??n"
        showBackBtn={true}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <ContainerLayout>
          {/* Common Info about Patient */}
          <Box style={{ width: '90%' }} p="4">
            <Box style={styles.flexModel}>
              <Text style={styles.title}>B???nh nh??n</Text>
              <Text style={styles.subTitle}>{patient.fullname}</Text>
            </Box>
            <Box style={styles.flexModel}>
              <Text style={styles.title}>B??c s?? ph??? tr??ch</Text>
              <Text style={styles.subTitle}>{user.fullname}</Text>
            </Box>
            <Box style={styles.flexModel}>
              <Text style={styles.title}>Tr???ng th??i</Text>
              <Text
                style={styles.subTitle}
                color={
                  patient.status === EStatus.IN_PROGRESS
                    ? 'yellow.500'
                    : 'green.500'
                }
              >
                {ConvertStatus[patient.status]}
              </Text>
            </Box>
          </Box>
          {/* Upload Action */}
          <Box width="90%" mt="3">
            <Button.Group
              mx={{
                base: 'auto',
                md: 0,
              }}
              width="100%"
              mb="5"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              <Button width="45%" colorScheme="teal" onPress={captureImage}>
                Ch???p ???nh
              </Button>
              <Button width="45%" colorScheme="teal" onPress={pickImage}>
                T???i ???nh
              </Button>
            </Button.Group>
            {/* <Button
              width="100%"
              colorScheme="teal"
              onPress={onGetXrayDiagnosis}
            >
              L???y chu???n ??o??n
            </Button> */}
          </Box>
          {/* List Card Result */}
          <Box width="90%" mt="5">
            {Object.keys(listXray).length > 0 &&
              Object.keys(listXray).map((item: any) => (
                <Box mb="4" key={item}>
                  <XrayCard data={listXray[item]} />
                </Box>
              ))}
          </Box>
        </ContainerLayout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexModel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  title: {
    fontSize: 20,
    color: Colors.textColor,
  },
  subTitle: {
    fontSize: 20,
  },
});

export default PatientDetail;
