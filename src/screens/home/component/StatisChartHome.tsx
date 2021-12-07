import { Box, Text } from 'native-base';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart } from 'victory-native';
import Colors from 'utils/Colors';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getStatsCares } from 'redux/actions/care.action';
import { RootState } from 'redux/stores';
import { IUserState } from 'redux/reducers/user.reducer';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { ICare } from 'utils/interfaces/care.interface';

interface Props {}

const getMonthName = (num: number = 0) =>
  moment().subtract(num, 'month').format('MMM');

const StatisChartHome = (props: Props) => {
  // REDUX STATE
  const user = useSelector<RootState>((state) => state.user) as IUserState;
  // HOOKS
  const dispatch = useDispatch();
  const categoriesMonth = [
    getMonthName(5),
    getMonthName(4),
    getMonthName(3),
    getMonthName(2),
    getMonthName(1),
    getMonthName(),
  ];
  const [stats, setStats] = useState<{ [key: string]: ICare[] }>({});

  const onHandleGetStatsCare = async () => {
    const result: any = await dispatch(getStatsCares(user.id));
    setStats(result);
  };

  useFocusEffect(
    useCallback(() => {
      let isMount = true;
      if (isMount) {
        onHandleGetStatsCare();
      }
      return () => {
        isMount = false;
      };
    }, [user.id])
  );

  const dataChart = categoriesMonth.map((month) => ({
    x: month,
    y: (stats[month] && stats[month].length) || 0,
  }));

  return (
    <Box style={{ width: '90%' }}>
      <Text fontSize={22} bold color={Colors.green}>
        Thống kê{' '}
      </Text>
      <VictoryChart domainPadding={25}>
        <VictoryBar
          categories={{
            x: categoriesMonth,
          }}
          data={dataChart}
          style={{
            data: {
              fill: Colors.greenDark,
              stroke: '#000',
              fillOpacity: 0.8,
              strokeWidth: 1,
            },
          }}
          labels={({ datum }) => datum.y}
        />
      </VictoryChart>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default StatisChartHome;
