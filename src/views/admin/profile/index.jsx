import React, { useEffect } from "react";
import useUser from "hooks/useUser"; // Chakra imports
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Button,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalHeader,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";

import { Field, Formik } from "formik";
import { resetPasswordSchema } from "helpers/passwordSchema";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import Notifications from "views/admin/profile/components/Notifications";
import Upload from "views/admin/profile/components/Upload";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import { resetPassword } from "services/userService";
import toast from "react-hot-toast";
import { handleError } from "helpers/handleError";
import { updateAccount } from "services/userService";

export default function Overview() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails: user, refreshUser } = useUser();

  const [show, setShow] = React.useState(false);
  const [activeId, setActiveId] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClick = () => setShow(!show);

  const updatePassword = async (values) => {
    setIsLoading(true);
    try {
      const response = await resetPassword(values);
      console.log(response);
      if (response.ok) {
        onClose();
        toast.success(response?.data.message);
      } else {
        toast.error(handleError(response.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (values) => {
    setIsLoading(true);
    try {
      const response = await updateAccount(values);
      console.log(response);
      if (response.ok) {
        setActiveId("");
        toast.success(response?.data.message);
      } else {
        toast.error(handleError(response.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                current_password: "",
                password: "",
                password_confirmation: "",
              }}
              onSubmit={(values) => {
                console.log(values);
                updatePassword(values);
              }}
              validationSchema={resetPasswordSchema}
            >
              {({ isSubmitting, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <FormControl mb="24px">
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                      htmlFor="password"
                    >
                      Current Password
                    </FormLabel>
                    <Field
                      as={Input}
                      id="current_password"
                      name="current_password"
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
                      New Password
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
                  <Button
                    fontSize="sm"
                    type="submit"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb={3}
                    isLoading={isLoading}
                    loadingText="changing password"
                  >
                    Change Password
                  </Button>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={activeId === "updateProfile"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton onClick={() => setActiveId("")} />
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                two_factor_authentication: false,
              }}
              onSubmit={(values) => {
                console.log(values);
                updateProfile(values);
              }}
            >
              {({ handleSubmit }) => (
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

                  <FormControl mb="24px">
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                      htmlFor="2fa"
                    >
                      Enable 2-Factor Authentication
                    </FormLabel>
                    <Field
                      as={Checkbox}
                      id="two_factor_authentication"
                      name="two_factor_authentication"
                      variant="auth"
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      size="lg"
                    />
                  </FormControl>
                  <Button
                    fontSize="sm"
                    type="submit"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb={3}
                    isLoading={isLoading}
                    loadingText="updating"
                  >
                    Update Profile
                  </Button>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Main Fields */}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr 1.5fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name={user?.name}
          balance={user?.balance.display}
          referralCode={user?.code}
        />
        <Notifications
          used={25.6}
          total={50}
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          onOpen={onOpen}
          setActiveId={setActiveId}
        />
        <Upload
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
          pe="20px"
          pb={{ base: "100px", lg: "20px" }}
        />
      </Grid>
    </Box>
  );
}
