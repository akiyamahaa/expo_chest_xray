import Header from 'components/Header';
import { Box, Button, Image, ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from 'utils/Colors';
import ResultXray from './component/ResultXray';
import XrayCard from './component/XrayCard';
import { useNavigation } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';
import GlobalStyles from 'utils/styles';
import ContainerLayout from 'components/ContainerLayout';
import * as ImagePicker from 'expo-image-picker';

interface Props {}

const PatientDetail = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<PatientStackProps['navigation']>();
  const [image, setImage] = useState('');

  const activeModal = () => {
    setShowModal(true);
  };

  const pickImage = async () => {
    const { status: statusUpload } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (statusUpload !== 'granted') {
      return alert(
        'Xin lỗi, chúng tôi cần cấp quyền truy cập thư mục để có thể tải ảnh !!!'
      );
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      return alert(
        'Xin lỗi, chúng tôi cần truy cập vào máy ảnh để sử dụng !!!'
      );
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView>
      {showModal && (
        <ResultXray showModal={showModal} setShowModal={setShowModal} />
      )}
      <ScrollView>
        <Header
          title="Thông tin bệnh nhân"
          showBackBtn={true}
          onPress={() => navigation.goBack()}
        />
        <ContainerLayout>
          {/* Common Info about Patient */}
          <Box style={{ width: '90%' }} p="4">
            <Box style={styles.flexModel}>
              <Text style={styles.title}>Bệnh nhân</Text>
              <Text style={styles.subTitle}>Nguyen Van A</Text>
            </Box>
            <Box style={styles.flexModel}>
              <Text style={styles.title}>Bác sĩ phụ trách</Text>
              <Text style={styles.subTitle}>Nguyen Van á</Text>
            </Box>
            <Box style={styles.flexModel}>
              <Text style={styles.title}>Trạng thái</Text>
              <Text style={styles.subTitle}>Dương tính</Text>
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
            >
              <Button width="45%" colorScheme="teal" onPress={captureImage}>
                Chụp ảnh
              </Button>
              <Button width="45%" onPress={pickImage}>
                Tải ảnh
              </Button>
            </Button.Group>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ height: 200, resizeMode: 'contain' }}
                alt="image-input"
                key={image}
              />
            )}
          </Box>
          {/* List Card Result */}
          <Box width="90%">
            <Box mb="4">
              <XrayCard onPress={activeModal} />
            </Box>
            <Box mb="4">
              <XrayCard onPress={activeModal} />
            </Box>
            <Box mb="4">
              <XrayCard onPress={activeModal} />
            </Box>
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
    color: Colors.textColor,
  },
});

export default PatientDetail;
