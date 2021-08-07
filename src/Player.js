import React from 'react'

function Player({player}) {
    
    
    
    
    
    return (
        <div>
            <h3>{player.name}</h3>
            <p>position: {player.position}</p>
            <p>Fantasy team: {player.fantasy_team == null? "no team": "insert team"}</p>
            <p>Goals: {player.goals}</p>
            <p>Assists: {player.assists}</p>
            <p>Goal Involvements: {player.goal_involvements}</p>
            <p>Saves: {player.saves}</p>
        </div>
    )
}

export default Player
