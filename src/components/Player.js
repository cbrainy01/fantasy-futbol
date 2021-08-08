import React from 'react'
import {useState} from 'react'
import {v4 as uuid} from "uuid"

function Player({player, fantasyTeams}) {
    
    const [selectedTeam, setSelectedTeam] = useState("")
    
    function optionDropdown() {
        return fantasyTeams.map( (team) => {
            return <option key={uuid()} value={team.id}>{team.name}</option>
        } )
    }

    function handleTeamSelect(e) {
        setSelectedTeam(e.target.value)
    }
    console.log("SELECTED TEAM IS: ", selectedTeam)
    
    return (
        <div>
            <h3>{player.name}</h3>
            <img src={player.image} alt={`image of ${player.name}`}/>
            <p>position: {player.position}</p>
            <p>Fantasy team: {player.fantasy_team == null? "no team": "insert team"}</p>
            <p>Goals: {player.goals}</p>
            <p>Assists: {player.assists}</p>
            <p>Goal Involvements: {player.goal_involvements}</p>
            <p>Saves: {player.saves}</p>
            {/* select fantasy team to add to */}
            <select onChange={handleTeamSelect}>
                <option>select team</option>
                {optionDropdown()}
            </select>
            {/* add to team button */}
        </div>
    )
}

export default Player
