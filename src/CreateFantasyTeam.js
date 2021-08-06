import React from 'react'
import {useEffect, useState} from 'react'

function CreateFantasyTeam() {
    
    // const [newTeamInfo, setNewTeamInfo] = useState({teamName: "", ownerName: ""})
    const [newTeamInfo, setNewTeamInfo] = useState({name: "", owner: ""})

    // post an object that looks like this {name: userinputname, owner: userinputowner}
    
    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:9393/fantasy_teams/", {
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
                console.log("RESPONSEDATA: ", responseData)
                setNewTeamInfo("")
            }
        )
        
    }    
    
  

    function handleChange(e) {
        setNewTeamInfo( {...newTeamInfo, [e.target.name]: e.target.value} )
    }
    console.log("NEWTEAMINFO", newTeamInfo)
    
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
