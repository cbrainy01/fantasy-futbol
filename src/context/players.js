import { createContext, useState } from "react";

const PlayersContext = createContext();

function PlayersProvider( {children} ) {

    const [players, setPlayers] = useState([])
    const value = [players, setPlayers]
    // console.log("Players in context: ", players)
    return(
        <PlayersContext.Provider value={value}>
            {children}
        </PlayersContext.Provider>
    )
}

export { PlayersProvider, PlayersContext };