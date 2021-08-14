import React from 'react'
import RosterPlayer from './RosterPlayer'
import {v4 as uuid} from "uuid"

function FantasyTeam({onTeamDelete, onRelease, team}) {

    function handleClick(event) {
        // create delete request
        const idOfTeamToDelete = event.target.value
        console.log("ID: ", idOfTeamToDelete)
        onTeamDelete(team.id)
    }
    // console.log("TEAM : ", team)
    // console.log("TEAM KEYS : ", Object.keys(team) )
    // console.log("Roster length : ", team.roster.length)
    // console.log("ROSTER: ", team.roster)
    
    function renderRoster() {
    if(Object.keys(team).includes("roster") && team.roster_count > 0) { return team.roster.map( (player) => <RosterPlayer key={uuid()} onRelease={onRelease} player={player}/> )}
        else {return <p>No players on roster</p>}
    }
    debugger
    return (
        <div>
            <h2>{team.name}</h2>
            <p>Team owner: {team.owner}</p>
            <button onClick={handleClick}>Delete Team</button>
            <h4>Roster</h4>
            <div>{renderRoster()}</div>
            {/* eventually render players on team as well. Probably requires a Component for each RosterMember*/}
            {/* roster member would have a remove from team button which would lead to a patch request 
            changing player status from "signed" to "Free agent" while also removing that player from given roster */}

            
        </div>
    )
}

export default FantasyTeam
