import React from 'react'
import { useReactMediaRecorder } from "react-media-recorder";

function Livepeer({setTest}) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
  useReactMediaRecorder({ screen: true });
  console.log(mediaBlobUrl)
  setTest(mediaBlobUrl)

  return (
    <>
    <p>{status}</p>
    <button onClick={startRecording}>Start Recording</button>
    <button onClick={stopRecording}>Stop Recording</button>
    <video src={mediaBlobUrl} controls autoPlay loop />
    </>
  )
}

export default Livepeer

