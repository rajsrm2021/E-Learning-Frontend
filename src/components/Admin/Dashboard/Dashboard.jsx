import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import cursorImage from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';

const Databox = ({ tittle, qty, profit, qtypercentage }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p={'8'}
    borderRadius={'lg'}
  >
    <Text children={tittle} />

    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />

      <HStack>
        <Text children={`${qtypercentage}%`} />
        {profit === 'true' ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={'0.6'} children={'science last month'} />
  </Box>
);

const Bar = ({ title, value }) => (
  <Box py={'4'} px={['0', '20']}>
    <Heading size={'sm'} children={title} mb={'2'} />

    <HStack w={'full'} alignItems={'center'}>
      <Text children="0%" />
      <Progress w={'full'} value={value} colorScheme="purple" />
      <Text children={`${value < 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  return (
    <Grid
      css={{
        cursor: `url(${cursorImage}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box boxSizing="border-box" py={'16'} px={['4', '0']}>
        <Text
          textAlign={'center'}
          opacity={'0.5'}
          children={`Last change was on ${String(new Date()).split('G')[0]}`}
        />
        <Heading
          children={'Dashboard'}
          ml={['0', '16']}
          mb={'16'}
          textAlign={['center', 'left']}
        />

        <Stack
          direction={['column', 'row']}
          minH={'24'}
          justifyContent={'space-evenly'}
        >
          <Databox tittle="views" qty={23} profit="true" qtypercentage={30} />
          <Databox tittle="Users" qty={888} profit="true" qtypercentage={80} />
          <Databox
            tittle="Subscriptions"
            qty={12}
            profit="false"
            qtypercentage={-3}
          />
        </Stack>

        <Box
          m={['0', '16']}
          borderRadius={'lg'}
          padding={['0', '16']}
          mt={['4', '16']}
          boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        >
          <Heading
            textAlign={['center', 'left']}
            size={'md'}
            children={'Views Graph'}
            pt={['8', '0']}
            ml={['0', '16']}
          />
          {/* line graph here */}
          <LineChart />
        </Box>

        <Grid templateColumns={['1fr', '2fr 1fr']}>
          <Box p={'4'}>
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children="Progress Bar"
              my={'8'}
              ml={['0', '16']}
            />
            <Box>
              <Bar title={'views'} value={23} />
              <Bar title={'Users'} value={888} />
              <Bar title={'Subscription'} value={-12} />
            </Box>
          </Box>

          <Box p={['0', '16']} boxSizing="border-box">
            <Heading
              textAlign={'center'}
              size={'md'}
              mb={'4'}
              children={'Users'}
            />
            {/* {Donut graph} */}
            <DoughnutChart />
          </Box>
        </Grid>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
