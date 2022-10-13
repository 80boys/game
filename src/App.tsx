import React from 'react';
import { useState } from 'react';
import './App.css';
import Bj from './components/Bj';

function App() {
  const [state, setState] = useState(false)
  return (<>
    <Bj state={state} width={600} height={400} step={2} />
  </>)
}

export default App;
