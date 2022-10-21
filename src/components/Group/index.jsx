import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

import Match from 'components/Match';
import { getMatchTeamsData } from 'helpers';

const Group = ({
  group,
  teams,
  matches,
  serverProps,
}) => (
  <AccordionItem key={group.id}>
    <AccordionButton
      _expanded={{
        borderBottomWidth: '1px',
        borderColor: 'gray.200',
      }}
    >
      <Box flex="1" textAlign="left">
        {group.label}
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel
      padding={8}
    >
      {matches.map((match) => {
        const {
          teams: matchTeams,
          ...matchData
        } = match;
        const matchTeamsData = getMatchTeamsData({ matchTeams, teams });

        return (
          <Match
            key={match.date + match.teams[0]}
            match={matchData}
            teams={matchTeamsData}
            serverProps={serverProps}
          />
        );
      })}
    </AccordionPanel>
  </AccordionItem>
);

export default Group;
