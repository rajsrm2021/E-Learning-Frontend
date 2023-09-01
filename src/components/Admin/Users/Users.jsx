import React from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursorImage from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';

const Users = () => {
  const users = [
    {
      name: 'raj jaiswal',
      email: 'raj@gmail.com',
      subscription: {
        status: 'active',
      },
      _id: 'kduhgfiuaghioau',
      role: 'Admin',
    },
  ];

  const updateHandler = userId => {
    console.log(userId);
  };
  const deleteButtonHandler = userId => {
    console.log(userId);
  };
  return (
    <Grid
      css={{
        cursor: `url(${cursorImage}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '16']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All users"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'}>
            <TableCaption>All available users in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  updateHandler={updateHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription.status === 'active' ? 'Active' : 'Not Active'}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            onClick={() => updateHandler(item._id)}
          >
            Change Role
          </Button>
          <Button
            color={'purple.600'}
            onClick={() => deleteButtonHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
