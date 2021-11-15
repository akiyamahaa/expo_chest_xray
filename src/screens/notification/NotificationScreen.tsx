import React, { useState, useEffect, useCallback } from 'react';
import { Box, Image, ScrollView, Text } from 'native-base';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from 'components/Header';
import NotiCard from './component/NotiCard';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationById } from 'redux/actions/notification.action';
import { RootState } from 'redux/stores';
import { IUserState } from 'redux/reducers/user.reducer';
import { INotification } from 'utils/interfaces/notification.interface';

interface Props {}

const NotificationScreen = (props: Props) => {
  // REDUX
  const user = useSelector<RootState>((state) => state.user) as IUserState;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [listNoti, setListNoti] = useState<INotification[]>(
    [] as INotification[]
  );
  const getNoti = async () => {
    const listNotiResult = (await dispatch(
      getNotificationById(user.id)
    )) as any as INotification[];

    setListNoti(listNotiResult);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getNoti();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Header title="Thông báo" />
        </Box>
        <Box style={styles.paddingBottom}>
          {listNoti.map((item) => (
            <NotiCard key={item.id} data={item} />
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paddingBottom: {
    marginBottom: 80,
  },
});

export default NotificationScreen;
