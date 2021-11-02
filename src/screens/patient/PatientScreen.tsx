import { Box, Button, Icon, Image, Input, ScrollView, Text } from 'native-base';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from 'components/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {}

const PatientScreen = (props: Props) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView>
        <Box>
          <Header title="Hồ sơ bệnh nhân" />
        </Box>
        <Box style={styles.searchContainer} mt="4">
          <Input
            w={{
              base: '75%',
            }}
            InputRightElement={
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Icon
                  as={<MaterialCommunityIcons name="account-search" />}
                  size={7}
                  mr="2"
                  color="green.600"
                />
              </TouchableOpacity>
            }
            size="lg"
            placeholder="Name"
          />
          <Box>
 
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default PatientScreen;
