import { Box, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from 'utils/Colors';

interface Props {}

const PatientOverview = (props: Props) => {
  const infoPatient = [
    {
      id: 1,
      title: 'Số bệnh nhân',
      quantity: 40,
      color: '#fff',
    },
    {
      id: 2,
      title: 'Đang đợi chuẩn đoán',
      quantity: 40,
      color: 'red.300',
    },
    {
      id: 3,
      title: 'Đã có kết quả',
      quantity: 40,
      color: 'green.300',
    },
  ];
  return (
    <Box style={{ width: '90%' }}>
      <Box>
        <Text color={Colors.green} fontSize={22} bold>
          Hôm nay
        </Text>
      </Box>
      <Box style={styles.root} borderRadius={20} marginY="4">
        <Box paddingX={10} paddingY={5} justifyContent="space-between">
          {infoPatient.map((info) => (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              key={info.id}
            >
              <Text color="#fff" fontSize={18}>
                {info.title}
              </Text>
              <Text color={info.color} fontSize={22} bold>
                {info.quantity}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.greenDark,
  },
  textStyle: {
    color: '#fff',
  },
});

export default PatientOverview;
