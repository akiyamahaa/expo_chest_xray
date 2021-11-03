import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from 'utils/Colors';
import { Platform } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  showBackBtn?: boolean;
}

const Header = (props: Props) => {
  const { title, onPress, showBackBtn = false } = props;
  return (
    <>
      <StatusBar
        backgroundColor={Colors.greenDark}
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <Box backgroundColor={Colors.green} />
      <HStack
        bg={Colors.green}
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
          <Text
            color="white"
            fontSize="20"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {title}
          </Text>
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
