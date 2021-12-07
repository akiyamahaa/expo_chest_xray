import React, { useState, useCallback, useEffect } from 'react';
import { Box, FlatList, Image, ScrollView, Text } from 'native-base';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import Header from 'components/Header';
import NotiCard from './component/NotiCard';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCountUnseen,
  getNotificationById,
} from 'redux/actions/notification.action';
import { RootState } from 'redux/stores';
import { IUserState } from 'redux/reducers/user.reducer';
import { INotification } from 'utils/interfaces/notification.interface';

interface Props {}

const NotificationScreen = (props: Props) => {
  // REDUX
  const user = useSelector<RootState>((state) => state.user) as IUserState;
  const dispatch = useDispatch();
  const [listNoti, setListNoti] = useState<INotification[]>(
    [] as INotification[]
  );
  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  // TODO: FIX PAGE
  const getNoti = async () => {
    const listNotiResult = (await dispatch(
      getNotificationById(user.id, page)
    )) as any as INotification[];
    await dispatch(getCountUnseen(user.id));
    console.log('noti length', listNotiResult.length, 'page', page);
    setListNoti([...listNoti, ...listNotiResult]);
    if (listNotiResult.length === 0) {
      setLoadMore((previousState) => !previousState);
    }
  };

  const fetchMore = () => {
    if (loadMore) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isMount = true;
      if (isMount) {
        getNoti();
      }
      return () => {
        isMount = false;
      };
    }, [page])
  );

  return (
    <SafeAreaView>
      <Header title="Thông báo" />
      {/* TODO: Make infinite scroll for loading */}
      <Box style={styles.paddingBottom}>
        <FlatList
          data={listNoti}
          renderItem={({ item }: any) => <NotiCard data={item} />}
          keyExtractor={(e, index) => `${e.id}-${index}`}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.05}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paddingBottom: {
    marginBottom: 180,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
});

export default NotificationScreen;
