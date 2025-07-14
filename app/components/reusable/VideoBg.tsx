import React from 'react';
import './VideoBackground.css';
import logoBg from './assets/logo_bg.mp4';


const VideoBackground = (children: any) => {
    return (
        <div className="video-container">
            <video
                className="background-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source src={logoBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default VideoBackground;
