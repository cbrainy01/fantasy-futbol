import React from 'react'
import {useEffect, useState} from 'react'
import Player from './Player'
import {v4 as uuid} from "uuid"


function Players() {
    
    const [players, setPlayers] = useState([])
  
    useEffect(() => {
      fetch("http://localhost:9393/players/")
      .then(r => r.json())
      .then( responseData => { setPlayers(responseData.players); console.log("PLAYERS: ", responseData.players) }  )
    }, [])



    function optionDropdown1() {

        const renderPlayers = players.map( (player)=>{
            return <option key={uuid()} value={player.id}>{player.name}</option>
        } )
       return renderPlayers
    }

    function handleSlot1Change(event) {
        console.log("selected player's id: ", event.target.value)
        const playerObj = players.find( (player) => player.id === event.target.value )
        console.log("Player object: ", playerObj)
    }




    const renderPlayers = players.map( player => <Player key={player.id} player={player}/> )
    
    return (
        <div>
            <h2>Players</h2>
            <select onChange={handleSlot1Change}>
                <option value={"select player"}>select player</option>
                {optionDropdown1()}
            </select>

            {renderPlayers}
            {/* <div>{renderSlot1}</div> */}
            {/* <div>{renderSlot2}</div> */}
        </div>
    )
}

export default Players
