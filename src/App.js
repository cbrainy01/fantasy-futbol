import Players from './Players';
import {useEffect, useState} from 'react'
import FantasyTeams from './FantasyTeams';
import CreateFantasyTeam from './CreateFantasyTeam';

function App() {



  return (
    <div className="App">
      <Players/>
      <CreateFantasyTeam/>
      <FantasyTeams/>
    </div>
  );
}

export default App;
