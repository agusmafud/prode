const useTournament = () => {
  const createTeams = () => {
    const teams = new Array(4).fill().map((_, i) => `Team ${i+1}`);

    return teams;
  }
  const teams = createTeams();
  const createMatches = () => {
    const matches = new Array(6).fill().map((_, i) => ({
      date: `DateTest ${i+1}`,
      teamA: {
        team: `TeamATest ${i+1}`,
        score: null,
      },
      teamB: {
        team: `TeamBTest ${i+1}`,
        score: null,
      },
    }));

    return matches;
  }
  const matches = createMatches();

  return ({
    teams,
    matches,
  })
};

export default useTournament;
