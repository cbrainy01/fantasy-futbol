import React from 'react'
import {useEffect, useState, useContext} from 'react'
import CreateFantasyTeam from './CreateFantasyTeam'
import FantasyTeam from './FantasyTeam'
import {v4 as uuid} from "uuid"
import { FantasyTeamsContext } from "../context/fantasyTeams"
import { PlayersContext } from "../context/players"
import RosterPlayer from './RosterPlayer'

function FantasyTeams() {
    
    // const [fantasyTeams, setFantasyTeams] = useState([])
    const [selectedTeam, setSelectedTeam] = useState("none selected")
    const [fantasyTeams, setFantasyTeams] = useContext(FantasyTeamsContext)
    const [players, setPlayers] = useContext(PlayersContext)

    useEffect(() => {
        fetch("http://localhost:9393/fantasy_teams/")
      .then(r => r.json())
      .then( responseData => { setFantasyTeams(responseData.teams); console.log("INITIAL FETCH: ", responseData.teams) }  )
    }, [])
    
    function handleTeamCreate(newTeam) {
        setFantasyTeams([...fantasyTeams, newTeam])
    }
    console.log("ALL TEAMS: ", fantasyTeams)
    
    function optionDropdown() {
        return fantasyTeams.map( (team) => {
            return <option key={uuid()} value={team.id}>{team.name}</option>
        } )
    }

    function handleTeamSelect(e) {
        setSelectedTeam(e.target.value)
    }
    console.log("SELECTED TEAM: ", selectedTeam)

    function handleRelease(playerId, teamId) {
        fetch(`http://localhost:9393/players/${playerId}`,
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"fantasy_team_id": "nil" })
        } )
        .then( (r)=>r.json() )
        .then( (rData) => {
            // adjust players accordingly. go to that particular player and change their status from signed to free agent, set thier team to null
            const indexOfPlayerToPatch = players.findIndex( (player) => player.id === playerId )
            const beforePatchedPlayer = players.slice(0, indexOfPlayerToPatch)
            const afterPatchedPlayer = players.slice(indexOfPlayerToPatch)
            const patchedPlayer = players.find( (player) => player.id === playerId )
            //adjust players attributes
            patchedPlayer.fantasy_team = null
            patchedPlayer.status = "Free agent"

            // set fantasyTeams accordingly. go to the teams n remove that player from the roster.
            const updatedTeams = fantasyTeams.map( (team) => {
                team.roster = team.roster.filter( (player) => player.id !== playerId )
                team.roster_count = team.roster.length
                return team
            } )
            // const updatedTeams = fantasyTeams.map( (team) => {
            //     team.roster.map( (player) => {
            //         if(player.id === playerId) {
            //          return null;   
            //         } else {return player}
            //     })
            //     return team
            // } )
            // const updatedTeams = fantasyTeams.map( (team) => {
            //     team.roster.map( (team)=> )
            //     if(team.roster)) {

            //     }
            //     else {return team}
            // }  )
                debugger
            setFantasyTeams(updatedTeams)
            // const indexOfTeamToPatch = fantasyTeams.findIndex( team => team.id === teamId )
            // const beforePatchedTeam = fantasyTeams.slice(0, indexOfTeamToPatch)
            // const afterPatchedTeam = fantasyTeams.slice(indexOfTeamToPatch + 1)
            
            // const patchedTeam = fantasyTeams.find( (team) => team.id === teamId )
            // debugger
            // // remove player from roster of team
            // const rosterWithoutPlayer = patchedTeam.roster.filter( (player) => player.id !== playerId )
            // patchedTeam.roster = rosterWithoutPlayer
            // setFantasyTeams([...beforePatchedTeam, patchedTeam, ...afterPatchedTeam])
            console.log(rData)
        } )
    }


    function renderSelectedTeam() {
        if(selectedTeam == "none selected") {
            return <p>no team selected</p>
        }
        else {
        const teamObj = fantasyTeams.find( (team) => team.id == selectedTeam )
            return <FantasyTeam onTeamDelete={handleTeamDelete} onRelease={handleRelease} team={teamObj}/>
        }
    }

    function handleTeamDelete(deleteId) {
        fetch( `http://localhost:9393/fantasy_teams/${deleteId}`, {method: "DELETE"} )
       
            const newTeams = fantasyTeams.filter( team => team.id != deleteId )
            setFantasyTeams(newTeams)
            setSelectedTeam("none selected")
        // debugger
      //with players variable, go find all players that were part of that team and set their fantasy team to null and status to free agent 
        //   const playersToChange = players.filter( (player) => player.fantasy_team.id === deleteId )
        const updatedPlayers = players.map( (player) => {
            if(player.fantasy_team && player.fantasy_team.id === deleteId) {
                debugger
                player.fantasy_team = null
                player.status = "Free Agent"
                return player
            }
            else {
                return player
            }
        })  
        // debugger
        setPlayers(updatedPlayers)
    }


    // const renderTeams = fantasyTeams.map( team => <FantasyTeam key={uuid()} team={team}/> )

    return (
        <div className={"fantasy-teams"}> 
              <CreateFantasyTeam onTeamCreate={handleTeamCreate}/> 
              <h2> View Fantasy Teams</h2> 
              <select  onChange={handleTeamSelect} value={selectedTeam}>
                  <option value="none selected">select team</option>
                  {optionDropdown()}
              </select>
              {renderSelectedTeam()}
              {/* {renderTeams} */}
        </div>
    )
}

export default FantasyTeams

