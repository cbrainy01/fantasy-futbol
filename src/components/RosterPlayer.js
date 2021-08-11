import React from 'react'

function RosterPlayer({player, onRelease}) {
    
    function handleSubmit(e) {
        e.preventDefault()
        console.log("submit made")
        onRelease(player.id, player.fantasy_team_id)
    }
    
    return (
        <div>
            <p>{player.name}</p>
            <form value={player.id} onSubmit={handleSubmit}><button>remove from team</button></form>
            
        </div>
    )
}

export default RosterPlayer
