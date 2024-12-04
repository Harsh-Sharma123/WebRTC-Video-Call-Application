import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer';

export const RoomPage = () => {

    const { socket } = useSocket();

    const { peer, createOffer, createAnswer, setRemoteAns } = usePeer();

    const handleNewUserJoined = useCallback( async (data) => {
        const { emailId } = data;
        console.log("New User joined room ", emailId);
        const offer = await createOffer();
        socket.emit("call-user", { emailId, offer });
    }, [createOffer, socket])

    const handleIncomingCall = useCallback( async (data) => {
        const { fromEmail, offer } = data; 
        const ans = await createAnswer(offer);
        console.log("Incoming Call from ", fromEmail);
        socket.emit("call-accepted", { from: fromEmail, ans: ans});
    }, [createAnswer, socket])

    const handleCallAccepted = useCallback( async (data) => {
        const { ans } = data;
        console.log("call got accepted !!");
        await setRemoteAns(ans);
    }, [setRemoteAns])

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
        socket.on("incoming-call", handleIncomingCall);
        socket.on("call-accepted", handleCallAccepted);

        return () => {
            socket.off('user-joined', handleNewUserJoined)
            socket.off('incoming-call', handleIncomingCall)
            socket.off("call-accepted", handleCallAccepted)
        }
    }, [socket])

  return (
    <div className=''>

    </div>
  )
}
