import React, { useEffect, useRef, useState } from 'react'
import Border from './Border'
import './situationFirst.css'
import { queryTemp } from '../mcvisionServer'
import {
  LineChart,
  Area,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const _chartTable = [
  {
    name: '1',
    before: 3,
    after: 162,
  },
  {
    name: '2',
    before: 5,
    after: 165,
  },
  {
    name: '3',
    before: 2,
    after: 159,
  },
  {
    name: '4',
    before: 6,
    after: 163,
  },
  {
    name: '5',
    before: 8,
    after: 165,
  },
]
const _griTable = [
  {
    name: '1',
    before: 35,
    after: 172,
  },
  {
    name: '2',
    before: 38,
    after: 181,
  },
  {
    name: '3',
    before: 40,
    after: 176,
  },
  {
    name: '4',
    before: 42,
    after: 186,
  },
  {
    name: '5',
    before: 39,
    after: 183,
  },
]
const SituationFirst = () => {
  const data = useRef([])
  const [showData, setShowData] = useState([])
  const [griChart, setGriChart] = useState([])
  const [chartTable, setChartTable] = useState(_chartTable)
  const [griTable, setGriTable] = useState(_griTable)

  function getItemType(item) {
    console.log(item)
    if (!item) return 'normal'
    let _string = ''
    if (item.skuType == 0){
      _string += 'beef-'
    }else{
      _string += 'gri-'
    }
    if(item.stage==0){
      _string += 'unready'
    }else if(item.stage==3){
      _string += 'finished'
    }else{
      _string += 'loading'
    }
    return _string
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setShowData(data.current)
    }, 500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    // getDataAndSet()
    async function getDataAndSet() {
      const { data: newData = [] } = await queryTemp()
      if (
        newData[0] &&
        data.current[0] &&
        newData[0].trackingId == data.current[0].trackingId &&
        newData[0].skuType == data.current[0].skuType &&
        newData[0].stage > data.current[0].stage &&
        newData[0].stage === 3
      ) {
        chartTable.push({
          name: '6',
          before: newData[0].preTemp,
          after: newData[0].temp,
        })
        if (newData[0].skuType === 0) {
          setChartTable([
            ..._chartTable,
            { name: ''+_chartTable.length, before: newData[0].preTemp, after: newData[0].temp },
          ])
        } else {
          setGriTable([
            ..._griTable,
            { name: ''+_griTable.length, before: newData[0].preTemp, after: newData[0].temp },
          ])
        }
      }
      if (
        newData[1] &&
        data.current[1] &&
        newData[1].trackingId === data.current[1]?.trackingId &&
        newData[1].skuType === data.current[1]?.skuType &&
        newData[1].stage > data.current[1]?.stage &&
        newData[1].stage === 3
      ) {
        if (newData[1].skuType === 0) {
          setChartTable([
            ..._chartTable,
            { name: ''+_chartTable.length, before: newData[1].preTemp, after: newData[1].temp },
          ])
        } else {
          setGriTable([
            ..._griTable,
            { name: ''+_griTable.length, before: newData[1].preTemp, after: newData[1].temp },
          ])
        }
      }
      data.current = newData || []
    }
    const interval = setInterval(getDataAndSet, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [chartTable, griTable])

  return (
    <Border>
      <div className="mc-vision-container">
        <div className="coven-monitor">
          <h3>煎炉实时监控</h3>

          <div className="coven">
            <div className={`meat-${getItemType(showData[0])}`}></div>
            <div className="status-text-unready">
              <p>煎制前</p>
              <p>{showData[0]?.preTemp ? showData[0]?.preTemp + '℉' : ''}</p>
            </div>
            <div className="status-text-loading">
              <p>煎制</p>
              <p>{showData[0]?.cookTime ? showData[0]?.cookTime + 's' : ''}</p>
            </div>
            <div className="status-text-finished">
              <p>煎制后</p>
              <p>{showData[0]?.stage === 3 ? showData[0]?.temp + '℉' : ''}</p>
            </div>
          </div>
          <div className="coven">
            <div className={`meat-${getItemType(showData[1])}`}></div>
            <div className="status-text-unready">
              <p>煎制前</p>
              <p>{showData[1]?.preTemp ? showData[1]?.preTemp + '℉' : ''}</p>
            </div>
            <div className="status-text-loading">
              <p>煎制</p>
              <p>{showData[1]?.cookTime ? showData[1]?.cookTime + 's' : ''}</p>
            </div>
            <div className="status-text-finished">
              <p>煎制后</p>
              <p>{showData[1]?.stage === 3 ? showData[1]?.temp + '℉' : ''}</p>
            </div>
          </div>
        </div>
        <div className="beef-temp">
          <p>今日牛肉饼温度</p>
          <AreaChart
            width={400}
            height={200}
            data={chartTable}
            key={`lc_${chartTable.length}`}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFBA21" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFBA21" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" unit={'片'} name={'第'} />
            <YAxis unit={'℉'}/>
            <CartesianGrid strokeDasharray="3 3" />
            <Legend verticalAlign="top" height={36} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="before"
              stroke="#FFBA21"
              fillOpacity={1}
              fill="url(#colorUv)"
              name="牛肉饼煎制前"
            />
            <Area
              type="monotone"
              dataKey="after"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
              name="牛肉饼煎制后"
            />
          </AreaChart>
        </div>
        <div className="image"></div>
        <div className="gri-temp">
          <p>今日板烧温度</p>
          <AreaChart width={400} key={`lc_${griTable.length}`} height={200} data={griTable}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFBA21" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFBA21" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" unit={'片'} />
            <YAxis unit={'℉'}/>
            <Legend verticalAlign="top" height={36} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="before"
              stroke="#FFBA21"
              name="鸡肉饼煎制前"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              name="鸡肉饼煎制后"
              type="monotone"
              dataKey="after"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </div>
      </div>
    </Border>
  )
}

export default SituationFirst
