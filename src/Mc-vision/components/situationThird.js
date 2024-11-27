import React, { useEffect, useRef, useState } from 'react'
import './situationThird.css'
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
import moment from 'moment'
import { queryOrder } from '../mcvisionServer'
import Border from './Border'
import { element } from 'prop-types'

const _mockData = [
  {
    order: [
      {
        item: '巨无霸',
        num: 1,
      },
      {
        item: '板烧',
        num: 1,
      },
    ],
    orderNum: 35001,
  },
  {
    order: [
      {
        item: '巨无霸',
        num: 1,
      },
    ],
    orderNum: 35002,
  },
  {
    order: [
      {
        item: '板烧',
        num: 3,
      },
    ],
    orderNum: 35003,
  },
  {
    order: [
      {
        item: '板烧',
        num: 4,
      },
    ],
    orderNum: 35004,
  },
  {
    order: [
      {
        item: '巨无霸',
        num: 2,
      },
    ],
    orderNum: 35005,
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
const SituationThird = () => {
  const [plateId, setPlateId] = useState('35000')
  const [currentOrder, setCurrentOrder] = useState([])
  const [data, setData] = useState({})
  const [time, setTimer] = useState(0)
  const [errMsg, setErrMsg] = useState([])
  const [mockData, setMockData] = useState(_mockData)
  const plateIdRef = useRef(plateId)
  plateIdRef.current = plateId
  const getPlateIdRef = useRef(getPlateId)
  async function getPlateId(id) {
    const data = await queryOrder(id)
    const { totalOrderNum = 0, errorOrderNum = 0, sucRate = 100, plateList = [] } = (data || {})
    //@ts-ignore
    if (data?.plateList && (data?.plateList[0] || [])?.plateId) {
      //@ts-ignore
      setPlateId((data?.plateList[0] || [])?.plateId)
      if(!time){
        setTimer((((data)?.plateList) || [])[0]?.djsSecond)
      }
      console.log(data, 'data')
      setCurrentOrder(plateList)
      setData({ totalOrderNum, errorOrderNum, sucRate })
    }
    setMockData((_data) => {
      if (id) {
        const index = _data.findIndex(item => (item).orderNum == id)
        if (index > -1) {
          _data.splice(index, 1)
        }
        console.log(data)
      }
      if ((data)?.plateList[0]?.plateId) {
        const index = _data.findIndex(item => (item).orderNum == (data)?.plateList[0]?.plateId)
        if (index > -1) {
          _data.splice(index, 1)
        }
        console.log(data)
      }
      return _data
    })
    const _errMsg = []
    plateList.forEach((element) => {
      if (element.errorMsg) {
        _errMsg.push(element.errorMsg)
      }
    })
    setErrMsg(_errMsg)
  }
  getPlateIdRef.current = getPlateId
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(time => time + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('query Order')
      getPlateIdRef.current(plateIdRef.current)

    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <Border>
      <div className="order-container">
        <div className="current-order">
          <div className="current-order-title">当前订单</div>
          <div className="order-time-content">
            <div className="order-number">
              <p className="order-time-title">{plateId}</p>
              <p className="order-time">
                {moment(
                  ((currentOrder[0]) || ({}))?.orderTime || ''
                ).format('HH:mm:ss')}
              </p>
            </div>
            <div className="order-duration">
              {time ? time : ''}
            </div>
          </div>
          <div className="order-content-spec">
            <div className='order-content-name-number-box'>
              {(currentOrder || ([]))?.map((item) => {
                return (
                  <div className={`order-content-name-number order-content-${!item.errorTag ? 'success' : 'error'}`}>
                    <div>{item.needSkuTypeName}</div>
                    {item.errorTag ? <div className='order-content-errTag'>{item.errorTag}</div> : ''}
                    <div>✖️{item?.needSkuNum}</div>
                  </div>
                )
              })}
            </div>
            <div className="order-content-warning">
              {errMsg.map((item) => <div>{item}</div>)}
            </div>
            {/* <div className="order-content-name-number">
              <div>巨无霸</div>
              <div>✖️1</div>
            </div> */}
          </div>
        </div>
        <div className="next-order">
          <div className="order-title">排队订单</div>
          <div className="next-order-container">
            {mockData.map((item) => {
              return (
                <div className="per-order">
                  <div className="pre-order-num">{item.orderNum}</div>
                  {item.order.map((element) => {
                    return (
                      <div className="pre-order-content">
                        <div>{element.item}</div>
                        <div>{`*${element.num}`}</div>
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="order-accuracy">
          <div className="order-title">今日订单准确率</div>
          <div className="order-title-content">
            <div className={`order-${data.sucRate==100?'success':'unsuccess'}-text`}>
              <p>{(data)?.sucRate + '%'}</p>
            </div>
            <div>
            <div>订单总数: {(data)?.totalOrderNum}单</div>
            <div>错误订单 : {(data)?.errorOrderNum}单</div>
            </div>
          </div>
          <div>
          
          </div>
        </div>
      </div>
    </Border>
  )
}

export default SituationThird
