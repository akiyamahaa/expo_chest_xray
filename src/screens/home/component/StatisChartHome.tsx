import { Box, Text } from 'native-base';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart } from 'victory-native';
import Colors from 'utils/Colors';

interface Props {}

const StatisChartHome = (props: Props) => {
  return (
    <Box style={{ width: '90%' }}>
      <Text fontSize={22} bold color={Colors.green}>
        Thống kê{' '}
      </Text>
      <VictoryChart domainPadding={25}>
        <VictoryBar
          categories={{
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          }}
          data={[
            { x: 'Jan', y: 5 },
            { x: 'Feb', y: 44 },
            { x: 'Mar', y: 12 },
            { x: 'Apr', y: 33 },
            { x: 'May', y: 12 },
          ]}
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
