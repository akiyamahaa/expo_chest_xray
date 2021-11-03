import { Box, Icon, IconButton, IInputProps, Input } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from 'utils/Colors';
import { Entypo } from '@expo/vector-icons';

interface Props extends IInputProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  multiline?: boolean;
  numberOfLines?: number;
}

const InputGroup = (props: Props) => {
  const { text, setText, multiline = false, numberOfLines = 1 } = props;
  const [showPassword, setShowPassword] = useState(false);

  const changeModeShow = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box style={styles.root}>
      <Input
        placeholder={props.placeholder}
        type={props.type}
        value={text}
        onChangeText={(text) => setText(text)}
        _focus={{
          borderColor: Colors.green,
          color: '#000',
        }}
        textAlignVertical={multiline ? 'top' : 'center'}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={props.type === 'password' ? !showPassword : false}
        InputRightElement={
          props.type === 'password' ? (
            <TouchableOpacity
              style={{ marginRight: 6 }}
              onPress={changeModeShow}
            >
              <Icon
                size="sm"
                as={<Entypo name={showPassword ? 'eye' : 'eye-with-line'} />}
                color="gray.500"
              />
            </TouchableOpacity>
          ) : (
            <Box />
          )
        }
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
  },
});

export default InputGroup;
