import React from 'react'

function FantasyTeam({team}) {
    
    
    return (
        <div>
            <p>Team name: {team.name}</p>
            <p>Team owner: {team.owner}</p>
        </div>
    )
}

export default FantasyTeam
