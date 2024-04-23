import React, { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Input,
  Button,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import Loader from '../layout/Loader/Loader';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(3); // Change this value as per your preference

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );
  const dispatch = useDispatch();

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  const Course = ({
    views,
    title,
    imagesrc,
    id,
    creator,
    description,
    leactureCount,
  }) => {
    return (
      <VStack className="course" alignItems="flex-start" spacing={4}>
        <img
          src={imagesrc}
          alt={title}
          style={{ width: '100px', height: 'auto' }}
        />
        <Heading size="sm">{title}</Heading>
        <Text>{description}</Text>
        <Text>Creator: {creator}</Text>
        <Text>Lectures: {leactureCount}</Text>
        <Text>Views: {views}</Text>
        <HStack spacing={4}>
          <Button colorScheme="yellow">Watch Now</Button>
          <Button
            isLoading={loading && loading.courseId === id}
            variant="ghost"
            colorScheme="yellow"
            onClick={() => addToPlaylistHandler(id)}
          >
            Add to Playlist
          </Button>
        </HStack>
      </VStack>
    );
  };

  const categories = [
    'Data Structures',
    'Algorithms',
    'Advance Calcus',
    'App Development',
    'Data Science',
    'Web Development',
  ];

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
  }, [category, keyword, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message, dispatch]);

  // Pagination Logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container minH="95vh" maxW="container.lg" padding="8">
      <Heading children="All Lectures" m="8" />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a Lecture"
        type="text"
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX="auto"
        paddingY="8"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW="60">
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <HStack spacing="8" justifyContent="center" flexWrap="wrap" mt="8">
        {loading ? (
          <Loader />
        ) : currentCourses.length > 0 ? (
          currentCourses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imagesrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              leactureCount={item.numOfViedos}
            />
          ))
        ) : (
          <Heading>No courses available</Heading>
        )}
      </HStack>

      {/* Pagination Controls */}
      <HStack spacing="2" mt="4" justifyContent="center">
        {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }).map(
          (_, index) => (
            <Button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Button>
          )
        )}
      </HStack>
    </Container>
  );
};

export default Courses;
