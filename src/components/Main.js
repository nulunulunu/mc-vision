import React from "react";
import './Main.css'
import Border from "./Border";
import { useNavigate } from 'react-router-dom'
const Main = () => {
    const navigate = useNavigate();
    return <Border>
        <div className="outer">
            <div className="rightTop-text" onClick={() => {
                navigate('/situationFirst')
            }}>
                <div className="left-side-text"></div>
                <div>场景一</div>
                <div className="right-side-text"></div>
            </div>
            <div className="rightBottom-text">
                <div className="left-side-text"></div>
                <div>场景三</div>
                <div className="right-side-text"></div>
            </div>
            <div className="leftTop-text">
                <div className="left-side-text"></div>
                <div>首页</div>
                <div className="right-side-text"></div>
            </div>
            <div className="leftBottom-text">
                <div className="left-side-text"></div>
                <div>场景二</div>
                <div className="right-side-text"></div>
            </div>
            <div className="rightTop"></div>
            <div className="rightBottom"></div>
            <div className="inner"></div>
            <div className="leftTop"></div>
            <div className="leftBottom"></div>
        </div>
    </Border >
}

export default Main