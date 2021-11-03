import { Box } from 'native-base';
import React from 'react';
import GlobalStyles from 'utils/styles';

interface Props {
  children: React.ReactNode;
}

const ContainerLayout = (props: Props) => {
  const { children } = props;
  return (
    <Box alignItems="center" style={GlobalStyles.marginBottomTab}>
      {children}
    </Box>
  );
};

export default ContainerLayout;
