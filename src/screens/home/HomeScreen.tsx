import { Box, Image, ScrollView, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import PatientOverview from './component/PatientOverview';
import StatisChartHome from './component/StatisChartHome';
import { RootState } from 'redux/stores';
import { useSelector } from 'react-redux';
import { IUserState } from 'redux/reducers/user.reducer';

interface Props {}

const HomeScreen = (props: Props) => {
  const user = useSelector<RootState>((state) => state.user) as IUserState;

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
            <PatientOverview />
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
