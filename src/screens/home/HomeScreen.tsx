import { Box, Image, ScrollView, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import PatientOverview from './component/PatientOverview';
import StatisChartHome from './component/StatisChartHome';
import { RootState } from 'redux/stores';
import { useDispatch, useSelector } from 'react-redux';
import { IUserState } from 'redux/reducers/user.reducer';
import { getAllPatientsCount } from 'redux/actions/care.action';
import { EStatus } from 'utils/constants';
import { useNavigation } from '@react-navigation/core';

interface Props {}

const HomeScreen = (props: Props) => {
  const user = useSelector<RootState>((state) => state.user) as IUserState;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    total: 0,
    progress: 0,
    completed: 0,
  });

  const onGetStats = async () => {
    const total_count = (await dispatch(getAllPatientsCount(user.id))) as any;
    const progress_count = (await dispatch(
      getAllPatientsCount(user.id, EStatus.IN_PROGRESS)
    )) as any;
    const completed_count = (await dispatch(
      getAllPatientsCount(user.id, EStatus.COMPLETED)
    )) as any;
    setStats({
      ...stats,
      total: total_count.careNumber,
      progress: progress_count.careNumber,
      completed: completed_count.careNumber,
    });
  };

  useEffect(() => {

    const subscribe = navigation.addListener('focus', () => {
      onGetStats();
    });

    const unsubscribe = navigation.addListener('blur', () => {
      setStats({ total: 0, progress: 0, completed: 0 });
    });

    return () => {
      subscribe();
    };
  }, [navigation,user.id]);

  return (
    <Box style={{}}>
      <Box>
        <Image
          source={require('assets/images/home-bg.png')}
          style={{ width: '100%' }}
          alt="home-bg"
          position="absolute"
        />
      </Box>
      <Box style={styles.welcomeContainer}>
        <Text fontSize={18} color="#fefefe">
          Xin chào bác sĩ
        </Text>
        <Text fontSize={22} color="#fefefe" textTransform="uppercase">
          {user.fullname}
        </Text>
      </Box>
      <Box style={[styles.contentContainer, styles.paddingBottom]}>
        <Box>
          <Image
            source={require('assets/images/doctor-character.png')}
            alt="character-bg"
            style={{ width: 150, height: 150, right: 0, top: -150 }}
            position="absolute"
          />
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box alignItems="center" mt="4">
            <PatientOverview stats={stats} />
          </Box>
          <Box alignItems="center">
            <StatisChartHome />
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 100,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    marginTop: 50,
    marginLeft: 20,
  },
  paddingBottom: {
    paddingBottom: 300,
  },
});

export default HomeScreen;
