
import './App.css';
import useTournament from './hooks/useTournament';
import Tournament from './components/Tournament';

const App = () => {
  const { teams, matches } = useTournament();

  return (
    <div className="App">
      <Tournament
        teams={teams}
        matches={matches}
      />
    </div>
  );
}

export default App;
