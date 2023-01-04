
import React from 'react'
import Livepeer from "livepeer-nodejs";
import { useEffect, useRef, useState } from "react";
import { Client } from "@livepeer/webrtmp-sdk";
// import { useNavigate } from "react-router-dom";
// import StartStream from './StartStream';
import { useReactMediaRecorder } from "react-media-recorder";



const App = () => {
  const videoEl = useRef(null);
  const stream = useRef(null);
  const mounted = useRef(false);
  const [session, setSession] = useState("");
  const [url, setUrl] = useState("");
  const livepeerObject = new Livepeer("77aa98f3-4889-4091-94f7-22eee8b5a79f");
  const getStreams = async () => {
    const streams = await livepeerObject.Stream.getAll({ isActive: false });
    console.log(streams);
  };

 
  //

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [add, setAdd] = useState("");
  const [record, setRecord] = useState("");
  const [premium, setPremium] = useState("");

  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate("/");
  //   }
  // }, [isConnected]);
  

  const onButtonClick = async () => {

    (async () => {
      videoEl.current.volume = 0;

      stream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoEl.current.srcObject = stream.current;
      videoEl.current.play();
    })();
    
    const stream_ = await livepeerObject.Stream.create({
      name: "test_stream",
      profiles: [
        {
          name: "720p",
          bitrate: 2000000,
          fps: 30,
          width: 1280,
          height: 720,
        },
        {
          name: "480p",
          bitrate: 1000000,
          fps: 30,
          width: 854,
          height: 480,
        },
        {
          name: "360p",
          bitrate: 500000,
          fps: 30,
          width: 640,
          height: 360,
        },
      ],
    });
    console.log(stream_);
    console.log(stream_.streamKey);
    
    console.log(premium,
      title,
      des);
  
    
    stream_.setRecord(true);
    const current_stream = await livepeerObject.Stream.get(stream_.id);
    console.log("video id" + stream_.id);
    const result = await current_stream.setRecord(true);
    console.log(result);
    const url =
      "https://livepeercdn.com/hls/" + stream_.playbackId + "index.m3u8";
    setUrl(url);
    const streamKey = stream_.streamKey;

    if (!stream.current) {
      alert("Video stream was not started.");
    }

    if (!streamKey) {
      alert("Invalid streamKey.");
      return;
    }

    const client = new Client();

    const session = client.cast(stream.current, streamKey);

    session.on("open", () => {
      console.log("Stream started.");
      alert("Stream started; visit Livepeer Dashboard.");
    });

    session.on("close", () => {
      console.log("Stream stopped.");
    });

    session.on("error", (err) => {
      console.log("Stream error.", err.message);
    });

    // console.log(title);
    // console.log(des);
    // console.log(add);
    // console.log(record);
  };

  const closeStream = () => {
    session.close();
  };

  useEffect(() => {
    if (!mounted) {
      closeStream();
    }
  }, [mounted])
  return (
    <>
    <section className="cs-main">
      <h1 className="stream-header">Go Live</h1>
      <div className="cs">
        <div className="cs-left-container">
          <video className="cs-video" ref={videoEl} controls />
         
          <div>
          

            <button className="cs-button" onClick={() => onButtonClick()}>
              Start
            </button>
            <button className="cs-button" onClick={closeStream}>
              Stop
            </button>
          </div>
        </div>
        
      </div>

    </section>
  </>
  )
}

export default App