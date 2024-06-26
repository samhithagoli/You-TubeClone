import React, { useEffect, useState } from 'react';
import { FaEdit, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from 'axios';
import './DescribeChannel.css';

function DescribeChannel({ setEditCreateChannelbtn, Cid, setVidUploadPage }) {
    const [points, setPoints] = useState(0);
    const chanels = useSelector((state) => state?.channelReducers);
    const currentChanel = chanels.filter((c) => c._id === Cid)[0];
    const CurrentUser = useSelector((state) => state?.currentUserReducer);

    useEffect(() => {
        if (CurrentUser?.result?._id) {
            // Fetch user profile to get points
            axios.get(`http://localhost:5500/profile/${CurrentUser.result._id}`)
                .then(response => {
                    setPoints(response.data.points);
                })
                .catch(error => {
                    console.error("There was an error fetching the profile!", error);
                });
        }
    }, [CurrentUser]);

    return (
        <div className='container3_channel'>
            <div className='channel_logo_channel'>
                <b>{currentChanel?.name.charAt(0).toUpperCase()}</b>
            </div>
            <div className="description_chanel">
                <b>{currentChanel?.name}</b>
                <p>{currentChanel?.desc}</p>
                <p>Points: {points}</p> {/* Display points here */}
            </div>
            {CurrentUser?.result._id === currentChanel?._id && (
                <>
                    <p
                        className="editbtn_chanel"
                        onClick={() => {
                            setEditCreateChannelbtn(true);
                        }}
                    >
                        <FaEdit />
                        <b>Edit Channel</b>
                    </p>
                    <p className="uploadbtn_chanel" onClick={() => setVidUploadPage(true)}>
                        <FaUpload />
                        <b>Upload Video</b>
                    </p>
                </>
            )}
        </div>
    );
}

export default DescribeChannel;
