import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialInstagramCircular,
  TiSocialYoutubeCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';

const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading children="All rights reserved " color={'white'} />
          <Heading
            children="@SRM University "
            color={'yellow'}
            fontFamily={'body'}
            size={'sm'}
          />
        </VStack>

        <HStack spacing={['2', '10']} justifyContent={'center'}
        color={'white'} fontSize={'50'}>
          <a href="https://github.com/rajsrm2021" target="blank">
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://github.com/rajsrm2021" target="blank">
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com/rajsrm2021" target="blank">
            <DiGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
