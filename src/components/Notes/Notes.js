import React, { useState, useEffect, useCallback } from 'react';
import { Box, Flex, Text, Button, Heading, Input } from '@chakra-ui/react';
import dummyData from './dummy.json';

const SRMNotes = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page

  // Function to handle search
  const handleSearch = useCallback(() => {
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredData);
    setCurrentPage(1); // Reset to the first page after search
  }, [data, searchQuery]);

  // Trigger search automatically when searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // Group data by name
  const groupedData =
    searchResults.length > 0
      ? searchResults.reduce((acc, cur) => {
          acc[cur.name] = [...(acc[cur.name] || []), cur];
          return acc;
        }, {})
      : data.reduce((acc, cur) => {
          acc[cur.name] = [...(acc[cur.name] || []), cur];
          return acc;
        }, {});

  // Logic to get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Object.keys(groupedData)
    .slice(indexOfFirstItem, indexOfLastItem)
    .map(key => groupedData[key])
    .flat();

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      px={[4, 8, 12]} // Responsive padding
    >
      <Heading as="h1" mb="4" textAlign="center">
        SRM Notes
      </Heading>
      <Input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        mb="4"
        maxWidth="300px"
      />
      {searchResults.length === 0 && searchQuery !== '' && (
        <Text mb="4" textAlign="center" color="red.500">
          No documents found.
        </Text>
      )}
      <Flex
        flexWrap="wrap" // Allow items to wrap on smaller screens
        justifyContent="center"
      >
        {currentItems.map((item, index) => (
          <Box
            key={index}
            width={['100%', 'calc(50% - 8px)', 'calc(33.33% - 8px)']} // Responsive width
            maxWidth="300px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            m="4"
          >
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Text fontSize="sm" color="gray.500">
                  PDF Document
                </Text>
              </Box>
              <Box mt="1" fontWeight="semibold" lineHeight="tight">
                <Text fontSize="lg">{item.name}</Text>
              </Box>
            </Box>

            <Box p="6">
              {/* Your PDF Viewer Component */}
              {/* Replace this with your PDF viewer component */}
              {/* <Box borderWidth="1px" borderRadius="lg" p="4" bg="gray.100">
                <iframe
                  title={item.name}
                  src={item.pdfLink}
                  width="100%"
                  height="300px"
                ></iframe>
              </Box> */}
            </Box>

            <Box p="6" borderTopWidth="1px" borderColor="gray.200">
              <Button
                variant={'ghost'}
                colorScheme="yellow"
                onClick={() => window.open(item.pdfLink)}
              >
                Download PDF
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
      {/* Pagination */}
      <Flex justifyContent="center" mt="4">
        {[
          ...Array(
            Math.ceil(Object.keys(groupedData).length / itemsPerPage)
          ).keys(),
        ].map(number => (
          <Button
            key={number}
            variant={currentPage === number + 1 ? 'solid' : 'outline'}
            onClick={() => paginate(number + 1)}
            mx="1"
          >
            {number + 1}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

// Pass the dummyData as a prop to the SRMNotes component
const App = () => {
  return <SRMNotes data={dummyData} />;
};

export default App;
