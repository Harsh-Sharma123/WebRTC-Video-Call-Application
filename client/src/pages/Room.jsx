import React, { useEffect } from 'react'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer';

export const RoomPage = () => {

    const { socket } = useSocket();

    const { peer, createOffer } = usePeer();

    const handleNewUserJoined = useCallback( async (data) => {
        const { emailId } = data;
        console.log("New User joined room ", emailId);
        const offer = await createOffer();
        socket.emit("call-user", { emailId, offer });
    }, [createOffer, socket])

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
    }, [socket])

  return (
    <div className=''>

    </div>
  )
}
