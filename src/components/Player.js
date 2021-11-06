import React from 'react'
import {useState} from 'react'
import {v4 as uuid} from "uuid"
import "../styling/player.css"

function Player({comparisonResults, player, fantasyTeams, onTeamAssign}) {

    const [selectedTeamId, setSelectedTeamId] = useState("none selected")
    

    function goalComparison() {
        if(comparisonResults.goals === "win") {return "limegreen"}
        else if(comparisonResults.goals == "lose") {return "red"}
        else {return "black"}
    }
    function assistComparison() {
        if(comparisonResults.assists === "win") {return "limegreen"}
        else if(comparisonResults.assists == "lose") {return "red"}
        else {return "black"}
    }
    function involvementComparison() {
        if(comparisonResults.goal_involvements === "win") {return "limegreen"}
        else if(comparisonResults.goal_involvements === "lose") {return "red"}
        else {return "black"}
    }
    function saveComparison() {
        if(comparisonResults.saves === "win") {return "limegreen"}
        else if(comparisonResults.saves === "lose") {return "red"}
        else {return "black"}
    }

    function optionDropdown() {
        return fantasyTeams.map( (team) => {
            return <option key={uuid()} value={team.id}>{team.name}</option>
        } )
    }

    function handleChange(e) {
        setSelectedTeamId(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const team = fantasyTeams.find( (team) => team.id === selectedTeamId )
        if(selectedTeamId === "none selected") {
            alert("Please select a team")
        }
        else if(player.fantasy_team != null ) {
            alert("Player is already part of a team")
        }
        else if( team.roster_count > 10 ) {
            alert("Roster is full")
        }
        
        else {
            // send id up for patch to be made
                onTeamAssign(player.id, selectedTeamId)
        }

        // send id of selected up to make patch request. BuT fIrsT
        // Find out of player status is "signed" or fantasy_team isnt nil
        // then block that submit request with an alert
    }
    // console.log("SELECTED TEAM Id IS: ", selectedTeamId)
    // console.log("COMPARISONRESULTS IS: ", comparisonResults)
    const style2 = {fontWeight: "900"}
    const style3 = {fontSize: "1.25em"}
    return (
        <div className={"player"}>
            <h3>{player.name}</h3>
            {/* hard code image size */}
            <img src={player.image} alt={`${player.name}`} width={"200"} height={"350"}/>
            <p>position: {player.position}</p>
            <p>Fantasy team: {player.fantasy_team == null? "no team": `${player.fantasy_team.name}` }</p>
            <p>Goals: </p><p style={{color: `${goalComparison()}`, ...style2, ...style3 }}>{player.goals}</p>
            <p>Assists: </p><p style={{color: `${assistComparison()}`, ...style2, style3}}>{player.assists}</p>
            <p>Goal Involvements: </p><p style={{color: `${involvementComparison()}`, ...style2, ...style3}}>{player.goal_involvements}</p>
            <p>Saves: </p><p style={{color: `${saveComparison()}`, ...style2, ...style3}}>{player.saves}</p>
            <select onChange={handleChange} value={selectedTeamId}>
                    <option value="none selected">select team</option>
                    {optionDropdown()}
            </select>
            <form onSubmit={handleSubmit}>
                
                <button>add to team</button>
            </form>
            
        </div>
    )
}

export default Player
