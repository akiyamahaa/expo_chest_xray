import { Box, Button, Text } from 'native-base';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementCounting,
  incrementCounting,
} from 'redux/actions/counting.action';
import { ICountingState } from 'redux/reducers/counting.reducer';

interface Props {}

const HomeScreen = (props: Props) => {
  const { counting }: any = useSelector<ICountingState>(
    (state) => state.counting
  );
  console.log(
    '🚀 ~ file: HomeScreen.tsx ~ line 16 ~ HomeScreen ~ countingState',
    counting
  );
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementCounting(20));
  };
  const decrement = () => {
    dispatch(decrementCounting(10));
  };
  return (
    <Box flexDirection="row" justifyContent="space-evenly">
      <Button onPress={increment}>Increment</Button>
      <Text>{counting}</Text>
      <Button onPress={decrement}>Decrement</Button>
    </Box>
  );
};

export default HomeScreen;
