'use client';

import { useVideoChat, RemoteStream } from '@/hooks/useVideoChat';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { Button } from '../ui/Button';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShareOff,
  ScreenShare,
  PhoneOff,
  Maximize2,
  MoreVertical,
  Settings,
} from 'lucide-react';

interface VideoChatProps {
  roomId: string;
  userName: string;
  videoDeviceId?: string;
  audioDeviceId?: string;
}

export default function VideoChat({
  roomId,
  userName,
  videoDeviceId,
  audioDeviceId,
}: VideoChatProps) {
  console.log(roomId);
  const {
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
  } = useVideoChat(roomId, userName, videoDeviceId, audioDeviceId);

  const screenStreams = remoteStreams.filter(r => r.isScreen);
  const sharerIds = new Set(screenStreams.map(r => r.userId));
  const videoStreams = remoteStreams.filter(r => !r.isScreen && !sharerIds.has(r.userId));
  const countNoScreen = 1 + videoStreams.length;
  const gridCols = sharingScreen ? '3fr 1fr' : `repeat(${countNoScreen}, 1fr)`;

  return (
    <div className="h-screen bg-background flex flex-col">
      <div
        className="flex-1 grid gap-4 p-4"
        style={{
          gridTemplateColumns: gridCols,
          gridAutoRows: '1fr',
        }}
      >
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={cameraVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {sharingScreen ? (
          <div className="grid grid-rows-2 gap-4">
            {screenStreams.map(r => (
              <div key={r.trackId} className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={el => el && (el.srcObject = r.stream)}
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded-full text-xs">
                  {r.userName} (Screen)
                </div>
              </div>
            ))}

            {videoStreams.map(r => (
              <div key={r.trackId} className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={el => el && (el.srcObject = r.stream)}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded-full text-xs">
                  {r.userName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {videoStreams.map(r => (
              <div key={r.trackId} className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={el => el && (el.srcObject = r.stream)}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 text-white bg-black/50 px-2 py-1 rounded-full text-xs">
                  {r.userName}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="h-20 border-t bg-muted/30 backdrop-blur-sm flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Button
            variant={audioEnabled ? 'secondary' : 'destructive'}
            size="icon"
            onClick={toggleAudio}
            className="h-12 w-12 rounded-full"
          >
            {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={videoEnabled ? 'secondary' : 'destructive'}
            size="icon"
            onClick={toggleVideo}
            className="h-12 w-12 rounded-full"
          >
            {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={sharingScreen ? 'destructive' : 'secondary'}
            size="icon"
            onClick={toggleScreenShare}
            className="h-12 w-12 rounded-full"
          >
            {sharingScreen ? (
              <ScreenShareOff className="h-5 w-5" />
            ) : (
              <ScreenShare className="h-5 w-5" />
            )}
          </Button>
        </div>

        <Button
          variant="destructive"
          size="icon"
          onClick={leaveRoom}
          className="h-12 w-12 rounded-full"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
            <Maximize2 className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Audio Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Video Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
