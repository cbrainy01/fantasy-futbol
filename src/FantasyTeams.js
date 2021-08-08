import React from 'react'
import {useEffect, useState} from 'react'
import CreateFantasyTeam from './CreateFantasyTeam'
import FantasyTeam from './FantasyTeam'
import {v4 as uuid} from "uuid"

function FantasyTeams() {
    
    const [fantasyTeams, setFantasyTeams] = useState([])
    const [selectedTeam, setSelectedTeam] = useState("none selected")

    useEffect(() => {
        fetch("http://localhost:9393/fantasy_teams/")
      .then(r => r.json())
      .then( responseData => { setFantasyTeams(responseData.teams); console.log("INITIAL FETCH: ", responseData.teams) }  )
    }, [])
    
    function handleTeamCreate(newTeam) {
        setFantasyTeams([...fantasyTeams, newTeam])
    }
    console.log("ALL TEAMS: ", fantasyTeams)
    
    function optionDropdown() {
        return fantasyTeams.map( (team) => {
            return <option key={uuid()} value={team.id}>{team.name}</option>
        } )
    }

    function handleTeamSelect(e) {
        const teamObj = fantasyTeams.find( (team) => team.id == e.target.value )
        setSelectedTeam(teamObj)
    }

    function renderSelectedTeam() {
        if(selectedTeam == "none selected") {
            return <p>no team selected</p>
        }
        else {
            return <FantasyTeam team={selectedTeam}/>
        }
    }


    const renderTeams = fantasyTeams.map( team => <FantasyTeam key={uuid()} team={team}/> )

    return (
        <div> 
              <CreateFantasyTeam onTeamCreate={handleTeamCreate}/> 
              <h2>Fantasy Teams</h2> 
              <select onChange={handleTeamSelect}>
                  <option>select team</option>
                  {optionDropdown()}
              </select>
              {renderSelectedTeam()}
              {/* {renderTeams} */}
        </div>
    )
}

export default FantasyTeams
