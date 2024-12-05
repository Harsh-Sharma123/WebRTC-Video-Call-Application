import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer';
import ReactPlayer from 'react-player';

export const RoomPage = () => {

    const { socket } = useSocket();

    const [mystream, setStream] = useState(null);
    const [remoteEmail, setRemoteEmail] = useState('');

    const { peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();

    const handleNewUserJoined = useCallback( async (data) => {
        const { emailId } = data;
        console.log("New User joined room ", emailId);
        const offer = await createOffer();
        socket.emit("call-user", { emailId, offer });
        setRemoteEmail(emailId);
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

    const getUserMediaStream = useCallback( async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        // sendStream(mystream);
        setStream(stream);
    })

    const handleNegotiation = useCallback(async () => {
        console.log("Negotiation Needed !!");
        const localOffer = await peer.createOffer();
        socket.emit("call-user", { emailId: remoteEmail, offer: localOffer})
    }, [])

    useEffect(()=>{
        peer.addEventListener("negotiationneeded", handleNegotiation);
        return ()=>{
            peer.removeEventListener("negotiationneeded", handleNegotiation);
        }
    })

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream])

  return (
    <div className='room-page-container'>
        <h1>Room</h1>
        <button onClick={(e)=>sendStream(mystream)}>Send My Stream</button>
        <ReactPlayer url={mystream} playing />
        <ReactPlayer url={remoteStream} playing />
    </div>
  )
}
