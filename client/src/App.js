import './App.css';
import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { SocketProvider } from './providers/Socket';
import { Socket } from 'socket.io-client';
import { RoomPage } from './pages/Room';
import { PeerProvider } from './providers/Peer';

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomid" element={<RoomPage />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
