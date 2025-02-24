import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Heading,
  Select,
  useToast,
  Flex,
  Container,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const EditLead = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/lead/${id}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error("Error fetching lead:", error));
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Valid phone number is required";
    if (!formData.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.put(`http://localhost:5000/api/lead/${id}`, formData);
      toast({
        title: "Lead Updated",
        description: "Lead details have been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        title: "Error",
        description: "Failed to update lead. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-r, blue.50, purple.50)"
      p={4}
    >
      <MotionBox
        maxW="md"
        w="full"
        p={8}
        borderRadius="xl"
        bg="white"
        boxShadow="xl"
        border="1px solid"
        borderColor="gray.200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading
          size="xl"
          mb={6}
          textAlign="center"
          color="blue.600"
          fontWeight="bold"
        >
          Edit Lead
        </Heading>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb={6}>
          Update the lead details below.
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel fontWeight="semibold" color="gray.700">
                Name
              </FormLabel>
              <Input
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                focusBorderColor="blue.500"
                _hover={{ borderColor: "blue.400" }}
                size="lg"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel fontWeight="semibold" color="gray.700">
                Email
              </FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                focusBorderColor="blue.500"
                _hover={{ borderColor: "blue.400" }}
                size="lg"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.phone}>
              <FormLabel fontWeight="semibold" color="gray.700">
                Phone
              </FormLabel>
              <Input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                focusBorderColor="blue.500"
                _hover={{ borderColor: "blue.400" }}
                size="lg"
              />
              <FormErrorMessage>{errors.phone}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.status}>
              <FormLabel fontWeight="semibold" color="gray.700">
                Status
              </FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                focusBorderColor="blue.500"
                _hover={{ borderColor: "blue.400" }}
                size="lg"
              >
                <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
                <option value="Closed">Closed</option>
              </Select>
              <FormErrorMessage>{errors.status}</FormErrorMessage>
            </FormControl>

            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              w="full"
            >
              <Button
                colorScheme="blue"
                w="full"
                type="submit"
                size="lg"
                fontWeight="bold"
                mt={4}
              >
                Update Lead
              </Button>
            </MotionBox>
          </VStack>
        </form>
      </MotionBox>
    </Flex>
  );
};

export default EditLead;
