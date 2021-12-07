import { Box, Image, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import getEnvVars from 'redux/enviroment';
import Colors from 'utils/Colors';
import { ESickStatus } from 'utils/constants';
import ResultXray from './ResultXray';

interface Props {
  data: any;
}
const { API_BASE_URL } = getEnvVars();
const XrayCard = (props: Props) => {
  const { data } = props;
  const [showModal, setShowModal] = useState(false);
  const {
    atypicalAppearance,
    indeterminateAppearance,
    negativePneumonia,
    typicalAppearance,
  } = data;
  const max_value = Math.max(
    atypicalAppearance,
    indeterminateAppearance,
    negativePneumonia,
    typicalAppearance
  );

  const getSickName = (value: number) => {
    switch (value) {
      case atypicalAppearance:
        return ESickStatus.ATYPICAL;
      case indeterminateAppearance:
        return ESickStatus.INDETERMINATE;
      case negativePneumonia:
        return ESickStatus.NEGATIVEPNEUMONIA;
      case typicalAppearance:
        return ESickStatus.TYPICAL;
    }
  };

  return (
    <>
      {showModal && (
        <ResultXray
          showModal={showModal}
          setShowModal={setShowModal}
          resultName={getSickName(max_value)}
        />
      )}
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Box style={styles.root}>
          <Box style={styles.imageStyle}>
            <Image
              source={{
                uri: `${API_BASE_URL}/uploads/${data.filepath}`,
              }}
              alt="image-xray"
              style={styles.imageStyle}
            />
          </Box>
          <Box padding={4} alignItems="center">
            <Text fontSize={20}>
              Kết quả chẩn đoán :{' '}
              <Text bold textTransform="uppercase">
                {getSickName(max_value)}
              </Text>
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    borderColor: Colors.green,
  },
  imageStyle: {
    width: '100%',
    height: 300,
    resizeMode: 'stretch',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  btnStyle: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default XrayCard;
