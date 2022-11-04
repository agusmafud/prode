import React from 'react';
import {
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';

import AccordionButton from 'components/AccordionButton';
import MatchContainer from 'components/Match/MatchContainer';

const Group = ({
  group,
  teams,
  matches,
  dbProps,
}) => (
  <AccordionItem>
    <AccordionButton label={group.label} />
    <AccordionPanel padding={0}>
      {matches.map((match, index) => (
        <MatchContainer
          key={match.date + match.teams[0]}
          index={index}
          match={match}
          teams={teams}
          dbProps={dbProps}
        />
      ))}
    </AccordionPanel>
  </AccordionItem>
);

export default Group;
