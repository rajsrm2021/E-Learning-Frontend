import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentFail = () => {
  return (
    <Container h={'90vh'}>
      <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
        <RiErrorWarningFill size={'5rem'} />
        <Heading textTransform={'uppercase'} children={'payment failed'} />
        <Link to={'/subscribe'}>
          <Button color={'yellow.400'} variant={'ghost'}>
            Try Again
          </Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default PaymentFail