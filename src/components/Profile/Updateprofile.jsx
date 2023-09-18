import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const Updateprofile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();

    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate("/profile");
  };

  const { loading } = useSelector(state => state.profile);

  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
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
          <Button
            isLoading={loading}
            width={'full'}
            colorScheme="yellow"
            type="submit"
          >
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Updateprofile;
