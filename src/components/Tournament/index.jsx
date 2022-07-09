const Tournament = ({
  teams,
  matches,
}) => (
  <>
    <h2>Teams</h2>
    {teams.map((team) => <p key={team}>{team}</p>)}
    <hr class="solid" />
    <h2>Matches</h2>
    {matches.map((match) => (
      <div key={match.date}>
        <p>{`Date: ${match.date}`}</p>
        <p>{`Team A: ${match.teamA.team}`}</p>
        <p>
          {match.teamA.score !== null
            ? `Score: ${match.teamA.score}`
            : 'No score'
          }
        </p>
        <p>{`Team B: ${match.teamB.team}`}</p>
        <p>
          {match.teamB.score !== null
            ? `Score: ${match.teamB.score}`
            : 'No score'
          }
        </p>
        <hr class="solid" />
      </div>
    ))}
  </>
);
  

export default Tournament;
