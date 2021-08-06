import React from 'react'
import {useEffect, useState} from 'react'
import Player from './Player'

function Players() {
    
    const [players, setPlayers] = useState([])
  
    useEffect(() => {
      fetch("http://localhost:9393/players/")
      .then(r => r.json())
      .then( responseData => { setPlayers(responseData.players); console.log(responseData.players) }  )
    //   .catch(err => {puts err});
    }, [])
    
    const renderPlayers = players.map( player => <Player key={player.id} player={player}/> )
    
    return (
        <div>
            <h2>Players</h2>
            {renderPlayers}
        </div>
    )
}

export default Players
