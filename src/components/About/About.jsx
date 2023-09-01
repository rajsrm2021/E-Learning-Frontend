import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import introviedo from '../../assets/videos/intro.mp4';
import termsAndCondition from '../../assets/docs/termsAndCondition';
import { RiSecurePaymentFill } from 'react-icons/ri';

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar
        src={'https://avatars.githubusercontent.com/u/103736313?v=4'}
        boxSize={['40', '48']}
      />
      <Text children="Co-Founder" opacity={'0.7'} color={'yellow.500'} />
    </VStack>

    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Raj jaiswal" size={['md', 'xl']} />
      <Text
        textAlign={['center', 'left']}
        fontSize="2xl"
        children="Hi, I am a full-stack developer and a 3rd year student at srm university. Our goal is to provide Quality content to our subscriber"
      />
    </VStack>
  </Stack>
);

const ViedoPlayer = () => (
  <Box>
    <video
      autoPlay={true}
      muted
      loop
      controls
      src={introviedo}
      controlsList={'nodownload no fullscreen noremoteplayback'}
      disablePictureInPicture
      disableRemotePlayback
    ></video>
  </Box>
);

const TandC = ({ termsAndCondition }) => (
  <Box>
    <Heading
      size={'md'}
      children={'Terms And Condition'}
      textAlign={['center', 'left']}
      my={'4'}
    />

    <Box h={'sm'} p={'4'} overflowY={'scroll'}>
      <Text
        letterSpacing={'widest'}
        fontFamily={'heading'}
        textAlign={['center', 'left']}
      >
        {termsAndCondition}
      </Text>
      <Heading
        my={'4'}
        size={'xs'}
        children={'Refund Only aplicable for canclelation witin 7 days'}
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About us" textAlign={['center', 'left']} />

      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m={'8'} textAlign={['center', 'left']}>
          We are a viedo streaming platform with some premium courses avilable
          only for premium users.
        </Text>

        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>

      <ViedoPlayer />

      <TandC termsAndCondition={termsAndCondition} />

      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
          children={'Payment is secured by razor pay'}
        />
      </HStack>
    </Container>
  );
};

export default About;
