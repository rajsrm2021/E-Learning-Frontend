import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Updateprofile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading
          textTransform={'uppercase'}
          m={'16'}
          children="Update profile"
          textAlign={['center']}
        />
        <VStack spacing={'8'}>
          <Input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder={'Name'}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder={'Enter your email address'}
            focusBorderColor="yellow.500"
          />
          <Button width={'full'} colorScheme="yellow" type="submit">
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Updateprofile;
