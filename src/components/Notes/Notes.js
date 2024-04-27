import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  Input,
  Select,
} from '@chakra-ui/react';
import dummyData from './dummy.json';

const SRMNotes = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items per page

  // Function to handle search and folder selection
  const handleSearchAndFolderSelect = useCallback(() => {
    let filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedFolder !== 'All') {
      filteredData = filteredData.filter(
        item => item.folder === selectedFolder
      );
    }
    setSearchResults(filteredData);
    setCurrentPage(1); // Reset to the first page after search or folder change
  }, [data, searchQuery, selectedFolder]);

  // Trigger search and folder selection automatically when searchQuery or selectedFolder changes
  useEffect(() => {
    handleSearchAndFolderSelect();
  }, [handleSearchAndFolderSelect]);

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
      <Flex mb="4" alignItems="center">
        <Input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          mr="2"
          maxWidth="300px"
        />
        <Select
          value={selectedFolder}
          onChange={e => setSelectedFolder(e.target.value)}
          maxWidth="200px"
        >
          <option value="All">All Notes</option>
          {/* Add options for each folder */}
          {Array.from(new Set(data.map(item => item.folder))).map(folder => (
            <option key={folder} value={folder}>
              {folder}
            </option>
          ))}
        </Select>
      </Flex>
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
                  {item.folder}
                </Text>
              </Box>
              <Box mt="1" fontWeight="semibold" lineHeight="tight">
                <Text fontSize="lg">{item.name}</Text>
              </Box>
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
