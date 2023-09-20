import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursorImage from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectures } from '../../../redux/actions/course';

const Admincourses = () => {
  const dispatch = useDispatch();

  const { courses , lectures} = useSelector(state => state.course);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const courseDetailHandler = courseId => {
    dispatch(getCourseLectures(courseId));
    onOpen();
  };
  const deleteButtonHandler = courseId => {
    console.log(courseId);
  };

  const deleteLectureButtonHandler = (courseId, leactureId) => {
    console.log(courseId);
    console.log(leactureId);
  };

  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <Grid
      css={{
        cursor: `url(${cursorImage}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All users"
          my={'16'}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'}>
            <TableCaption>All available courses in the database</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  key={item._id}
                  item={item}
                  courseDetailHandler={courseDetailHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          id={'shc'}
          courseTitle={'react course'}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};

function Row({ item, courseDetailHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfViedos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color={'purple.500'}
            onClick={() => courseDetailHandler(item._id)}
          >
            View Lectures
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

export default Admincourses;
