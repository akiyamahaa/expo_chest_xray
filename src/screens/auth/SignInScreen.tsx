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
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { RootStackProps } from 'navigation/interface';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/actions/user.action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from 'utils/constants';
import { ILogin, ILoginResponse } from 'utils/interfaces/auth.interface';
import { IErrorState } from 'redux/reducers/error.reducer';
import { RootState } from 'redux/stores';

interface Props {}

interface IForm {
  label: string;
  placeholder: string;
  type: string;
}

const LoginForm: { [key: string]: IForm } = {
  username: {
    label: 'Tài khoản',
    placeholder: 'Tài khoản ...',
    type: 'text',
  },
  password: {
    label: 'Mật khẩu',
    placeholder: 'Mật khẩu ...',
    type: 'password',
  },
};

const SignInScreen = (props: Props) => {
  // STATE REDUX
  const error = useSelector<RootState>((state) => state.error) as IErrorState;

  const navigation = useNavigation<RootStackProps['navigation']>();
  const dispatch = useDispatch();
  const { height } = Dimensions.get('screen');
  //STATE
  const opacity = useState(new Animated.Value(0))[0];

  const [input, setInput] = useState<ILogin>({
    username: '',
    password: '',
  });

  const fadeInText = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onHandleLogin = async () => {
    console.log(input.username, input.password);
    const login_result = await dispatch(
      login({
        username: input.username,
        password: input.password,
      }) as any as ILoginResponse
    );
    if (login_result) {
      await AsyncStorage.setItem(AUTH_TOKEN, login_result.token);
      navigation.navigate('TabStack', { screen: 'Home' });
    } else {
      fadeInText();
    }
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
              {/* FORM LOGIN */}
              {Object.keys(LoginForm).map((form) => (
                <Box key={form}>
                  <Text textTransform="capitalize" color="#bcbcbc" mb="2">
                    {LoginForm[form].label}
                  </Text>
                  <InputGroup
                    placeholder={LoginForm[form].placeholder}
                    text={input[form as keyof ILogin]}
                    setText={(text) => setInput({ ...input, [form]: text })}
                    type={LoginForm[form].type}
                  />
                </Box>
              ))}
              {/* DISPLAY ERROR */}
              {/* TODO: MAKE IT MORE PRO */}
              <Box mb="2" alignItems="center">
                <Animated.View
                  style={{
                    opacity: opacity,
                    width: '90%',
                  }}
                >
                  <Text
                    color="red.700"
                    textTransform="uppercase"
                    textAlign="center"
                  >
                    {error.messages}
                  </Text>
                </Animated.View>
              </Box>
              <Box mt="4" mb="4">
                <CustomButton title="Login" onPress={onHandleLogin} />
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
