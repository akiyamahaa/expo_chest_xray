import { Box, Image, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';

interface Props {
  onPress: () => void;
  image_uri: string;
}

const XrayCard = (props: Props) => {
  const { onPress, image_uri } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={styles.root}>
        <Box style={styles.imageStyle}>
          <Image
            source={{
              uri: image_uri,
            }}
            alt="image-xray"
            style={styles.imageStyle}
          />
        </Box>
        <Box p="4">
          <Text>ABC XYZ</Text>
          <Text>ABC XYZ</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 0.5,
    borderRadius: 20,
    width: '100%',
    paddingBottom: 20,
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
