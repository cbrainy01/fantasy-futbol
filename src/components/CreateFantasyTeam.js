import React from 'react'
import { useState } from 'react'

function CreateFantasyTeam({onTeamCreate}) {
    
    const [newTeamInfo, setNewTeamInfo] = useState({name: "", owner: ""})

    // post an object that looks like this {name: userinputname, owner: userinputowner}
    
    function handleSubmit(e) {
        e.preventDefault();

        if(newTeamInfo.name.length === 0 || newTeamInfo.owner.length === 0) {
            alert("please fill out both fields")
        }

        else {
        fetch("https://fantasy-futbol-backend.herokuapp.com/fantasy_teams/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(newTeamInfo)
        })
        .then(r => r.json())
        .then(
            responseData => {
                console.log("RESPONSEDATA: ", responseData, 
                responseData.fantasy_team.name, 
                responseData.fantasy_team.owner)
                // pass in new team object
                const newTeam = {
                    id: responseData.fantasy_team.id, 
                    name: responseData.fantasy_team.name,
                    owner: responseData.fantasy_team.owner,
                    roster_count: 0,
                    roster: []
                }
                onTeamCreate(newTeam)
            }
        )
        }
    }    
    
  

    function handleChange(e) {
        setNewTeamInfo( {...newTeamInfo, [e.target.name]: e.target.value} )
        
    }
    
    return (
        <div>
             <h2>Fantasy Team Creation</h2>
            <form onSubmit={handleSubmit}>
                    <label>Enter team name: </label>
                    <input onChange={handleChange} name="name" type="text" value={newTeamInfo.teamName}/> <br/>
                    <label>Enter owner name: </label> 
                    <input onChange={handleChange} name="owner" type="text" value={newTeamInfo.ownerName}/> 
                    <button>Create team</button>
            </form>  
        </div>
    )
}

export default CreateFantasyTeam
