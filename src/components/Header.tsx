import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  onPress?: () => void;
  showBackBtn?: boolean;
}

const Header = (props: Props) => {
  const { title, onPress, showBackBtn = false } = props;
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#6200ee" />

      <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="center"
        alignItems="center"
      >
        <HStack position="absolute" left={0}>
          {showBackBtn && (
            <IconButton
              onPress={onPress}
              icon={
                <Icon
                  size="sm"
                  as={<Ionicons name="ios-arrow-back-circle-outline" />}
                  color="white"
                />
              }
            />
          )}
        </HStack>
        <HStack>
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
