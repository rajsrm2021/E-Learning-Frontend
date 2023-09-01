import React from 'react';
import {
  Heading,
  Stack,
  VStack,
  Text,
  Button,
  Image,
  Box,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './home.css';
import vg from '../../assets/images/bg.png';
import introviedo from '../../assets/videos/intro.mp4';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height={'100%'}
          justifyContent={['center', 'space-between']}
          alignItems={'center'}
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing={8}
          >
            <Heading children="Learn From The SRM Experts" size={'2xl'} />
            <Text
              textAlign={['center', 'left']}
              children="Learn From SRM Top Professiors"
              fontFamily={'cursive'}
              fontSize={'2xl'}
            />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>

          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={vg}
            objectFit={'contain'}
          />
        </Stack>
      </div>
      <Box padding={'8'} bg={'blackAlpha.800'}>
        <Heading
          textAlign={'center'}
          fontFamily={'body'}
          color={'yellow.400'}
          children="our brands"
        />
        <HStack
          className="brands"
          justifyContent={'space-evenly'}
          marginTop={'4'}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video
          //   autoPlay={true}
          autoPlay={true}
          muted
          loop
          controls
          src={introviedo}
          controlsList={'nodownload nofullscreen noremoteplayback'}
          disablePictureInPicture
          disableRemotePlayback
        ></video>
      </div>
    </section>
  );
};

export default Home;
