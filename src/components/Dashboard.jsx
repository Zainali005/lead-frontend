import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { getLeads } from '../api';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await getLeads();
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalLeads = leads.length;

  const leadStatusCount = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const cardBg = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.200');

  if (loading) {
    return (
      <Flex justify="center" align="center" h="200px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Heading size="xl" mb={6} color={headingColor}>
        Leads Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Box bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
          <Stat>
            <StatLabel fontSize="lg">Total Leads</StatLabel>
            <StatNumber fontSize="2xl">{totalLeads}</StatNumber>
          </Stat>
        </Box>

        {Object.entries(leadStatusCount).map(([status, count]) => (
          <Box key={status} bg={cardBg} p={6} borderRadius="lg" boxShadow="md">
            <Stat>
              <StatLabel fontSize="lg">{status}</StatLabel>
              <StatNumber fontSize="2xl">{count}</StatNumber>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;