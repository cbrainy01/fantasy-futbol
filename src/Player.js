import React from 'react'
import {useState} from 'react'
import {v4 as uuid} from "uuid"

function Player({player}) {
    
    const [selectedTeam, setSelectedTeam] = useState("")
    
    
    
    return (
        <div>
            <h3>{player.name}</h3>
            <p>position: {player.position}</p>
            <p>Fantasy team: {player.fantasy_team == null? "no team": "insert team"}</p>
            <p>Goals: {player.goals}</p>
            <p>Assists: {player.assists}</p>
            <p>Goal Involvements: {player.goal_involvements}</p>
            <p>Saves: {player.saves}</p>
            {/* select fantasy team to add to */}
            {/* add to team button */}
        </div>
    )
}

export default Player
