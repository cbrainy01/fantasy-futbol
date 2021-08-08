import React from 'react'

function FantasyTeam({onTeamDelete, team}) {
    
    function handleClick(event) {
        // create delete request
        const idOfTeamToDelete = event.target.value
        console.log("ID: ", idOfTeamToDelete)
        onTeamDelete(idOfTeamToDelete)
    }
    
    return (
        <div>
            <p>Team name: {team.name}</p>
            <p>Team owner: {team.owner}</p>
            {/* eventually render players on team as well */}

            <button value={team.id} onClick={handleClick}>Delete Team</button>
        </div>
    )
}

export default FantasyTeam
