import React from 'react'

function RosterPlayer({player}) {
    
    function handleSubmit(e) {
        onRelease(e.target.value)
    }
    
    return (
        <div>
            <p>{player.name}</p>
            <button value={player.id} onSubmit={handleSubmit}>remove from team</button>
        </div>
    )
}

export default RosterPlayer
