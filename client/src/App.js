import './App.css';
import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { SocketProvider } from './providers/Socket';
import { Socket } from 'socket.io-client';

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/world" element={<h1>World !!</h1>} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
