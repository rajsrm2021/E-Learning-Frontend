import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const Changepassword = () => {
  const [oldpassword, setoldPassword] = useState('');
  const [newpassword, setnewPassword] = useState('');


  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    

    dispatch(changePassword(oldpassword,newpassword));
  };

  const {loading, message, error} = useSelector(state => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  

  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
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
          <Button isLoading={loading} width={'full'} colorScheme="yellow" type="submit">
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default Changepassword;
