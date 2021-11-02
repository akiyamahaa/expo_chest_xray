import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from 'utils/Colors';

interface Props {
  unseen?: boolean;
}

const NotiCard = (props: Props) => {
  const { unseen = true } = props;
  return (
    <Box
      style={[
        styles.root,
        { backgroundColor: unseen ? Colors.greenbg : '#fff' },
      ]}
    >
      <Text fontSize={18} color={Colors.textColor} numberOfLines={2}>
        This is notification text,
      </Text>
    </Box>
  );
};
const styles = StyleSheet.create({
  root: {
    padding: 12,
    borderBottomWidth: 0.4,
    height: 80,
    justifyContent: 'center',
  },
});

export default NotiCard;
