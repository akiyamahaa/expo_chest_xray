import InputGroup from 'components/InputGroup';
import CustomButton from 'components/CustomButton';
import {
  Box,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from 'native-base';
import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RootStackProps } from 'navigation/interface';

interface Props {}

const SignInScreen = (props: Props) => {
  const navigation = useNavigation<RootStackProps['navigation']>();
  const { height } = Dimensions.get('screen');
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const login = () => {
    console.log(username, password);
    navigation.navigate('TabStack');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <Box alignItems="center" style={{ height }}>
            <Image
              style={styles.imageStyle}
              source={require('assets/images/header-login.png')}
              alt="header-login-img"
            />
            <Box style={styles.formContainer}>
              <Box mb="4">
                <Text textTransform="uppercase">
                  Hãy đăng nhập tài khoản sau đây
                </Text>
              </Box>
              <Box>
                <Text textTransform="capitalize" color="#bcbcbc" mb="2">
                  Tài khoản
                </Text>
                <InputGroup
                  placeholder="Tài khoản ..."
                  text={username}
                  setText={setUsername}
                />
              </Box>
              <Box>
                <Text textTransform="capitalize" color="#bcbcbc" mb="2">
                  Mật khẩu
                </Text>
                <InputGroup
                  placeholder="Mật khẩu ..."
                  type="password"
                  text={password}
                  setText={setPassword}
                />
              </Box>
              <Box mt="4" mb="4">
                <CustomButton title="Login" onPress={login} />
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'absolute',
  },
  formContainer: {
    width: '80%',
    elevation: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    bottom: 140,
    padding: 20,
  },
});

export default SignInScreen;
