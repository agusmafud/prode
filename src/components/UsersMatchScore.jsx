import React from 'react';
import {
  TableContainer,
  Table,
  Tr,
  Td,
  Tbody,
  Avatar,
  Text,
  Flex,
  VStack,
  Box,
  AvatarBadge,
  useDisclosure,
  Button,
  Collapse,
} from '@chakra-ui/react';
import { getResultData, transformUsers } from 'helpers';

const UsersMatchScore = ({
  matchId,
  users,
  user,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const orderedUsers = transformUsers(users);
  const matchResults = orderedUsers.reduce((acc, currentUser) => {
    const userMatchResult = currentUser?.matches.find((match) => match.matchId === matchId);

    if (currentUser.id === user.id) return acc;
    if (userMatchResult?.score) {
      return ([
        ...acc,
        {
          user: currentUser,
          score: userMatchResult.score,
          ...(userMatchResult.points && { points: userMatchResult.points }),
        },
      ]);
    }
    return acc;
  }, []);
  const teams = matchResults && matchResults[0]?.score && Object.keys(matchResults[0].score);

  return matchResults?.length > 0 && (
    <>
      <Button
        onClick={onToggle}
        variant="outline"
        size="xs"
        marginBottom={{ base: 2, md: 4 }}
        colorScheme="orange"
      >
        ¿Qué votó la gilada?
      </Button>
      <Collapse in={isOpen} animateOpacity>

        <TableContainer>
          <Table
            variant="striped"
            colorScheme="gray"
            size="sm"
            marginBottom={4}
          >
            <Tbody>
              {matchResults.map((result) => {
                const name = result.user?.displayName || result.user.email;
                const resultData = result?.points && getResultData(result.points);
                const color = resultData?.color ?? 'black';
                const Icon = resultData?.Icon ?? null;

                return (
                  <Tr key={result.user.id}>
                    <Td>
                      <Flex alignItems="center">
                        <Box flexGrow={1}>
                          <Avatar
                            src={result.user.photoURL}
                            name={name}
                            size="sm"
                          >
                            {Icon && (
                              <AvatarBadge bg={color}>
                                <Icon color="white" />
                              </AvatarBadge>
                            )}
                          </Avatar>
                        </Box>
                        <VStack>
                          <Text
                            fontSize="sm"
                            marginLeft={{ base: 2, md: 4 }}
                          >
                            {name}
                          </Text>
                          <Text
                            fontSize="sm"
                          >
                            {teams.map((team) => (
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                display="inline"
                                color={color}
                              >
                                {`${team}: ${result.score[team]} `}
                              </Text>
                            ))}
                          </Text>
                        </VStack>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Collapse>
    </>
  );
};

export default UsersMatchScore;
