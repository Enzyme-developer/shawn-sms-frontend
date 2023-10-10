import React from "react";
import { NavLink } from "react-router-dom";
import { Formik, Field } from "formik";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { RiEyeCloseLine } from "react-icons/ri";
import { registerUser } from "services/userService";
import { passwordSchema } from "helpers/passwordSchema";
import { useHistory } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdOutlineRemoveRedEye } from "react-icons/md";

function Register() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClick = () => setShow(!show);

  const history = useHistory();

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      const response = await registerUser(values);
      console.log(response);
      if (response.ok) {
        localStorage.setItem("token", response?.data.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response?.data.user)
        );
        toast.success(response?.data.message);
        history.push("/");
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Register
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your detais to register!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              password_confirmation: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleRegister(values);
            }}
            validationSchema={passwordSchema}
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
                    Name
                  </FormLabel>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    type="text"
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    placeholder="John Doe"
                    fontWeight="500"
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired mb="24px">
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                    htmlFor="email"
                  >
                    Email
                  </FormLabel>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    variant="auth"
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    placeholder="mail@simmmple.com"
                    fontWeight="500"
                    size="lg"
                  />
                </FormControl>

                <FormControl
                  mb="24px"
                  isInvalid={!!errors.password && touched.password}
                >
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                    htmlFor="password"
                  >
                    Password
                  </FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    render={({ field, form: { isSubmitting } }) => (
                      <InputGroup size="md">
                        <Input
                          {...field}
                          fontSize="sm"
                          placeholder="Min. 8 characters"
                          size="lg"
                          type={show ? "text" : "password"}
                          variant="auth"
                        />
                        <InputRightElement
                          display="flex"
                          alignItems="center"
                          mt="4px"
                        >
                          <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                            onClick={handleClick}
                          />
                        </InputRightElement>
                      </InputGroup>
                    )}
                  />
                  <FormErrorMessage mb="24px">
                    {errors.password}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mb="24px"
                  isInvalid={
                    !!errors.password_confirmation &&
                    touched.password_confirmation
                  }
                >
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                    htmlFor="password_confirmation"
                  >
                    Confirm Password
                  </FormLabel>
                  <Field
                    as={Input}
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    render={({ field, form: { isSubmitting } }) => (
                      <InputGroup size="md">
                        <Input
                          {...field}
                          fontSize="sm"
                          placeholder="Min. 8 characters"
                          size="lg"
                          type={show ? "text" : "password"}
                          variant="auth"
                        />
                        <InputRightElement
                          display="flex"
                          alignItems="center"
                          mt="4px"
                        >
                          <Icon
                            color={textColorSecondary}
                            _hover={{ cursor: "pointer" }}
                            as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                            onClick={handleClick}
                          />
                        </InputRightElement>
                      </InputGroup>
                    )}
                  />
                  <FormErrorMessage mb="24px">
                    {errors.password_confirmation}
                  </FormErrorMessage>
                </FormControl>

                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                  <NavLink to="/auth/forgot-password">
                    <Text
                      color={textColorBrand}
                      as="span"
                      ms="5px"
                      fontWeight="500"
                    >
                      Forgot Password?
                    </Text>
                  </NavLink>
                </Text>
                <Button
                  type="submit"
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  my="24px"
                  isLoading={isLoading}
                  loadingText="creating account"
                >
                  Register
                </Button>
              </form>
            )}
          </Formik>

          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Sign in
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default Register;
