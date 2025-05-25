'use client';

import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export type RemoteStream = {
  userId: string;
  userName: string;
  stream: MediaStream;
  trackId: string;
  isScreen: boolean;
};

export function useVideoChat(
  roomId: string,
  userName: string,
  videoDeviceId?: string,
  audioDeviceId?: string
) {
  const socketRef = useRef<Socket>();
  const pcsRef = useRef(new Map<string, RTCPeerConnection>());

  const cameraVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);

  const cameraStreamRef = useRef<MediaStream>();
  const screenStreamRef = useRef<MediaStream>();

  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  useEffect(() => {
    const socket = io(process.env.VIDEO_CONSULTATION_URL);
    socketRef.current = socket;

    navigator.mediaDevices
      .getUserMedia({
        video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : true,
        audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
      })
      .then(stream => {
        cameraStreamRef.current = stream;
        if (cameraVideoRef.current) {
          cameraVideoRef.current.srcObject = stream;
        }

        socket.emit('join', { room: roomId, name: userName });
        socket.on('allUsers', (users: any[]) =>
          users.forEach(u => setupPeer(u.id, u.name, true, stream))
        );
        socket.on('userJoined', (u: any) => setupPeer(u.id, u.name, false, stream));
        socket.on('userLeft', ({ id }: any) => {
          setRemoteStreams(rs => rs.filter(r => r.userId !== id));
          pcsRef.current.get(id)?.close();
          pcsRef.current.delete(id);
        });
        socket.on('stopScreen', ({ id: stoppedId }: any) => {
          setRemoteStreams(rs => rs.filter(r => !(r.userId === stoppedId && r.isScreen)));
        });
        socket.on('offer', handleOffer);
        socket.on('answer', ({ from, sdp }: any) => {
          pcsRef.current.get(from)?.setRemoteDescription(new RTCSessionDescription(sdp));
        });
        socket.on('ice-candidate', ({ from, candidate }: any) => {
          pcsRef.current.get(from)?.addIceCandidate(new RTCIceCandidate(candidate));
        });
      })
      .catch(console.error);

    return () => {
      socket.disconnect();
      pcsRef.current.forEach(pc => pc.close());
    };
  }, [roomId, userName, videoDeviceId, audioDeviceId]);

  useEffect(() => {
    if (sharingScreen && screenStreamRef.current && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStreamRef.current;
    }
  }, [sharingScreen]);

  function setupPeer(id: string, name: string, isInitiator: boolean, stream: MediaStream) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    pcsRef.current.set(id, pc);

    stream.getTracks().forEach(t => pc.addTrack(t, stream));

    pc.ontrack = e => {
      if (e.track.kind !== 'video') return;
      const incoming = e.streams[0];
      const isScreen = e.track.label.toLowerCase().includes('screen');
      setRemoteStreams(prev => [
        ...prev.filter(r => r.trackId !== e.track.id),
        {
          userId: id,
          userName: name,
          stream: incoming,
          trackId: e.track.id,
          isScreen,
        },
      ]);
    };

    pc.onicecandidate = e => {
      if (e.candidate) {
        socketRef.current!.emit('ice-candidate', {
          to: id,
          candidate: e.candidate,
        });
      }
    };

    if (isInitiator) {
      pc.onnegotiationneeded = async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socketRef.current!.emit('offer', {
          to: id,
          sdp: offer,
          fromName: userName,
        });
      };
    }
  }

  async function handleOffer({ from, fromName, sdp }: any) {
    const stream = cameraStreamRef.current!;
    if (!pcsRef.current.has(from)) {
      setupPeer(from, fromName, false, stream);
    }
    const pc = pcsRef.current.get(from)!;
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socketRef.current!.emit('answer', {
      to: from,
      sdp: answer,
      fromName: userName,
    });
  }

  const toggleAudio = () => {
    cameraStreamRef.current?.getAudioTracks().forEach(t => {
      t.enabled = !t.enabled;
      setAudioEnabled(t.enabled);
    });
  };

  const toggleVideo = () => {
    cameraStreamRef.current?.getVideoTracks().forEach(t => {
      t.enabled = !t.enabled;
      setVideoEnabled(t.enabled);
    });
  };

  const toggleScreenShare = async () => {
    const socket = socketRef.current!;
    const myId = socket.id;

    if (!sharingScreen) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = screenStream;

      const screenTrack = screenStream.getVideoTracks()[0];
      for (const [id, pc] of pcsRef.current) {
        pc.addTrack(screenTrack, screenStream);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', { to: id, sdp: offer, fromName: userName });
      }

      screenTrack.onended = async () => {
        for (const [id, pc] of pcsRef.current) {
          const sender = pc.getSenders().find(s => s.track === screenTrack);
          if (sender) {
            pc.removeTrack(sender);
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit('offer', { to: id, sdp: offer, fromName: userName });
          }
        }
        socket.emit('stopScreen', { id: myId });
        setSharingScreen(false);
      };

      setSharingScreen(true);
    } else {
      screenStreamRef.current?.getTracks().forEach(t => t.stop());
      setSharingScreen(false);
    }
  };

  const leaveRoom = () => {
    socketRef.current?.disconnect();
    pcsRef.current.forEach(pc => pc.close());
    pcsRef.current.clear();
    setRemoteStreams([]);
  };

  return {
    cameraVideoRef,
    screenVideoRef,
    remoteStreams,
    sharingScreen,
    audioEnabled,
    videoEnabled,
    toggleAudio,
    toggleVideo,
    toggleScreenShare,
    leaveRoom,
  };
}
