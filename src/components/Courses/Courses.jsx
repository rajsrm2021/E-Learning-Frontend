import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const { loading, courses, error,message } = useSelector(state => state.course);

  const dispatch = useDispatch();

  const addToPlaylistHandler = async(courseId) => {
    console.log('ok ok',courseId);
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  const Course = ({
    views,
    title,
    imagesrc,
    id,
    addToPlaylistHandler,
    creator,
    description,
    leactureCount,
  }) => {
    return (
      <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={imagesrc} boxSize="60" objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW={'200px'}
          fontFamily={'sans-serif'}
          noOfLines={3}
          size={'sm'}
          children={title}
        />
        <Text noOfLines={2} children={description} />

        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform={'uppercase'}
            children={'creator'}
          />
          <Text
            fontFamily={'body'}
            textTransform={'uppercase'}
            children={creator}
          />
        </HStack>

        <Heading
          textAlign={'center'}
          size={'xs'}
          children={Lecture - ${leactureCount}}
          textTransform={'uppercase'}
        />
        <Heading
          size={'xs'}
          children={Views - ${views}}
          textTransform={'uppercase'}
        />

        <Stack direction={['column', 'row']} alignItems={'center'}>
          <Link to={`/course/${id} `}>
            <Button colorScheme="yellow">Watch Now</Button>
          </Link>
          <Button
          isLoading={loading}
            variant={'ghost'}
            colorScheme="yellow"
            onClick={() => addToPlaylistHandler(id)}
          >
            Add to playlist
          </Button>
        </Stack>
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

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <Container minH={'95vh'} maxW={'container.lg'} padding={'8'}>
      <Heading children="All Lectures" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a Lecture"
        type="text"
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imagesrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              leactureCount={item.numOfViedos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading>Course not found</Heading>
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
