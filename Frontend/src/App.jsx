import React from 'react';

import './App.css';
import { SocketProvider } from './Contects/SocketProvider';
//import Test from './Components/Test';
import GameRouter from './Components/GameRouter';


function App() {


  return (
    <SocketProvider>
      <GameRouter/>
    </SocketProvider>
  );
}

export default App;

