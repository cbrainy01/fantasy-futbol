import React from 'react'

function FantasyTeam({onTeamDelete, team}) {
    
    function handleClick(event) {
        // create delete request
        const idOfTeamToDelete = event.target.value
        console.log("ID: ", idOfTeamToDelete)
        onTeamDelete(idOfTeamToDelete)
    }
    console.log("TEAM ROster: ", team.roster)

    team.roster.each( (player) => <RosterPlayer player={player}/> )

    return (
        <div>
            <p>Team name: {team.name}</p>
            <p>Team owner: {team.owner}</p>
        
            {/* eventually render players on team as well. Probably requires a Component for each RosterMember*/}
            {/* roster member would have a remove from team button which would lead to a patch request 
            changing player status from "signed" to "Free agent" while also removing that player from given roster */}

            <button value={team.id} onClick={handleClick}>Delete Team</button>
        </div>
    )
}

export default FantasyTeam
