import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Changepassword = () => {
  const [oldpassword, setoldPassword] = useState('');
  const [newpassword, setnewPassword] = useState('');
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading
          textTransform={'uppercase'}
          m={'16'}
          children="Change Password"
          textAlign={['center']}
        />
        <VStack spacing={'8'}>
            
          <Input
            required
            value={oldpassword}
            onChange={e => setoldPassword(e.target.value)}
            type="password"
            placeholder={'Enter your old password'}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            value={newpassword}
            onChange={e => setnewPassword(e.target.value)}
            type="password"
            placeholder={'Enter your new password'}
            focusBorderColor="yellow.500"
          />
          <Button width={'full'} colorScheme="yellow" type="submit">
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Changepassword;
