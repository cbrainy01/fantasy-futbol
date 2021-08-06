import React from 'react'
import {useEffect, useState} from 'react'

function CreateFantasyTeam() {
    
    const [newTeamInfo, setNewTeamInfo] = useState({})
    // post an object that looks like this {name: userinputname, owner: userinputowner}
    
    function handleSubmit(e) {

    }    

    function handleChange(e) {

    }
    
    
    return (
        <div>
             <h2>Fantasy Team Creation</h2>
            <form >
                <label>Enter team name: </label>
                <input type="text"/> <br/>
                <label>Enter owner name: </label> 
                <input type="text"/> 

            </form>  
        </div>
    )
}

export default CreateFantasyTeam
