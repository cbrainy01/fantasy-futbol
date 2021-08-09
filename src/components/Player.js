import React from 'react'
import {useState} from 'react'
import {v4 as uuid} from "uuid"

function Player({/*comparisonResults,*/ player, fantasyTeams}) {
    
    const [selectedTeamId, setSelectedTeamId] = useState("none selected")
    
    function optionDropdown() {
        return fantasyTeams.map( (team) => {
            return <option key={uuid()} value={team.id}>{team.name}</option>
        } )
    }

    function handleTeamSelect(e) {
        setSelectedTeamId(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const playerStatus = player.status
        // create variable for number of players on selected team

        if(playerStatus != "Free Agent" ) {
            alert("Player is already part of a team")
        }
        // elsif(selected teams number of players on selected team has exceeded the limit ) {
        //     alert("Roster is full")
        // }
        // else {
        //     send id up for patch to be made
        // }

        // send id of selected up to make patch request. BuT fIrsT
        // Find out of player status is "signed" or fantasy_team isnt nil
        // then block that submit request with an alert
    }
    console.log("SELECTED TEAM Id IS: ", selectedTeamId)
    
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

            <form onSubmit={handleSubmit}>
                <select onChange={handleTeamSelect}>
                    <option>select team</option>
                    {optionDropdown()}
                </select>
                <button>add to team</button>
            </form>
        </div>
    )
}

export default Player
