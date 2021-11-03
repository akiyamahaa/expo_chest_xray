import { Box, Button, Image, Modal, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from 'utils/Colors';

interface Props {
  showModal: boolean;
  setShowModal: any;
}

const ResultXray = (props: Props) => {
  const { showModal, setShowModal } = props;
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content width="100%">
        <Modal.CloseButton />
        <Modal.Header alignItems="center">KẾT QUẢ CHI TIẾT</Modal.Header>
        <Modal.Body>
          <Box style={styles.imageStyle}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
              }}
              alt="image-xray"
              style={styles.imageStyle}
            />
          </Box>
          <Box mt="4">
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
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
