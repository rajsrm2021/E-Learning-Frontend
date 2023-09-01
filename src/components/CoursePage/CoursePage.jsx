import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import introviedo from '../../assets/videos/intro.mp4';

const CoursePage = () => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const lectures = [
    {
      _id: 'hhg',
      title: 'sample1',
      description: 'sample sdkjhs mskjdsks sjdhk',
      viedo: {
        url: 'skhss',
      },
    },
    {
      _id: 'hshg',
      title: 'sample2',
      description: 'sample sdkjhs mskjdsks sjdhk',
      viedo: {
        url: 'skhss',
      },
    },
    {
      _id: 'hgfhg',
      title: 'sample3',
      description: 'sample sdkjhs mskjdsks sjdhk',
      viedo: {
        url: 'skhss',
      },
    },
    {
      _id: 'hsgfh',
      title: 'sample4',
      description: 'sample sdkjhs mskjdsks sjdhk',
      viedo: {
        url: 'skhss',
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} m={'4'}>
      <Box>
        <video
          width={'100%'}
          controls
          src={introviedo}
          controlsList={'nodownload noremoteplayback'}
          disablePictureInPicture
          disableRemotePlayback
        ></video>
        <Heading
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
          m={'4'}
        />
        <Heading children={'Description'} m={'4'} />
        <Text m={'4'} children={lectures[lectureNumber].description} />
      </Box>

      <VStack>
        {lectures.map((item, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={item._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={'1'} children={`#${index + 1} ${item.title}`} />
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursePage;
