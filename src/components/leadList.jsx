import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLeads, deleteLead, updateLead } from "../api";
import {
  Box,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const toast = useToast();
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await getLeads();
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leads.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLead(id);
      setLeads(leads.filter((lead) => lead._id !== id));
      toast({
        title: "Lead Deleted",
        description: "The lead has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        title: "Error",
        description: "Failed to delete lead.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus });
      setLeads(
        leads.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead
        )
      );
      toast({
        title: "Status Updated",
        description: "The lead status has been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update lead status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeads = leads
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    leads.filter((lead) => (statusFilter ? lead.status === statusFilter : true))
      .length / itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="blue.600">
          Leads List
        </Heading>
        <Link to="/dashboard">
          <Button colorScheme="blue" size="sm">
            Lead Dashboard
          </Button>
        </Link>
        <Link to="/add">
          <Button colorScheme="blue" size="sm">
            Add Lead
          </Button>
        </Link>
      </Flex>

      <Select
        placeholder="Filter by Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        mb={6}
        maxW="300px"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
        <option value="Closed">Closed</option>
      </Select>

      {loading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <>
          <Box overflowX="auto">
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentLeads.map((lead) => (
                  <Tr key={lead._id}>
                    <Td>{lead.name}</Td>
                    <Td>{lead.email}</Td>
                    <Td>{lead.phone}</Td>
                    <Td>
                      <Select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead._id, e.target.value)
                        }
                        size="sm"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                        <option value="Closed">Closed</option>
                      </Select>
                    </Td>
                    <Td>
                      <Link to={`/edit/${lead._id}`}>
                        <Button colorScheme="yellow" size="sm" mr={2}>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDelete(lead._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>

          <Flex justify="center" mt={6} align="center">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              colorScheme="blue"
              variant="outline"
              mr={2}
            >
              Previous
            </Button>
            <Text mx={2} fontWeight="bold">
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              colorScheme="blue"
              variant="outline"
              ml={2}
            >
              Next
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default LeadsList;
