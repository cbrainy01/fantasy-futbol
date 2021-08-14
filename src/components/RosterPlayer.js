import React from 'react'

function RosterPlayer({player, onRelease}) {
    function handleSubmit(e) {
        e.preventDefault()
        console.log("submit made")
        onRelease(player.id, player.fantasy_team_id)
    }
    
    return (
        <div>
            <p>{player.position}-{player.name}</p>
            <img src={player.image} width={"75"} height={"75"} />
            <form value={player.id} onSubmit={handleSubmit}><button>remove from team</button></form>
            <p>______________________</p>
        </div>
    )
}

export default RosterPlayer
