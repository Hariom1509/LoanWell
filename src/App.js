import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ApplyUserLoans from './components/ApplyUserLoans';
import UserDashboard from './components/UserDashboard';
import ViewUserItems from './components/ViewUserItems';
import ViewUserLoans from './components/ViewUserLoans';
import AdminDashboard from './components/AdminDashboard';
import EditCustData from './components/EditCustData';
import ItemCard from './components/ItemCard';
import AddItem from './components/AddItem';
import AdminLogin from './components/AdminLogin';
import AddLoan from './components/AddLoan';
import LoanCard from './components/LoanCard';
import Home from './components/Home';
import bgVideo from "./assets/bgVideo.mp4";
import EditItem from './components/EditItem';
import EditLoan from './components/EditLoan';
import EditEmployee from './components/EditEmployee';


function App() {
  return (

    <div className="container-fluid" style={{overflowX:'hidden', overflowY:'hidden'}}>
    <div class="row flex-nowrap">
    {/* <video style={{diplay:'flex', width: '90%', transform: 'rotate (-90deg)', position: 'absolute',zIndex:"-1"}} autoPlay loop muted>
                <source src={bgVideo} type='video/mp4' />
                </video> */}
      <Router>
        <Sidebar />
        <Routes>
          <Route path = '/' element={<Home />}/>
          <Route path = '/login' element={<Login />} />
          <Route path = '/admin-login' element={<AdminLogin />} />
          <Route path = '/register' element={<Register />} />
          <Route path = '/dashboard' element={<UserDashboard />} />
          <Route path = '/admin-dashboard' element={<AdminDashboard />} />
          <Route path = '/edit-cust-data' element={<EditCustData />} />
          <Route path = '/apply' element={<ApplyUserLoans />} />
          <Route path = '/viewuseritems' element={<ViewUserItems />} />
          <Route path = '/viewloans' element={<ViewUserLoans />} />
          <Route path = '/viewItems' element={<ItemCard/>} />
          <Route path = '/addItem' element={<AddItem/>}/>
          <Route path = '/editItem/:id' element={<EditItem/>}/>
          <Route path = '/viewLoans1' element={<LoanCard/>} />
          <Route path = '/addLoan' element={<AddLoan/>}/>
          <Route path = '/editLoan/:id' element={<EditLoan/>}/>
          <Route path = '/editEmployee/:id' element={<EditEmployee/>}/>
        </Routes>
      </Router>
      </div>
        </div>
  );
}

export default App;
