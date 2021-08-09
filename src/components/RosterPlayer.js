import React from 'react'

function RosterPlayer({player}) {
    return (
        <div>
            <p>{player.name}</p>
            <button>remove from team</button>
        </div>
    )
}

export default RosterPlayer
