import React, { useEffect, useState } from "react";
import './Border.css'
const Border = ({ children }) => {
    const [time, setTime] = useState(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())
    useEffect(() => {
        var _timer = setInterval(() => {
            const date = new Date().toLocaleDateString()
            const time = new Date().toLocaleTimeString()
            setTime(date + ' ' + time)
        }, 1000);
        return () => _timer = null
    }, [])
    return <div>
        <div className="background">
            <div className="background-weather">天气：晴 温度：26</div>
            <div className="background-title">McVision Xplor</div>
            <div className="background-time">{time}</div>

        </div>
        {children}
    </div>
}

export default Border