import logo from './logo.svg';
import './App.css';
import Border from './components/Border';
import Main from './components/Main';
import SituationFirst from './Mc-vision/components/situationFirst';
import SituationSecond from './Mc-vision/components/situationSecond'
import SituationThird from './Mc-vision/components/situationThird'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {McVision} from './Mc-vision/index'

import './Mc-vision/index.less'

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<McVision />} />
        {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* <Route path='/situationFirst' element={<SituationFirst />} />
        <Route path='/situationSecond' element={<SituationSecond />} />
        <Route path='/situationThird' element={<SituationThird />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
