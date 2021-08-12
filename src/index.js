import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App"
import { FantasyTeamsProvider } from "./context/fantasyTeams"
import { PlayersProvider } from "./context/players"

ReactDOM.render(
  
  <React.StrictMode>
    <PlayersProvider>
    <FantasyTeamsProvider>
      <App />
    </FantasyTeamsProvider>
    </PlayersProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
