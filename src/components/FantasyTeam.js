import React from 'react'
import RosterPlayer from './RosterPlayer'
import {v4 as uuid} from "uuid"

function FantasyTeam({onTeamDelete, team}) {
    
    function handleClick(event) {
        // create delete request
        const idOfTeamToDelete = event.target.value
        console.log("ID: ", idOfTeamToDelete)
        onTeamDelete(idOfTeamToDelete)
    }
    console.log("TEAM ROster: ", team.roster)

    const renderRoster = team.roster.map( (player) => <RosterPlayer key={uuid()} player={player}/> )

    return (
        <div>
            <h2>{team.name}</h2>
            <p>Team owner: {team.owner}</p>
            <button value={team.id} onClick={handleClick}>Delete Team</button>
            <h4>Roster</h4>
            <div>{renderRoster}</div>
            {/* eventually render players on team as well. Probably requires a Component for each RosterMember*/}
            {/* roster member would have a remove from team button which would lead to a patch request 
            changing player status from "signed" to "Free agent" while also removing that player from given roster */}

            
        </div>
    )
}

export default FantasyTeam
