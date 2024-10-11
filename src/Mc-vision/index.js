import React, { useState } from 'react'
import SituationThird from './components/situationThird'
import SituationSecond from './components/situationSecond'
import SituationFirst from './components/situationFirst'
import Main from './components/Main'
import './index.less'

export const McVision = () => {
  const [tabs, setTabs] = useState(0)
  console.log(tabs)
  return (
    <div>
      {tabs != 0 ? (
        <div className="title-tabs">
          <div onClick={() => setTabs(0)}>首页</div>

          <div onClick={() => setTabs(1)}>场景一</div>
          <div className="placeholder"></div>

          <div onClick={() => setTabs(2)}>场景二</div>
          <div onClick={() => setTabs(3)}>场景三</div>
        </div>
      ) : null}
      {tabs == 0 ? <Main setRoute={setTabs} /> : null}
      {tabs == 1 ? <SituationFirst /> : null}
      {tabs == 2 ? <SituationSecond /> : null}
      {tabs == 3 ? <SituationThird /> : null}
    </div>
  )
}
