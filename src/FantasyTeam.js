import React from 'react'

function FantasyTeam({team}) {
    
    
    return (
        <div>
            <p>Team name: {team.name}</p>
            <p>Team owner: {team.owner}</p>
            {/* eventually render players on team as well */}
        </div>
    )
}

export default FantasyTeam
