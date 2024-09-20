import React from "react";
import './Main.css'
import Border from "./Border";
const Main = (props: any) => {
    // const navigate = useNavigate();
    const { setRoute } = props
    return <Border>
        <div className="outer">
            <div className="rightTop-text" onClick={() => {
                setRoute(1)
                console.log('trigger')
            }}>
                <div className="left-side-text"></div>
                <div>场景一</div>
                <div className="right-side-text"></div>
            </div>
            <div className="rightBottom-text"  onClick={() => {
                setRoute(3)
                console.log('trigger')}}>
                <div className="left-side-text"></div>
                <div>场景三</div>
                <div className="right-side-text"></div>
            </div>
            <div className="leftTop-text">
                <div className="left-side-text"></div>
                <div>首页</div>
                <div className="right-side-text"></div>
            </div>
            <div className="leftBottom-text" onClick={() => {
                setRoute(2)
                console.log('trigger')}}>
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