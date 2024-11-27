// import { url } from 'inspector';
import Border from './Border'
import './situationSecond.css'
import React, { useEffect, useState } from 'react'
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
import { element } from 'prop-types'
import moment from 'moment'
import { Table } from 'antd'
import { queryTrash } from '../mcvisionServer'

const columns = [
  {
    title: '食品名称',
    dataIndex: 'skuType',
    key: 'skuType',
    render: (record) => {
      return record === 0 ? '牛肉' : '鸡肉'
    },
  },
  {
    title: '丢弃数量',
    dataIndex: 'opQuantity',
    key: 'opQuantity',
    render: (record) => {
      return Math.abs(record)
    },
  },
  {
    title: '丢弃时间',
    dataIndex: 'timestamp',
    render: (record) => {
      return moment(record).format('YYYY-MM-DD HH:mm:ss')
    },
  },
]

const _uhcTime = [
  {
    name: '1',
    beef: 32,
    gri: 42,
  },
  {
    name: '2',
    beef: 57,
    gri: 83,
  },
  {
    name: '3',
    beef: 86,
    gri: 127,
  },
  {
    name: '4',
    beef: 123,
    gri: 168,
  },
  {
    name: '5',
    beef: 158,
    gri: 287,
  },
]

const SituationSecond = () => {
  const [firstCoven, setFirstCoven] = useState()
  const [secondCoven, setSecondCoven] = useState()
  const [wasterData, setWasterData] = useState({})
  const [wasterChart, setWasterChart] = useState([])
  const [uhcTime, _setUhcTime] = useState(_uhcTime)
  function getItemType(item) {
    if (!item) return ''
    if (item.skuType == 0) return '牛肉'
    return '鸡肉'
  }

  function getCovenStatus(item){
    if(!item) return ''
    if(item.redFlag){
      return 'red-Flag'
    }else{
      return 'pane-used'
    }
  }

  function errMsg(item){
    if(!item) return ''
    if(item.stockQuantity===0){
      return '请及时补货'
    }else if(item.minute==0&&item.second==0){
      return '请丢弃'
    }
  }

  function getItemTypeBrief(item) {
    if (!item) return ''
    if (item.skuType == 0) return 'beef'
    return 'gri'
  }

  useEffect(() => {
    async function queryTrashData() {
      const data = await queryTrash()
      const {
        uhc: uhc_drawer,
        wasterData,
        wasterOpts: _wasterChart,
        turnoverTimeList,
      } = data
      const _concatArray = []
      turnoverTimeList.forEach((element) => {
        if (element.skuType == 0) {
          _concatArray.push({
            beef: element.turnoverTime,
          })
        }
      })
      turnoverTimeList.forEach((element) => {
        if (element.skuType === 1) {
          const index = _concatArray.findIndex((item) => {
            return !item.hasOwnProperty('gri')
          })
          if (index > -1) {
            _concatArray[index].gri = element.turnoverTime
          }
        }
      })
      const _length = uhcTime.length
      console.log(_concatArray, '_concatArray')
      _concatArray.forEach((item, index) => {
        item.name = String(index + 1 + _length)
      })
      _setUhcTime(uhcTime.concat(..._concatArray))
      const secondCoven = uhc_drawer['0_1']
      const firstCoven = uhc_drawer['0_0']
      console.log(_wasterChart, 'wasterChart')
      setWasterChart(_wasterChart)
      setWasterData(wasterData)
      console.log(data, secondCoven, firstCoven)
      setSecondCoven(secondCoven)
      setFirstCoven(firstCoven)
    }
    const interval = setInterval(queryTrashData, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  console.log(uhcTime, 'uhc refreshed ')
  return (
    <Border>
      <div className="mc-vision-container-second">
        <div className="second-uhc">
          <div className="monitor-title">UHC实时监控</div>
          <div className="monitor-container">
            <div
              className={`monitor-coven ${
                getCovenStatus(secondCoven)
              } `}
            >
              <div>
                {secondCoven
                  ? getItemType(secondCoven) + ' ' + secondCoven?.stockQuantity || 0
                  : ''}
              </div>
              <div>{secondCoven?.temp ? secondCoven?.temp + '℉' : ''}</div>
              <div className={`${getItemTypeBrief(secondCoven) || 'normal'}-image`}></div>
              {
                errMsg(secondCoven)?<div className={`coven-error-msg-${secondCoven.stockQuantity?'yellow':'red'}`}>{errMsg(secondCoven)}</div>:
                <div className='coven-msg'>
                  {secondCoven
                    ? (secondCoven?.minute || '00') +
                      ' :' +
                      (secondCoven?.second || '00')
                    : '00:00'}
                </div>
              }
            </div>
            <div className="monitor-coven">
              <div> / 0</div>
              <div>{'0' + '℉' }</div>
              <div className='normal-image'>/</div>
              <div className='coven-msg'>00:00</div>
            </div>
            <div className="monitor-coven">
              <div> / 0</div>
              <div>{'0' + '℉' }</div>
              <div className='normal-image'>/</div>
              <div className='coven-msg'>00:00</div>
            </div>
            <div className="monitor-coven">
              <div> / 0</div>
              <div>{'0' + '℉' }</div>
              <div className='normal-image'>/</div>
              <div className='coven-msg'>00:00</div>
            </div>
          </div>
          <div className="item-container-block"></div>
          <div className="monitor-container">
          <div
              className={`monitor-coven ${
                getCovenStatus(firstCoven)
              } `}
            >
              <div>
                {firstCoven
                  ? getItemType(firstCoven) + ' ' + firstCoven?.stockQuantity || 0
                  : ''}
              </div>
              <div>{firstCoven ? (firstCoven?.temp || 0)+ '℉' : ''}</div>
              <div className={`${getItemTypeBrief(firstCoven) || 'normal'}-image`}></div>
              {
                errMsg(firstCoven)?<div className={`coven-error-msg-${firstCoven.stockQuantity?'yellow':'red'}`}>{errMsg(firstCoven)}</div>:
              <div>
                {firstCoven
                  ? (firstCoven?.minute || '00') +
                    ' :' +
                    (firstCoven?.second || '00')
                  : '00:00'}
              </div>}
            </div>
            <div className="monitor-coven">
              <div> / 0</div>
              <div>{'0' + '℉' }</div>
              <div className='normal-image'>/</div>
              <div className='coven-msg'>00:00</div>
            </div>
            <div className="monitor-coven">
              <div> / 0</div>
              <div>{'0' + '℉' }</div>
              <div className='normal-image'>/</div>
              <div className='coven-msg'>00:00</div>
            </div>
            <div className="monitor-coven">
              <div> / 0</div>
              <div>{'0' + '℉' }</div>
              <div className='normal-image'>/</div>
              <div className='coven-msg'>00:00</div>
            </div>
          </div>
        </div>
        <div className="second-uhc-time">
          <div className="second-uhc-time-title">今日UHC货品周转时间</div>
          <div>
            <AreaChart
              width={400}
              height={250}
              data={uhcTime}
              margin={{ top: 0, right: 30, left: 20, bottom: 0 }}
              key={`lc_${uhcTime.length}`}
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
              <XAxis dataKey="name" unit={'片'} />
            <YAxis unit={'秒'}/>
              <CartesianGrid strokeDasharray="3 3" />
              <Legend verticalAlign="top" height={36} />
              <Area
                type="monotone"
                dataKey="beef"
                stroke="#8884d8"
                fillOpacity={1}
                // key={`lc_${uhcTime.length}`}
                fill="url(#colorUv)"
                name='牛肉饼周转时长'
              />
              <Area
                type="monotone"
                dataKey="gri"
                stroke="#82ca9d"
                fillOpacity={1}
                // key={`lc_${uhcTime.length}`}
                fill="url(#colorPv)"
                name='鸡肉饼周转时长'
              />
            </AreaChart>
          </div>
        </div>
        <div className="second-uhc-record">
          <div className="second-uhc-record-title">今日UHC货品丢弃记录</div>
          <div className="second-uhc-content">
            <div className="trash-image"></div>
            <div className="trash-image-data">
              <div>
                <div>丢弃总数</div>
                <div>{wasterData?.wasterTotal}</div>
              </div>
              <div>
                <div>牛肉饼</div>
                <div>{wasterData?.wasterBeefNum}</div>
              </div>
              <div>
                <div>鸡肉饼</div>
                <div>{wasterData?.wasterChickenNum}</div>
              </div>
            </div>
            <div className="trash-image-table">
              <Table
                columns={columns}
                bordered={false}
                dataSource={wasterChart}
                pagination={{ position: ['none'] }}
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </Border>
  )
}

export default SituationSecond
