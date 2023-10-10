import React from "react";
import logo from "../../../assets/img/avatars/shawn-sms-logo.jpeg";
// Chakra imports
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode

  return (
    <Flex align="left" direction="column">
      <Image style={{width: "150px", height: "auto", objectFit:"contain" }} src={logo} alt="shawn-sms logo" />
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
