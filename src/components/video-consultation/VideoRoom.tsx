'use client';

import { useEffect, useState, useRef } from 'react';
import VideoChat from './VideoChat';

import { Camera, Mic, MicOff, Video, VideoOff, Settings, User, Scale, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Avatar, AvatarFallback } from '../ui/Avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useSession } from 'next-auth/react';
import { VideoConsultation } from '@/api/types/video-consultation';

interface VideoRoomProps {
  roomId: string;
  consultation: VideoConsultation;
}

export default function VideoRoom({ roomId, consultation }: VideoRoomProps) {
  const [step, setStep] = useState<'select' | 'chat'>('select');
  const { data: session } = useSession();
  const [name, setName] = useState(session?.email || '');
  const [cams, setCams] = useState<MediaDeviceInfo[]>([]);
  const [mics, setMics] = useState<MediaDeviceInfo[]>([]);
  const [camId, setCamId] = useState<string>('');
  const [micId, setMicId] = useState<string>('');
  const [isCamEnabled, setIsCamEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isLawyer = session?.role === 'lawyer';

  useEffect(() => {
    const isLawyer = session?.role === 'lawyer';
    if (isLawyer) {
      setName(consultation.lawyer.lawyerProfile?.firstName || '');
      return;
    }
    if (session?.email && !isLawyer) {
      setName(session.email);
    }
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        return navigator.mediaDevices.enumerateDevices();
      })
      .then(devices => {
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        const audioDevices = devices.filter(d => d.kind === 'audioinput');
        setCams(videoDevices);
        setMics(audioDevices);
        if (videoDevices.length) setCamId(videoDevices[0].deviceId);
        if (audioDevices.length) setMicId(audioDevices[0].deviceId);
      })
      .catch(err => console.error('Error accessing media devices:', err));
  }, []);

  const canJoin = name.trim() && camId && micId;

  const toggleCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isCamEnabled;
      });
      setIsCamEnabled(!isCamEnabled);
    }
  };

  const toggleMic = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMicEnabled;
      });
      setIsMicEnabled(!isMicEnabled);
    }
  };

  if (step === 'select') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Legal Consultation</CardTitle>
                <CardDescription>Join your video consultation with a legal expert</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Video Preview */}
              <div className="space-y-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {!isCamEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <Avatar className="h-24 w-24">
                        <AvatarFallback className="text-4xl">
                          {name.charAt(0).toUpperCase() || 'G'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <Button
                      variant={isCamEnabled ? 'secondary' : 'destructive'}
                      size="icon"
                      className="rounded-full h-10 w-10"
                      onClick={toggleCamera}
                    >
                      {isCamEnabled ? (
                        <Video className="h-5 w-5" />
                      ) : (
                        <VideoOff className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      variant={isMicEnabled ? 'secondary' : 'destructive'}
                      size="icon"
                      className="rounded-full h-10 w-10"
                      onClick={toggleMic}
                    >
                      {isMicEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select value={camId} onValueChange={setCamId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select camera" />
                    </SelectTrigger>
                    <SelectContent>
                      {cams.map(cam => (
                        <SelectItem key={cam.deviceId} value={cam.deviceId}>
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            <span>{cam.label || 'Camera ' + (cams.indexOf(cam) + 1)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={micId} onValueChange={setMicId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select microphone" />
                    </SelectTrigger>
                    <SelectContent>
                      {mics.map(mic => (
                        <SelectItem key={mic.deviceId} value={mic.deviceId}>
                          <div className="flex items-center gap-2">
                            <Mic className="h-4 w-4" />
                            <span>{mic.label || 'Microphone ' + (mics.indexOf(mic) + 1)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Join Form */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    {isLawyer ? 'User Information' : 'Lawyer Information'}
                  </h2>
                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {isLawyer
                          ? consultation.user.email
                          : `${consultation.lawyer.lawyerProfile?.firstName} ${consultation.lawyer.lawyerProfile?.lastName}`}
                      </h3>
                      {!isLawyer && (
                        <p className="text-sm text-muted-foreground">
                          {consultation.lawyer.lawyerProfile?.specialization}
                        </p>
                      )}
                      {isLawyer && (
                        <div className="flex items-center gap-1 mt-1">
                          User notes:{consultation.notes ? consultation.notes : 'No notes'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!isLawyer && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!canJoin}
                  onClick={() => setStep('chat')}
                >
                  Join Consultation
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By joining, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <VideoChat roomId={roomId} userName={name} videoDeviceId={camId} audioDeviceId={micId} />;
}
