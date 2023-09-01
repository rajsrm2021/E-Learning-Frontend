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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const addToPlaylistHandler =()=>{
    console.log("ok ok")
  }

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
          children={`Lecture - ${leactureCount}`}
          textTransform={'uppercase'}
        />
        <Heading
          size={'xs'}
          children={`Views - ${views}`}
          textTransform={'uppercase'}
        />

        <Stack direction={['column', 'row']} alignItems={'center'}>
          <Link to={`/course/${id} `}>
            <Button colorScheme="yellow">Watch Now</Button>
          </Link>
          <Button
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
  ];
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
        <Course
          title={'sample 1'}
          description={'loremdsidfvuhieuhvi ekvjbei'}
          views={23}
          imagesrc={'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png'}
          id={'sam'}
          creator={'dsvb'}
          leactureCount={2}
          addToPlaylistHandler={addToPlaylistHandler}
        />
      </Stack>
    </Container>
  );
};

export default Courses;
