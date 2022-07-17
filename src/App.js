import logo from './logo.svg';
import './App.css';
import {Routes,Route,Navigate,Outlet} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import ViewComp from './components/ViewComp';
import Login from './components/Login';

//protected route component
let user = sessionStorage.getItem('user');

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/dashboard" element={<Dashboard/> } />
      <Route path="/view" element={<ViewComp/>}/>
      <Route path="/login" element={<Login/>} />
     </Routes>
    </div>
  );
}

export default App;
