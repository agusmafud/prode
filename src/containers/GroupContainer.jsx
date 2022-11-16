import React from 'react';

import Group from 'components/Group';
import { getGroupTeamsData, getGroupMatchesData } from 'helpers';

const GroupContainer = ({
  group,
  teams,
  matches,
  dbProps,
  actualResultsEditable,
  users,
}) => {
  const {
    teams: groupTeams,
    matches: groupMatches,
    ...groupData
  } = group;
  const groupTeamsData = getGroupTeamsData({ groupTeams, teams });
  const groupMatchesData = getGroupMatchesData({ groupMatches, matches });

  return (
    <Group
      key={group.id}
      group={groupData}
      teams={groupTeamsData}
      matches={groupMatchesData}
      dbProps={dbProps}
      actualResultsEditable={actualResultsEditable}
      users={users}
    />
  );
};

export default GroupContainer;
