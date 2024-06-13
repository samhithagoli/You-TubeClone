import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import "./Createroom.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from 'react-redux';
function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  export function getUrlParams(
    url = window.location.href
  ) {
    let urlStr = url.split('?')[1];
    return new URLSearchParams(urlStr);
  }
function Createroom() {
    
    const roomId = getUrlParams().get('roomID') || randomID(5);

    const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ screen: true });
    const [shouldDownload, setShouldDownload] = useState(false);
    const meetingRef = useRef(null);
  
    useEffect(() => {
        if (shouldDownload && mediaBlobUrl) {
          const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
          const fileName = `recording_${timestamp}.mp4`;
          fetch(mediaBlobUrl)
            .then((response) => response.blob())
            .then((blob) => {
              saveAs(blob, fileName);
              setShouldDownload(false);
            })
            .catch((error) =>
              console.error("Error downloading the recording:", error)
            );
        }
    }, [shouldDownload, mediaBlobUrl]);

    const handleStopRecording = async () => {
        await stopRecording();
        setShouldDownload(true);
    };
    
    const meetingUI = async (element) => {
        if (!element) return;  // Return early if the element is not defined

        try {
            const appID = 946099231;
            const serverSecret = "9a3271164e18b80e3f382ab958280348";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomId,
                randomID(5),  randomID(5)
            );

            const ui = ZegoUIKitPrebuilt.create(kitToken);

            await ui.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: "Personal link",
                        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomId}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (meetingRef.current) {
            meetingUI(meetingRef.current);
        }
    }, [meetingRef]);

    return (
        <div className="room-container">
        <div className="recorder">
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={handleStopRecording}>Stop Recording</button>
            </div>
            <div ref={meetingRef} style={{ width: "100%", height: "90vh" }}></div>
            
        </div>
    );
}

export default Createroom;
