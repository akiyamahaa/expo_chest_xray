import { Box, Image, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import getEnvVars from 'redux/enviroment';
import Colors from 'utils/Colors';

interface Props {
  onPress: () => void;
  data: any;
}
const { API_BASE_URL } = getEnvVars();
const XrayCard = (props: Props) => {
  const { onPress, data } = props;
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
  const symptom_list: {
    [key: string]: {
      name: string;
      value: number;
      color: string;
    };
  } = {
    atypicalAppearance: {
      name: 'Atypical',
      value: atypicalAppearance || 0,
      color: max_value === atypicalAppearance ? 'red.700' : '#000',
    },
    indeterminateAppearance: {
      name: 'Indeterminate',
      value: indeterminateAppearance || 0,
      color: max_value === indeterminateAppearance ? 'red.700' : '#000',
    },
    negativePneumonia: {
      name: 'Negative Pneumonia',
      value: negativePneumonia || 0,
      color: max_value === negativePneumonia ? 'red.700' : '#000',
    },
    typicalAppearance: {
      name: 'Typical',
      value: typicalAppearance || 0,
      color: max_value === typicalAppearance ? 'red.700' : '#000',
    },
  };

  return (
    <TouchableOpacity onPress={onPress}>
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
        <Box flexDirection="row" justifyContent="space-between" flexWrap="wrap">
          {Object.keys(symptom_list).map((item) => (
            <Box
              p="4"
              alignItems="center"
              key={item}
              width="50%"
              borderWidth={0.5}
            >
              <Text fontSize={14} bold>
                {symptom_list[item].name}
              </Text>
              <Text fontSize={16} color={symptom_list[item].color}>
                {symptom_list[item].value}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </TouchableOpacity>
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
