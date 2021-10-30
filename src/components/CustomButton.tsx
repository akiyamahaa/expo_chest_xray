import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';

interface Props {
  title: string;
  onPress: () => void;
  width?: number;
  height?: number;
}

const CustomButton = (props: Props) => {
  const { title, onPress, width, height } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Box style={[styles.btnStyle, { width, height }]} borderRadius={10}>
        <Text color="#fff" bold>
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
    padding: 12,
  },
});

export default CustomButton;
