import React, { useState } from 'react';
import Metronome from './Metronome.jsx';

const App = () => {
  const [play, setPlay] = useState(false);

  return (
    <div className='App'>
      <Metronome />
    </div>
  )
}

export default App;