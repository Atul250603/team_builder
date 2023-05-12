import { Route, Routes } from 'react-router-dom';
import mockdata from './mockData.json'
import MainBody from './components/MainBody';
import { useState } from 'react';
import ViewTeam from './components/ViewTeam';
import './App.css'
function App() {
  const [data,setData]=useState(mockdata);
  const [team, setTeam] = useState([]);
  return (
    <div className='mainBody'>
    <Routes>
    <Route exact path="/" element={<MainBody mockdata={mockdata} setData={setData} data={data}  team={team} setTeam={setTeam}/>}/>
    <Route exact path="/viewTeam" element={<ViewTeam mockdata={mockdata} setData={setData} data={data}  team={team} setTeam={setTeam}/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
