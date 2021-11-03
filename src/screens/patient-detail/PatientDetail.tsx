import Header from 'components/Header';
import { Box, ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from 'utils/Colors';
import ResultXray from './component/ResultXray';
import XrayCard from './component/XrayCard';
import { useNavigation } from '@react-navigation/core';
import { PatientStackProps } from 'navigation/interface';
import GlobalStyles from 'utils/styles';
import ContainerLayout from 'components/ContainerLayout';

interface Props {}

const PatientDetail = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<PatientStackProps['navigation']>();

  const activeModal = () => {
    setShowModal(true);
  };
  return (
    <SafeAreaView>
      {showModal && (
        <ResultXray showModal={showModal} setShowModal={setShowModal} />
      )}
      <ScrollView>
        <Header
          title="Thông tin bệnh nhân"
          showBackBtn={true}
          onPress={() => navigation.goBack()}
        />
        <ContainerLayout>
          {/* Common Info about Patient */}
          <Box style={{ width: '90%' }} p="4">
            <Box style={styles.flexModel}>
              <Text style={styles.title}>Bệnh nhân</Text>
              <Text style={styles.subTitle}>Nguyen Van A</Text>
            </Box>
            <Box style={styles.flexModel}>
              <Text style={styles.title}>Bác sĩ phụ trách</Text>
              <Text style={styles.subTitle}>Nguyen Van á</Text>
            </Box>
            <Box style={styles.flexModel}>
              <Text style={styles.title}>Trạng thái</Text>
              <Text style={styles.subTitle}>Dương tính</Text>
            </Box>
          </Box>
          {/* List Card Result */}
          <Box width="90%">
            <Box mb="4">
              <XrayCard onPress={activeModal} />
            </Box>
            <Box mb="4">
              <XrayCard onPress={activeModal} />
            </Box>
            <Box mb="4">
              <XrayCard onPress={activeModal} />
            </Box>
          </Box>
        </ContainerLayout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexModel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  title: {
    fontSize: 20,
    color: Colors.textColor,
  },
  subTitle: {
    fontSize: 20,
    color: Colors.textColor,
  },
});

export default PatientDetail;
