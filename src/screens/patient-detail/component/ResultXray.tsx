import { Box, Button, Image, Modal, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from 'utils/Colors';
import { ESickStatus } from 'utils/constants';

interface Props {
  showModal: boolean;
  setShowModal: any;
  resultName: any;
}

const result_diagnosis: { [key: string]: string[] } = {
  [ESickStatus.ATYPICAL]: [
    'Tổn thương kính mờ hai bên, ngoại biên, đa ổ là chủ đạo',
    'Tổn thương kính mờ lan tỏa hai bên, cả ngoại biên và trung tâm (ví dụ: hình ảnh ARDS)',
    'Tổn thương kính mờ lan tỏa hai bên kèm xơ hóa/ giảm thể tích phổi (ở bệnh nhân ARDS kéo dài)',
  ],
  [ESickStatus.INDETERMINATE]: [
    'Tổn thương mờ ưu thế vùng trên phổi (ví dụ: lao phổi, Sarcoidosis, xạ trị)',
    'Mờ một bên phổi, ngay cả khi đa ổ',
    'Mờ vùng trung tâm, không tổn thương ngoại biên (hình cánh bướm, không giống ARDS lan tỏa). Ví dụ: phù phổi do tim, viêm phổi PCP',
  ],
  [ESickStatus.NEGATIVEPNEUMONIA]: [
    'Tràn khí màng phổi không hình ảnh viêm phổi',
    'Tràn dịch màng phổi không hình ảnh viêm phổi',
    '(Các) khối hoặc nốt',
    'Viêm phổi thùy (ví dụ: Viêm phổi cộng đồng)',
    'Sẹo/xơ',
  ],
  [ESickStatus.TYPICAL]: ['Không tổn thương mờ'],
};

const ResultXray = (props: Props) => {
  const { showModal, setShowModal, resultName } = props;
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content width="100%">
        <Modal.CloseButton />
        <Modal.Header alignItems="center">KẾT QUẢ CHI TIẾT</Modal.Header>
        <Modal.Body>
          {/* <Box style={styles.imageStyle}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
              }}
              alt="image-xray"
              style={styles.imageStyle}
            />
          </Box> */}
          <Box mt="4">
            {result_diagnosis[resultName].map((conclude) => (
              <Text key={conclude}>• {conclude}</Text>
            ))}
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2} justifyContent="center" width="100%">
            <Button
              onPress={() => {
                setShowModal(false);
              }}
              backgroundColor={Colors.green}
            >
              Thu nhỏ
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
  },
});

export default ResultXray;
