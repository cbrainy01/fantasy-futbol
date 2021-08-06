import React from 'react'
import {useEffect, useState} from 'react'
import FantasyTeam from './FantasyTeam'

function FantasyTeams() {
    
    const [fantasyTeams, setFantasyTeams] = useState([])

    useEffect(() => {
        fetch("http://localhost:9393/fantasy_teams/")
      .then(r => r.json())
      .then( responseData => { setFantasyTeams(responseData.teams) }  )
    }, [])
    
    const renderTeams = fantasyTeams.map( team => <FantasyTeam key={team.id} team={team}/> )

    return (
        <div>
              <h2>Fantasy Teams</h2>   
              {renderTeams}
        </div>
    )
}

export default FantasyTeams
