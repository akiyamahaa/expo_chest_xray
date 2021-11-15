import { useNavigation } from '@react-navigation/core';
import { Box, Text } from 'native-base';
import { TabStackProps } from 'navigation/interface';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';
import {
  INotification,
  NotiStatus,
} from 'utils/interfaces/notification.interface';
import { useDispatch } from 'react-redux';
import { updateNotificationById } from 'redux/actions/notification.action';

interface Props {
  data: INotification;
}

const NotiCard = (props: Props) => {
  const { data } = props;
  const navigation = useNavigation<TabStackProps['navigation']>();
  const dispatch = useDispatch();

  const onHandlePressNoti = async () => {
    const notiData = {
      doctorId: data.doctorId,
      patientId: data.patientId,
      content: data.content,
      status: NotiStatus.SEEN,
    };
    await dispatch(updateNotificationById(notiData, data.id));
    navigation.navigate('Patient', {
      screen: 'PatientDetail',
      params: { patientId: data.patientId },
    });
  };
  return (
    <TouchableOpacity onPress={onHandlePressNoti}>
      <Box
        style={[
          styles.root,
          {
            backgroundColor:
              data.status === NotiStatus.UNSEEN ? Colors.greenbg : '#fff',
          },
        ]}
      >
        <Text fontSize={18} color={Colors.textColor} numberOfLines={2}>
          {data.content}
        </Text>
      </Box>
    </TouchableOpacity>
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
