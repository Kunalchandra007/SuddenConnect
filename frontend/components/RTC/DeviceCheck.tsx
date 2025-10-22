"use client";

import { useEffect, useRef, useState } from "react";
import Room from "./Room";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconMicrophone,
  IconMicrophoneOff,
  IconVideo,
  IconVideoOff,
  IconRefresh,
  IconUser,
  IconArrowRight,
  IconArrowLeft,
  IconUsers,
  IconBriefcase,
  IconGlobe,
  IconCode,
  IconCheck
} from "@tabler/icons-react";
import Tooltip from "../ui/tooltip";

interface UserPreferences {
  name: string;
  industry: string;
  language: string;
  skillLevel: string;
  interests: string[];
}

const industries = [
  "Technology", "Finance", "Healthcare", "Education", "Marketing", 
  "Sales", "Design", "Engineering", "Consulting", "Real Estate",
  "Legal", "Media", "Non-profit", "Government", "Other"
];

const languages = [
  "English", "Spanish", "French", "German", "Italian", "Portuguese",
  "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
];

const skillLevels = [
  "Student/Entry Level", "Junior (1-3 years)", "Mid-level (3-7 years)", 
  "Senior (7+ years)", "Executive/Leadership", "Entrepreneur"
];

const interestOptions = [
  "Networking", "Mentoring", "Career Advice", "Industry Insights",
  "Collaboration", "Knowledge Sharing", "Professional Development",
  "Startup Discussion", "Investment", "Technology Trends"
];

export default function DeviceCheck() {
  const [step, setStep] = useState(1); // 1: Basic info, 2: Preferences, 3: Device check
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: "",
    industry: "",
    language: "",
    skillLevel: "",
    interests: []
  });
  const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<MediaStreamTrack | null>(null);
  const [joined, setJoined] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const localAudioTrackRef = useRef<MediaStreamTrack | null>(null);
  const localVideoTrackRef = useRef<MediaStreamTrack | null>(null);
  const getCamRef = useRef<() => Promise<void>>(() => Promise.resolve());

  const getCam = async () => {
    try {
      localAudioTrackRef.current?.stop();
      localVideoTrackRef.current?.stop();
      let videoTrack: MediaStreamTrack | null = null;
      let audioTrack: MediaStreamTrack | null = null;
      
      if (videoOn) {
        try {
          const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoTrack = videoStream.getVideoTracks()[0] || null;
        } catch (err) {
          console.warn("Camera access denied or unavailable:", err);
          toast.error("Camera Error", { description: "Could not access camera" });
        }
      }
      
      if (audioOn) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioTrack = audioStream.getAudioTracks()[0] || null;
        } catch (err) {
          console.warn("Microphone access denied or unavailable:", err);
          toast.error("Microphone Error", { description: "Could not access microphone" });
        }
      }
      
      localVideoTrackRef.current = videoTrack;
      localAudioTrackRef.current = audioTrack;
      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack);
      
      if (videoRef.current) {
        videoRef.current.srcObject = videoTrack ? new MediaStream([videoTrack]) : null;
        if (videoTrack) await videoRef.current.play().catch(() => {});
      }
      
      if (!videoOn && !audioOn && videoRef.current) {
        videoRef.current.srcObject = null;
      }

    } catch (e: any) {
      const errorMessage = e?.message || "Could not access camera/microphone";
      toast.error("Device Access Error", {
        description: errorMessage
      });
    }
  };

  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null;
    async function watchCameraPermission() {
      try {
        permissionStatus = await navigator.permissions.query({ name: "camera" as PermissionName });
        permissionStatus.onchange = () => {
          if (permissionStatus?.state === "granted") {
            getCamRef.current();
          }
        };
      } catch (e) {
        console.warn("Permissions API not supported on this browser.");
      }
    }
    watchCameraPermission();
    return () => {
      if (permissionStatus) permissionStatus.onchange = null;
      localAudioTrackRef.current?.stop();
      localVideoTrackRef.current?.stop();
    };
  }, []); 

  useEffect(() => {
    getCam();
  }, [videoOn, audioOn]);

  useEffect(() => {
    getCamRef.current = getCam;
  });

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return preferences.name.trim() !== "";
      case 2:
        return preferences.industry && preferences.language && preferences.skillLevel;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setJoined(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (joined) {
    const handleOnLeave = () => {
      setJoined(false);
      try {
        localAudioTrack?.stop();
      } catch {}
      try {
        localVideoTrack?.stop();
      } catch {}
      setLocalAudioTrack(null);
      setLocalVideoTrack(null);
    };

    return (
      <Room
        name={preferences.name}
        localAudioTrack={localAudioTrack}
        localVideoTrack={localVideoTrack}
        audioOn={audioOn}
        videoOn={videoOn}
        onLeave={handleOnLeave}
        preferences={preferences}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNumber ? 'bg-gradient-to-r from-gray-600 to-gray-800' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-300">
              Step {step} of 3: {
                step === 1 ? 'Basic Information' : 
                step === 2 ? 'Professional Preferences' : 
                'Device Setup'
              }
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Side - Video Preview (only show on step 3) */}
          {step === 3 && (
            <div className="space-y-4 h-full flex flex-col">
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <div className="aspect-video w-full bg-black relative">
                  {videoOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <IconVideo className="h-16 w-16 text-white/70" />
                    </div>
                  )}
                  
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                      <span>{preferences.name || "You"}</span>
                    </div>
                    {!audioOn && (
                      <span className="inline-flex items-center gap-1 rounded bg-red-600/80 px-1.5 py-0.5 text-xs text-white">
                        <IconMicrophoneOff className="h-3 w-3" />
                        <span>muted</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Tooltip content={audioOn ? "Turn off microphone" : "Turn on microphone"} position="bottom">
                  <button
                    onClick={() => setAudioOn((a) => !a)}
                    className={`cursor-pointer h-11 w-11 rounded-full flex items-center justify-center transition ${
                      audioOn ? "bg-white/10 hover:bg-white/20" : "bg-red-600 hover:bg-red-500"
                    }`}
                  >
                    {audioOn ? <IconMicrophone className="h-5 w-5 text-white" /> : <IconMicrophoneOff className="h-5 w-5 text-white" />}
                  </button>
                </Tooltip>

                <Tooltip content={videoOn ? "Turn off camera" : "Turn on camera"} position="bottom">
                  <button
                    onClick={() => setVideoOn((v) => !v)}
                    className={`cursor-pointer h-11 w-11 rounded-full flex items-center justify-center transition ${
                      videoOn ? "bg-white/10 hover:bg-white/20" : "bg-red-600 hover:bg-red-500"
                    }`}
                  >
                    {videoOn ? <IconVideo className="h-5 w-5 text-white" /> : <IconVideoOff className="h-5 w-5 text-white" />}
                  </button>
                </Tooltip>

                <Tooltip content="Refresh devices" position="bottom">
                  <button
                    onClick={getCam}
                    className="cursor-pointer h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  >
                    <IconRefresh className="h-5 w-5 text-white" />
                  </button>
                </Tooltip>
              </div>
            </div>
          )}

          {/* Right Side - Form */}
          <div className="space-y-6">
            <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconUsers className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-2">Welcome to SuddenConnect</h2>
                      <p className="text-gray-300">Let's start with your basic information</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          What should we call you?
                        </label>
                        <input
                          type="text"
                          value={preferences.name}
                          onChange={(e) => setPreferences(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your name"
                          className="w-full h-12 px-4 rounded-xl border border-white/10 bg-neutral-800/50 text-white placeholder-neutral-500 focus:border-white/30 focus:outline-none transition-colors backdrop-blur"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconBriefcase className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-2">Professional Preferences</h2>
                      <p className="text-gray-300">Help us match you with the right professionals</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Industry
                        </label>
                        <select
                          value={preferences.industry}
                          onChange={(e) => setPreferences(prev => ({ ...prev, industry: e.target.value }))}
                          className="w-full h-12 px-4 rounded-xl border border-white/10 bg-neutral-800/50 text-white focus:border-white/30 focus:outline-none transition-colors"
                        >
                          <option value="">Select your industry</option>
                          {industries.map(industry => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Language Preference
                        </label>
                        <select
                          value={preferences.language}
                          onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full h-12 px-4 rounded-xl border border-white/10 bg-neutral-800/50 text-white focus:border-white/30 focus:outline-none transition-colors"
                        >
                          <option value="">Select your preferred language</option>
                          {languages.map(language => (
                            <option key={language} value={language}>{language}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Experience Level
                        </label>
                        <select
                          value={preferences.skillLevel}
                          onChange={(e) => setPreferences(prev => ({ ...prev, skillLevel: e.target.value }))}
                          className="w-full h-12 px-4 rounded-xl border border-white/10 bg-neutral-800/50 text-white focus:border-white/30 focus:outline-none transition-colors"
                        >
                          <option value="">Select your experience level</option>
                          {skillLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          What are you interested in? (Select multiple)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {interestOptions.map(interest => (
                            <button
                              key={interest}
                              onClick={() => handleInterestToggle(interest)}
                              className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                preferences.interests.includes(interest)
                                  ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white'
                                  : 'bg-neutral-800/50 text-gray-300 hover:bg-neutral-700/50'
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconVideo className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white mb-2">Device Setup</h2>
                      <p className="text-gray-300">Test your camera and microphone before joining</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-neutral-800/30 rounded-xl p-4">
                        <h3 className="text-white font-medium mb-2">Your Preferences Summary:</h3>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p><strong>Name:</strong> {preferences.name}</p>
                          <p><strong>Industry:</strong> {preferences.industry}</p>
                          <p><strong>Language:</strong> {preferences.language}</p>
                          <p><strong>Experience:</strong> {preferences.skillLevel}</p>
                          <p><strong>Interests:</strong> {preferences.interests.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl border border-gray-600 text-gray-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <IconArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>{step === 3 ? 'Start Connecting' : 'Next'}</span>
                  <IconArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-neutral-500 text-center mt-4">
                By joining, you agree to our terms of service and privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}