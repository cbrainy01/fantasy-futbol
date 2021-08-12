import React from 'react'
import {useEffect, useState, useContext} from 'react'
import Player from './Player'
import {v4 as uuid} from "uuid"
import { FantasyTeamsContext } from "../context/fantasyTeams"
import { PlayersContext } from "../context/players"
import "../styling/players.css"

function Players() {
    
    const [players, setPlayers] = useContext(PlayersContext)
    const [slot1Player, setSlot1Player] = useState("none selected")
    const [slot2Player, setSlot2Player] = useState("none selected")
    const [fantasyTeams, setFantasyTeams] = useContext(FantasyTeamsContext)    

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
    console.log("SLot1 Player: ", slot1Player)

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
            const selectPlayer = players.find( (player) => player.id === slot1Player.id )
            return <Player key={uuid()} comparisonResults={compareStats()[0]} player={selectPlayer} fantasyTeams={fantasyTeams} onTeamAssign={handleTeamAssign}/>
        }
    }
    function renderSlot2() {
        if(slot2Player === "none selected") {
            return <div>No player selected</div>
        }
        else {
            const selectPlayer = players.find( (player) => player.id === slot2Player.id )
            return <Player key={uuid()} comparisonResults={compareStats()[1]} player={selectPlayer} fantasyTeams={fantasyTeams} onTeamAssign={handleTeamAssign}/>
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
            const respIndex = players.findIndex( player => player.id === rData.player.id )
            const beforePlayerArray = players.slice(0, respIndex)
            const afterPlayerArray = players.slice(respIndex + 1)
            setPlayers([...beforePlayerArray, rData.player, ...afterPlayerArray])

            // change fantasyTeams so they would include teams with that player added to teams roster
            // const rIndexTeam = fantasyTeams.findIndex( team => team.id === rData.player.fantasy_team.id)
            // change fantasyTeams so they would include teams with that player added to teams roster
            // const teamToPatch = fantasyTeams.find( (team) => team.id === teamId )
            // const beforeTeamArray = fantasyTeams.slice(0, rIndexTeam)
            // const afterTeamArray = fantasyTeams.slice(rIndexTeam + 1)
            const parsedId = parseInt(teamId, 10)
            const teamToPatch = fantasyTeams.find( (team) => team.id === parsedId )
            const indexOfPatch = fantasyTeams.findIndex( (team) => team.id === teamToPatch.id)
            // debugger
            const before = fantasyTeams.slice(0, indexOfPatch)
            const after = fantasyTeams.slice(indexOfPatch + 1)
            teamToPatch.roster.push(rData.player)
            // const updatedRoster = teamToPatch.roster.concat(rData.player)
            const test = [...before, teamToPatch, ...after]
            debugger
            setFantasyTeams([...before, teamToPatch, ...after])
            // debugger
            // setFantasyTeams([...beforeTeamArray, { ...fantasyTeams[rIndexTeam], roster: [...fantasyTeams[rIndexTeam].roster, rData.player] }, ...afterTeamArray])
            
        } )
    console.log("fantasy teams: ", fantasyTeams)

    }
    console.log("fantasy teams: ", fantasyTeams)
    console.log("PLAYERS after patch: ", players)

    // const renderPlayers = players.map( player => <Player key={player.id} player={player}/> )
    
    return (
        <div>
            
            <h2>Players</h2>
           <div className={"player-comps"}>
               <div>
                    <h3>Slot 1</h3>
                    <select onChange={handleSlot1Change}>
                        <option value={"none selected"}>select player</option>
                        {optionDropdown1()}
                    </select>
                    {renderSlot1()}
                </div>
                
                <div>
                    <h3>Slot 2</h3>
                    <select onChange={handleSlot2Change}>
                    <option value={"none selected"}>select player</option>
                    {optionDropdown2()}
                    </select>
                    {renderSlot2()}
                </div>
          </div>
        </div>
    )
}

export default Players








