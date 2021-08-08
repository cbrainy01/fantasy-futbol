import { createContext, useState } from "react";

const FantasyTeamsContext = createContext();

function FantasyTeamsProvider( {children} ) {

    const [fantasyTeams, setFantasyTeams] = useState([])
    const value = [fantasyTeams, setFantasyTeams]
    console.log("Fantasy teams in context: ", fantasyTeams)
    return(
        <FantasyTeamsContext.Provider value={value}>
            {children}
        </FantasyTeamsContext.Provider>
    )
}

export { FantasyTeamsProvider, FantasyTeamsContext };