import {
  Flex,
  Table,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  TableContainer,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

// Custom components
import Card from "components/card/Card";

// Assets
import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdAddCircle,
} from "react-icons/md";
import useUser from "hooks/useUser";
import toast from "react-hot-toast";
import { handleError } from "helpers/handleError";
import { getOrders } from "services/orderService";

export default function OrdersTable(props) {
  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const { userDetails, refreshUser } = useUser();

  useEffect(() => {
    // refreshUser();
    //fetch all orders
    const fetchData = async () => {
      try {
        setLoading(true);
        // const response = await getOrders();
        // console.log(response);
        // setOrders(response.data.data);
      } catch (error) {
        console.log(error);
        toast.error(handleError(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Orders
        </Text>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>All orders</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Amount</Th>
              <Th>Number</Th>
              <Th>Account Number</Th>
              <Th>Reference</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders && orders.length > 0
              ? orders.map((order, index) => (
                  <Tr>
                    <Td>{order.id}</Td>
                    <Td>₦{(order.amount / 100).toLocaleString()}</Td>
                    <Td>
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={
                            order.status === "approved"
                              ? "green.500"
                              : order.status === "rejected"
                              ? "red.500"
                              : order.status === "pending"
                              ? "orange.500"
                              : null
                          }
                          as={
                            order.status === "approved"
                              ? MdCheckCircle
                              : order.status === "rejected"
                              ? MdCancel
                              : order.status === "pending"
                              ? MdOutlineError
                              : null
                          }
                        />
                        {order.status}
                      </Flex>
                    </Td>
                    <Td>{order.account_number}</Td>
                    <Td>{order.bank_name}</Td>
                    <Td>{order.created_at}</Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}
