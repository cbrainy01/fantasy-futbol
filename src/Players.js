import React from 'react'
import {useEffect, useState} from 'react'
import Player from './Player'
import {v4 as uuid} from "uuid"


function Players() {
    
    const [players, setPlayers] = useState([])
    const [slot1Player, setSlot1Player] = useState("none selected")
    const [slot2Player, setSlot2Player] = useState("none selected")
  
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
    function optionDropdown2() {

        const renderPlayers = players.map( (player)=>{
            return <option key={uuid()} value={player.id}>{player.name}</option>
        } )
       return renderPlayers
    }

    function handleSlot1Change(event) {

        const playerObj = players.find( (player) => player.id == event.target.value )
        setSlot1Player(playerObj)

        console.log("Player object: ", playerObj)
        console.log("selected player's id: ", event.target.value)
    }
    function handleSlot2Change(event) {

        const playerObj = players.find( (player) => player.id == event.target.value )
        setSlot2Player(playerObj)
        
        console.log("Player object: ", playerObj)
        console.log("selected player's id: ", event.target.value)
    }

    function renderSlot1() {
        if(slot1Player === "none selected") {
            return <div>No Player Selected</div>
        }
        else {
            return <Player key={uuid()} player={slot1Player}/>
        }
    }
    function renderSlot2() {
        if(slot2Player === "none selected") {
            return <div>No player selected</div>
        }
        else {
            return <Player key={uuid()} player={slot2Player}/>
        }
    }




    // const renderPlayers = players.map( player => <Player key={player.id} player={player}/> )
    
    return (
        <div>
            
            <h2>Players</h2>

            <h3>Slot 1</h3>
            <select onChange={handleSlot1Change}>
                <option value={"none selected"}>select player</option>
                {optionDropdown1()}
            </select>
            <div>{renderSlot1()}</div>

            <h3>Slot 2</h3>
            <select onChange={handleSlot2Change}>
                <option value={"none selected"}>select player</option>
                {optionDropdown2()}
            </select>
            <div>{renderSlot2()}</div>

        </div>
    )
}

export default Players
