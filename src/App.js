
//import './App.css';
import Password from './Password/Password';
// import './Password.css'
import './Click/click.css'
// import './sudukosol/suduko.css'
import Click from './Click/Click';
import React from 'react';
import Suduko from './sudukosol/Suduko';
import Grid from "./game/Grid";
import "./game/Grid.css";

function App() {
  return (
    <div className="App">
      {/* <Password/> */}
      {/* <Click /> */}
      {/* <Suduko /> */}
      <Grid/>
    </div>
  );
}

export default App;
