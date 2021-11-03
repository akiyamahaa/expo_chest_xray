import { useNavigation } from '@react-navigation/core';
import ContainerLayout from 'components/ContainerLayout';
import Header from 'components/Header';
import { Avatar, Box, Image, Text } from 'native-base';
import { RootStackProps } from 'navigation/interface';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';

interface Props {}

const ProfileScreen = (props: Props) => {
  const navigation = useNavigation<RootStackProps['navigation']>();
  const name = 'Nguyen Van Anh';

  const logout = () => {
    navigation.navigate('AuthStack');
  };

  return (
    <SafeAreaView>
      <Box>
        <Header title="Thông tin cá nhân" />
      </Box>
      <ContainerLayout>
        <Box mt="4" alignItems="center">
          <Avatar bg="green.700" size="xl">
            {name.split(' ')[name.split(' ').length - 1].charAt(0)}
          </Avatar>
          <Text fontSize={20} bold>
            {name}
          </Text>
          <Text fontSize={18}>Trưởng khoa</Text>
        </Box>
        <TouchableOpacity
          style={{ width: '90%', marginTop: 20 }}
          onPress={logout}
        >
          <Box style={styles.logoutStyle}>
            <Text fontSize={18} color={Colors.greenDark}>
              Đăng xuất
            </Text>
          </Box>
        </TouchableOpacity>
      </ContainerLayout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutStyle: {
    borderWidth: 1,
    borderColor: Colors.greenDark,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
