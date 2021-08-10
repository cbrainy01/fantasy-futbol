import React from 'react'
import {useEffect, useState, useContext} from 'react'
import Player from './Player'
import {v4 as uuid} from "uuid"
import { FantasyTeamsContext } from "../context/fantasyTeams"

function Players() {
    
    const [players, setPlayers] = useState([])
    const [slot1Player, setSlot1Player] = useState("none selected")
    const [slot2Player, setSlot2Player] = useState("none selected")
    const [fantasyTeams, setFantasyTeams] = useContext(FantasyTeamsContext)
    const [p1Results, setP1Results] = useState("")
    const [p2Results, setP2Results] = useState("")

    useEffect(() => {
      fetch("http://localhost:9393/players/")
      .then(r => r.json())
      .then( responseData => { setPlayers(responseData.players); console.log("PLAYERS: ", responseData.players) }  )
    }, [])

    // should only run if both slot1 and slot2 players are not equal to "none selected". A do while perhaps?
    function compareStats() {
        const player1Results = {}
        const player2Results = {}

        const keys = Object.keys(slot1Player)
        // console.log("keys BEFORE Filter: ", keys)
        const categories = keys.filter( (attribute) => {
            if(attribute != "id" && attribute != "name" && attribute != "image" && attribute != "position" && attribute != "league" && attribute != "status" && attribute != "fantasy_team" ) {return true}
        } )

        // console.log("CATEGORIES: ", categories)
        categories.forEach( (category) => {
            if(slot1Player[category] > slot2Player[category]) {
                player1Results[category] = "win"
                player2Results[category] = "lose"
            }
            else if ( slot1Player[category] < slot2Player[category] ) {
                player1Results[category] = "lose"
                player2Results[category] = "win"
            }
            else {
                player1Results[category] = "tie"
                player2Results[category] = "tie"
            }
        } )
        // setP1Results(player1Results)
        // setP2Results(player2Results)
        console.log("1: ", player1Results,"2: ", player2Results)
        const outputArray = [player1Results, player2Results]
        return outputArray
    }

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
            return <Player key={uuid()} comparisonResults={compareStats()[0]} player={slot1Player} fantasyTeams={fantasyTeams} onTeamAssign={handleTeamAssign}/>
        }
    }
    function renderSlot2() {
        if(slot2Player === "none selected") {
            return <div>No player selected</div>
        }
        else {
            return <Player key={uuid()} comparisonResults={compareStats()[1]} player={slot2Player} fantasyTeams={fantasyTeams} onTeamAssign={handleTeamAssign}/>
        }
    }

    function handleTeamAssign(playerId, teamId) {
        fetch(`http://localhost:9393/players/${playerId}`,
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            // push 
            body: JSON.stringify({"fantasy_team_id": teamId, "status": "signed"})
        })
        .then( (r)=>r.json() )
        .then( (rData) => {
            console.log(rData)
        } )
        console.log(playerId, teamId)
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
            {/* {compareStats()} */}

        </div>
    )
}

export default Players







