// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { useAuth } from "contexts/authContext";
import { Field, Formik } from "formik";
import { handleError } from "helpers/handleError";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { eventStream } from "services/orderService";
import { placeOrder } from "services/orderService";
import { getServices } from "services/orderService";
import { getCountries } from "services/orderService";

export default function SmsOrder(props) {
  const { ...rest } = props;
  const { refreshUser } = useAuth();
  const [countries, setCountries] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleOrder = async (values) => {
    setLoading(true);
    try {
      const response = await placeOrder(values);
      console.log(response);
      if (response.status === 201) {
        //call event stream
        await eventStream();
        toast.success(response.data.message);
      } else {
        toast.error(handleError(response.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      console.log(response);
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await getServices();
      console.log(response);
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchServices();
  }, []);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card
      justifyContent=""
      align=""
      direction="column"
      w="100%"
      mb="0px"
      mt="20"
      {...rest}
    >
      <Flex w="100%" flexDirection={{ base: "column", lg: "row" }}>
        <Box minW="100%" mt="auto">
          <Flex flexDirection="column" me="20px" mt="28px">
            <Text
              color={textColor}
              fontSize="34px"
              textAlign="start"
              fontWeight="700"
              lineHeight="100%"
            >
              New Order
            </Text>
          </Flex>
          <Flex flexDirection="column" mt="28px">
            <Formik
              initialValues={{
                country: "",
                service: "",
              }}
              onSubmit={(values) => {
                handleOrder(values);
              }}
            >
              {({ isSubmitting, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl isRequired mb="24px">
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                      htmlFor="name"
                    >
                      Country
                    </FormLabel>
                    <Field
                      as={Select}
                      id="country"
                      name="country"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      placeholder="Select a Country"
                      fontWeight="500"
                      size="lg"
                    >
                      <option value="Nigeria">Nigeria</option>
                      {countries?.map((country, index) => (
                        <option key={index} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  <FormControl isRequired mb="24px">
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                      htmlFor="name"
                    >
                      Service
                    </FormLabel>
                    <Field
                      as={Select}
                      id="service"
                      name="service"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      placeholder="Select a Service"
                      fontWeight="500"
                      size="lg"
                    >
                      <option value="Nigeria">Nigeria</option>
                      {services?.map((service, index) => (
                        <option key={index} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </Field>
                  </FormControl>

                  <Button
                    type="submit"
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w=""
                    h="50"
                    my="24px"
                    isLoading={loading}
                    loadingText="processing order"
                  >
                    Place Order
                  </Button>
                </form>
              )}
            </Formik>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
