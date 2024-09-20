import React, { useState } from "react";
import Border from "./Border";
import './situationFirst.css'
// import { Area } from "@ant-design/charts";

const SituationFirst = () => {
    const [griData, setGriData] = useState({})
    const [beefData, setBeefData] = useState({})
    return <Border>
        <div className="container">
            <div className="coven-monitor">
                <h3>煎炉实时监控</h3>

                <div className="coven">
                    <div className="meat-beef"></div>
                    <div className="status-text-unready">
                        <p>煎制前</p>
                        <p>{ }</p>
                    </div>
                    <div className="status-text-loading">
                        <p>未煎制</p>
                        <p>{ }</p>
                    </div>
                    <div className="status-text-finished">
                        <p>煎制后</p>
                        <p>{ }</p>
                    </div>
                </div>
                <div className="coven">
                    <div className="meat-chicken"></div>
                    <div className="status-text-unready">
                        <p>煎制前</p>
                        <p>{ }</p>
                    </div>
                    <div className="status-text-loading">
                        <p>未煎制</p>
                        <p>{ }</p>
                    </div>
                    <div className="status-text-finished">
                        <p>煎制后</p>
                        <p>{ }</p>
                    </div>
                </div>
            </div>
            <div className="beef-temp">
                <p>今日牛肉饼温度</p>
                {/* <Area /> */}
            </div>
            <div className="image">

            </div>
            <div className="gri-temp">
                <p>今日板烧温度</p>
                {/* <Area /> */}
            </div>
        </div>

    </Border>
}

export default SituationFirst