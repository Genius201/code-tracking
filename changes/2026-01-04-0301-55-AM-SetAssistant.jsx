import React, { useState, useRef } from 'react';
import './SetAssistant.css';

function SetAssistant() {
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // default 3 min
  const [preset, setPreset] = useState(180);
  const [flashColor, setFlashColor] = useState('');
  const timerRef = useRef(null);

  // Recording state
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  // Timer logic
  React.useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      setTimerActive(false);
      setFlashColor('red');
      return;
    }
    if (timeLeft === 30) setFlashColor('yellow');
    if (timeLeft === 5) setFlashColor('red');
    timerRef.current = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft === 31 || timeLeft === 6) setFlashColor('');
    }, 1000);
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(preset);
    setTimerActive(true);
    setFlashColor('');
  };
  const stopTimer = () => {
    setTimerActive(false);
    setFlashColor('');
  };
  const handlePresetChange = (e) => {
    setPreset(Number(e.target.value));
    setTimeLeft(Number(e.target.value));
  };

  // Recording logic
  const startRecording = async () => {
    if (!navigator.mediaDevices) return alert('Recording not supported');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
... (truncated for brevity)