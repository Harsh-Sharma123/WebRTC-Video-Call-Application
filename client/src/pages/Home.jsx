import React, { useEffect, useState } from 'react'
import { useSocket } from '../providers/Socket'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const navigate = useNavigate();

  const { socket } = useSocket();

  const [roomid, setRoomId] = useState();
  const [emailid, setEmailId] = useState();

  const handleRoomJoin = () => {
    socket.emit('join-room', { roomId: roomid, emailId: emailid})
  }

  const handleRoomJoined = ({ roomId }) => {
    console.log(roomId);
    navigate(`/room/${roomId}`)
  }

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);
  }, [socket]);

  return (
    <div className='homepage-container'>
      <div className='input-container'>
        <input type="email" placeholder='Enter your email here' onChange={(e)=>setEmailId(e.target.value)} />
        <input type="text" placeholder="Enter your room code" onChange={(e) => setRoomId(e.target.value)} />
        <button type="submit" onClick={handleRoomJoin}>Enter Room</button>
      </div>
    </div>
  )
}
