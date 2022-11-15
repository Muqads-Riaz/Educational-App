import React from "react";
import { useState, useEffect } from "react";

function Countdown({ startingMinutes, startingSeconds = 0, func }) {
    
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);

    useEffect(() => {
        let sampleInterval = setInterval(() => {
            if (secs > 0) {
                setSeconds(secs - 1);
            }
            if (secs === 0) {
                if (mins === 0) {
                    clearInterval(sampleInterval);
                   
                    {func()}
                } else {
                    setMinutes(mins - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => {
            clearInterval(sampleInterval);
        };
    });

    return (
        <div>
            { (
                <span className="timer">
                    {mins}:{secs < 10 ? `0${secs}` : secs}
                </span>
            )}
        </div>
    );
}

export default Countdown;

