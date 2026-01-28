import React, { useState, useEffect, useRef } from 'react';

  const [mode, setMode] = useState('countdown'); // 'countdown' or 'record'
  // Countdown mode states
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(1);
  // Record mode states
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const videoRef = useRef(null);

  // Countdown timer effect
  useEffect(() => {
    if (mode !== 'countdown') return;
    let timer = null;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
          } else {
            setMinutes(m => m - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(s => s - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds, mode]);

  // Record mode: handle video recording
  useEffect(() => {
    if (mode !== 'record') return;
    if (isRecording) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          setMediaStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          const recorder = new window.MediaRecorder(stream);
          setMediaRecorder(recorder);
          setRecordedChunks([]);
... (truncated for brevity)