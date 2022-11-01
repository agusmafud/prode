import React from 'react';
import {
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';

import AccordionButton from 'components/AccordionButton';
import Match from 'components/Match';
import { getMatchTeamsData } from 'helpers';

const Group = ({
  group,
  teams,
  matches,
  dbProps,
}) => (
  <AccordionItem>
    <AccordionButton label={group.label} />
    <AccordionPanel padding={0}>
      {matches.map((match, index) => {
        const {
          teams: matchTeams,
          ...matchData
        } = match;
        const matchTeamsData = getMatchTeamsData({ matchTeams, teams });
        const limitTime = 5 * 60;
        const scoreEnabled = matchData.date.seconds > (dbProps.time + limitTime);
        const minutesLeft = Math.trunc((match.date.seconds - dbProps.time - limitTime) / 60);

        return (
          <Match
            key={match.date + match.teams[0]}
            index={index}
            match={matchData}
            teams={matchTeamsData}
            scoreEnabled={scoreEnabled}
            minutesLeft={minutesLeft}
            dbProps={dbProps}
          />
        );
      })}
    </AccordionPanel>
  </AccordionItem>
);

export default Group;
