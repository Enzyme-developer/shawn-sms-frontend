import React from "react";
// Chakra imports
import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import SwitchField from "components/fields/SwitchField";
import Menu from "components/menu/MainMenu";
import { handleError } from "helpers/handleError";
import toast from "react-hot-toast";
import { verifyAccount } from "services/userService";

export default function Notifications(props) {
  const [loading, setLoading] = React.useState(false);

  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      const response = await verifyAccount({
        email: "talabiayomide2000@gmail.com",
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response?.data.message);
      } else {
        toast.error(handleError(response.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card mb="20px" mt="40px" mx="auto" maxW="410px" {...rest}>
      <Flex align="center" w="100%" justify="space-between" mb="30px">
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mb="4px"
        >
          Preferences
        </Text>
        {/* <Menu /> */}
      </Flex>
      <SwitchField
        isChecked={true}
        reversed={true}
        fontSize="sm"
        mb="20px"
        id="1"
        label="2-factor authentication"
      />
      <Button
        fontSize="sm"
        variant="brand"
        fontWeight="500"
        w="100%"
        mb="20px"
        h="50"
        onClick={props.onOpen}
      >
        Change Password
      </Button>

      <Button
        fontSize="sm"
        variant="brand"
        fontWeight="500"
        w="100%"
        h="50"
        mb="20px"
        onClick={() => props.setActiveId("updateProfile")}
      >
        Update Profile
      </Button>

      <Button
        fontSize="sm"
        variant="ghost"
        fontWeight="500"
        w="100%"
        h="50"
        loadingText="verifying"
        isLoading={loading}
        onClick={handleEmailVerification}
      >
        Verify Account
      </Button>
    </Card>
  );
}
