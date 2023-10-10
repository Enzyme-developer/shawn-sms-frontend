import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  PinInput,
  PinInputField,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { signIn } from "services/userService";
import { toast } from "react-hot-toast";
import { handleError } from "helpers/handleError";
import { login_2fa } from "services/userService";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const history = useHistory();

  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [next, setNext] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [token, setToken] = React.useState("");
  let [time, setTime] = React.useState(0);

  const handleChange = (value) => {
    setCode(value);
  };
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await signIn(values);
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response?.data.authentication.token);
          toast.success(response?.data.message);
          history.push("/");
        } else if (response.status === 202) {
          setNext(true);
          toast.success(response?.data.message);
          setTime(new Date(response.data.expires_at * 1000).getMinutes());
          setToken(response.data.token);
        } else {
          toast.error(handleError(response.data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });

  // resend otp
  const resendCode = async () => {
    setLoading(true);
    try {
      const response = await signIn({
        email: formik.values.email,
        password: formik.values.password,
      });
      if (response.ok) {
        toast.success(response?.data.message);
        setTime(new Date(response.data.expires_at * 1000).getMinutes());
        setToken(response.data.token);
      } else {
        toast.error(handleError(response.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handle2faLogin = async () => {
    setLoading(true);
    try {
      const response = await login_2fa({ token, code });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response?.data.authentication.token);
        toast.success(response?.data.message);
        history.push("/");
      } else {
        toast.error(handleError(response.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (next) {
      const countdown = () => {
        setInterval(() => {
          if (time >= 0) {
            setTime(time--);
          }
        }, 60000);
      };
      countdown();
    }
  }, [next, loading, time]);

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
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
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
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              {!next && (
                <>
                  <FormLabel
                    display="flex"
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    mb="8px"
                  >
                    Email<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant="auth"
                    name="email"
                    onChange={formik.handleChange}
                    fontSize="sm"
                    ms={{ base: "0px", md: "0px" }}
                    type="phone"
                    placeholder="johndoe@gmail.com"
                    mb="24px"
                    fontWeight="500"
                    size="lg"
                  />
                  <FormLabel
                    ms="4px"
                    fontSize="sm"
                    fontWeight="500"
                    color={textColor}
                    display="flex"
                  >
                    Password<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      isRequired={true}
                      name="password"
                      onChange={formik.handleChange}
                      fontSize="sm"
                      placeholder="Min. 8 characters"
                      mb="24px"
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
                  <Flex justifyContent="space-between" align="center" mb="24px">
                    <NavLink to="/auth/forgot-password">
                      <Text
                        color={textColorBrand}
                        fontSize="sm"
                        w="124px"
                        fontWeight="500"
                      >
                        Forgot password?
                      </Text>
                    </NavLink>
                  </Flex>
                  <Button
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="24px"
                    type="submit"
                    isLoading={loading}
                    loadingText="signing in"
                  >
                    Sign In
                  </Button>
                </>
              )}
              {next && (
                <>
                  <HStack mb="24px" className="centered">
                    <PinInput
                      variant="auth"
                      value={code}
                      onChange={handleChange}
                      type="number"
                      fontSize="sm"
                      size="lg"
                      onComplete={setCode}
                    >
                      <PinInputField size="lg" />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>

                  <Flex justifyContent="space-between" align="center" mb="24px">
                    <FormControl display="flex" alignItems="center">
                      <FormLabel
                        mb="0"
                        fontWeight="normal"
                        color={textColor}
                        fontSize="sm"
                      >
                        OTP expires in {time} minutes
                      </FormLabel>
                    </FormControl>
                    <Button
                      fontSize="sm"
                      variant="ghost"
                      fontWeight="500"
                      w="100%"
                      h="50"
                      loadingText="verifying"
                      isLoading={loading}
                      onClick={resendCode}
                    >
                      Resend Code
                    </Button>
                  </Flex>

                  <Flex justifyContent="space-between" align="center" mb="24px">
                    <NavLink to="/auth/forgot-password">
                      <Text
                        color={textColorBrand}
                        fontSize="sm"
                        w="124px"
                        fontWeight="500"
                      >
                        Forgot password?
                      </Text>
                    </NavLink>
                  </Flex>
                  <Button
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="24px"
                    isLoading={loading}
                    loadingText="signing in"
                    onClick={handle2faLogin}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </FormControl>
          </form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink to="/auth/register">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
