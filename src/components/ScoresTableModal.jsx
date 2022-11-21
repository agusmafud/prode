import React from 'react';
import {
  useDisclosure,
  TableContainer,
  Table,
  Tr,
  Td,
  Tbody,
  Avatar,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  HStack,
} from '@chakra-ui/react';
import { getResultData } from 'helpers';

const ScoresTableModal = ({ users }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const transformUsers = () => {
    const activeUsers = users.filter((user) => user?.photoURL && user?.email && user?.displayName);
    const orderedUsers = activeUsers.sort((a, b) => b.points - a.points);

    return orderedUsers;
  };
  const orderedUsers = transformUsers();

  return (
    <>
      <Button
        onClick={onOpen}
        size={{ base: 'sm', md: 'lg' }}
        colorScheme="orange"
      >
        Puntajes
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'full', md: 'xl' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tabla de posiciones</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table
                variant="striped"
                colorScheme="gray"
                size={{ base: 'sm', md: 'md' }}
              >
                <Tbody>
                  {orderedUsers.map((user, index) => {
                    const position = index + 1;
                    const name = user?.displayName || user.email;

                    return (
                      <Tr key={user.id}>
                        <Td>
                          <Flex alignItems="center">
                            <Text
                              fontSize={{ base: 'sm', md: 'md' }}
                              fontWeight="bold"
                              marginRight={4}
                            >
                              {position}
                              º
                            </Text>
                            <Avatar
                              src={user.photoURL}
                              name={name}
                              size={{ base: 'sm', md: 'md' }}
                            />
                            <Text
                              fontSize={{ base: 'sm', md: 'md' }}
                              marginLeft={{ base: 2, md: 4 }}
                            >
                              {name}
                            </Text>
                          </Flex>
                        </Td>
                        <Td isNumeric fontWeight="bold">{user.points}</Td>
                        <Td>
                          <HStack spacing="0">
                            {user?.matches?.map((match) => {
                              const resultData = getResultData(match.points);
                              const { Icon, color } = resultData;

                              return (
                                <Tooltip
                                  key={match.matchId}
                                  label={match.label}
                                >
                                  <Flex
                                    width="20px"
                                    height="20px"
                                    borderWidth="1px"
                                    borderRadius="sm"
                                    justifyContent="center"
                                    alignItems="center"
                                    background={color}
                                  >
                                    <Icon color="white" />
                                  </Flex>
                                </Tooltip>
                              );
                            })}
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScoresTableModal;
