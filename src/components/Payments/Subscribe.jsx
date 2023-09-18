import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import toast from 'react-hot-toast';
import logo from "../../assets/images/logo.png"

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);

    setKey(data.key);

    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    // if (courseError) {
    //   toast.error(courseError);
    //   dispatch({ type: 'clearError' });
    // }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'SRM Video Hub',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Raj kumar jaiswal mullai D block SRMIST.',
          },
          theme: {
            color: '#FFC800',
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    // courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);

  return (
    <Container h={'90vh'} p={'16'}>
      <Heading children="Welcome" my={'8'} textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'0'}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0 ' }}>
          <Text color={'black'} children={`pro pack - $299.00`} />
        </Box>

        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children={`Join pro pack and get access to all content.`} />
            <Heading size={'md'} children={'$299/- only'} />
          </VStack>

          <Button
            my={'8'}
            w={'full'}
            colorScheme="yellow"
            onClick={subscribeHandler}
            isLoading={loading}
          > 
            Buy Now
          </Button>
        </Box>

        <Box
          bg={'blackAlpha.600'}
          p={'4'}
          css={{ borderRadius: '8px 8px 0 0 ' }}
        >
          <Heading
            size={'sm'}
            color={'white'}
            textTransform={'uppercase'}
            children={`100% refund at cancalation`}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children={`*Terms and condition applied`}
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
