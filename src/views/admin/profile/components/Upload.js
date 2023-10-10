// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import { handleError } from "helpers/handleError";
import React from "react";
import toast from "react-hot-toast";
// Assets
import { MdUpload } from "react-icons/md";
import { uploadAvatar } from "services/userService";
import Dropzone from "views/admin/profile/components/Dropzone";

export default function Upload(props) {
  const { used, total, ...rest } = props;
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";

  const onFileSelect = (files) => {
    setSelectedFiles(files);
  };

  const handleAvatarUpload = async () => {
    let fd = new FormData();
    fd.append("file", selectedFiles[0]);
    setLoading(true)
    try {
      const response = await uploadAvatar({photo: selectedFiles[0]});
      if (response.ok) {
        toast.success(response?.data.message);
      } else {
        toast.error(handleError(response.data));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally{
      setLoading(false)
    }
  };

  return (
    <Card {...rest} mb="20px" align="center" p="20px">
      <Flex h="100%" direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          w={{ base: "100%", "2xl": "268px" }}
          me="36px"
          maxH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          minH={{ base: "60%", lg: "50%", "2xl": "100%" }}
          onFileSelect={onFileSelect}
          content={
            <Box>
              <Icon as={MdUpload} w="80px" h="80px" color={brandColor} />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="xl" fontWeight="700" color={brandColor}>
                  Upload Avatar
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="500" color="secondaryGray.500">
                PNG, JPG and GIF files are allowed
              </Text>
            </Box>
          }
        />
        <Flex direction="column" pe="44px">
          <Text
            color={textColorPrimary}
            fontWeight="bold"
            textAlign="start"
            fontSize="2xl"
            mt={{ base: "20px", "2xl": "50px" }}
          >
            Upload your Avatar
          </Text>
          <Text
            color={textColorSecondary}
            fontSize="md"
            my={{ base: "auto", "2xl": "10px" }}
            mx="auto"
            textAlign="start"
          >
            Give your profile a unique look by uploading a profile picture
          </Text>
          <Flex w="100%">
            <Button
              me="100%"
              mb="50px"
              w="140px"
              minW="140px"
              mt={{ base: "20px", "2xl": "auto" }}
              variant="brand"
              fontWeight="500"
              onClick={handleAvatarUpload}
              isLoading={loading}
              loadingText="Uploading..."
            >
              Upload Avatar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
