import Header from 'components/Header';
import InputGroup from 'components/InputGroup';
import { Box, Image, ScrollView, Button, Text, useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Colors from 'utils/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';
import GlobalStyles from 'utils/styles';
import ContainerLayout from 'components/ContainerLayout';

interface Props {}

const PatientCreateForm = (props: Props) => {
  const navigation = useNavigation<PatientStackProps['navigation']>();
  const toast = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [image, setImage] = useState('');
  const [note, setNote] = useState('');

  const disableButton = !name || !phone || !image;

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

  const createProfile = async () => {
    // TODO: API CREATE HERE
    toast.show({
      status: 'success',
      title: 'Tạo hồ sơ thành công',
      placement: 'top',
    });
    navigation.navigate('PatientScreen');
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
              text={name}
              setText={setName}
            />
          </Box>
          <Box width="90%" mt="3">
            <Text fontSize={20} color={Colors.textColor} mb="2">
              Số điện thoại
            </Text>
            <InputGroup
              placeholder="Nhập Số điện thoại ..."
              text={phone}
              setText={setPhone}
            />
          </Box>
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
