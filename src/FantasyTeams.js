import React from 'react'
import {useEffect, useState} from 'react'
import CreateFantasyTeam from './CreateFantasyTeam'
import FantasyTeam from './FantasyTeam'
import {v4 as uuid} from "uuid"

function FantasyTeams() {
    
    const [fantasyTeams, setFantasyTeams] = useState([])

    useEffect(() => {
        fetch("http://localhost:9393/fantasy_teams/")
      .then(r => r.json())
      .then( responseData => { setFantasyTeams(responseData.teams); console.log("INITIAL FETCH: ", responseData.teams) }  )
    }, [])
    
    function handleTeamCreate(newTeam) {
        setFantasyTeams([...fantasyTeams, newTeam])
    }

    console.log("ALL TEAMS: ", fantasyTeams)

    const renderTeams = fantasyTeams.map( team => <FantasyTeam key={uuid()} team={team}/> )

    return (
        <div> 
              <CreateFantasyTeam onTeamCreate={handleTeamCreate}/> 
              <h2>Fantasy Teams</h2> 
              {renderTeams}
        </div>
    )
}

export default FantasyTeams
