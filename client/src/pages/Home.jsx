import React from 'react'
import { useSocket } from '../providers/Socket'

export const Home = () => {

  const { socket }= useSocket();
  socket.emit('join-room', {roomId: "1", emailId: "hs"})

  return (
    <div className='homepage-container'>
      <div className='input-container'>
        <input type="email" placeholder='Enter your email here' />
        <input type="text" placeholder="Enter your room code" />
        <button type="submit">Enter Room</button>
      </div>
    </div>
  )
}
