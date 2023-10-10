// Chakra imports
import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
// Assets
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const onDrop = useCallback((acceptedFiles) => {
    props.onFileSelect(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const { content, ...rest } = props;
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  return (
    <Flex
      align="center"
      justify="center"
      bg={bg}
      border="1px dashed"
      borderColor={borderColor}
      borderRadius="16px"
      w="100%"
      h="max-content"
      minH="100%"
      cursor="pointer"
      {...getRootProps({ className: "dropzone" })}
      {...rest}
    >
      <Input name="avatar" variant="main" {...getInputProps()} />
      <Button variant="no-effects">{content}</Button>
    </Flex>
  );
}

export default Dropzone;
