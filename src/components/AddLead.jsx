import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLead } from "../api";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  useToast,
  Heading,
  Flex,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const AddLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Valid phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addLead(formData);
      toast({
        title: "Lead Added",
        description: "New lead has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding lead:", error);
      toast({
        title: "Error",
        description: "Failed to add lead. Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.50" p={4}>
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
        <Heading size="lg" mb={6} textAlign="center" color="blue.600">
          Add New Lead
        </Heading>
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

            <FormControl>
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
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
                <option value="Closed">Closed</option>
              </Select>
            </FormControl>
            <Button
              colorScheme="blue"
              w="full"
              type="submit"
              size="lg"
              fontWeight="bold"
              mt={4}
              _hover={{ transform: "scale(1.05)" }}
              _active={{ transform: "scale(0.95)" }}
            >
              Add Lead
            </Button>
          </VStack>
        </form>
      </MotionBox>
    </Flex>
  );
};

export default AddLead;
